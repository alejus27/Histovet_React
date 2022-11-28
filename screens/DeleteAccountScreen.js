import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { UseTogglePasswordVisibility } from '../UseTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from '../FirebaseApp';
import { ref, deleteObject } from "firebase/storage";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

const DeleteAccountScreen = ({navigation, route}) => {
    const [password, onPasswordChanged] = useState('');
    // Not tested yet //
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, onErrorChanged] = useState('');
    //

    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();
    const {user, profile} = route.params;

    const deleteAccountPressed = async () => {
        // Not tested yet //
        deleteUserCaregiving();
        //
        deleteUserPets();
        deleteUserProfile();
        deleteUser();
    }

    const deleteUser = async () => {
        try {
            var user = auth.currentUser;
            await signInWithEmailAndPassword(auth, user.email, password);
            user = auth.currentUser;
            try {
                user.delete()
                .then(() => navigation.reset({index:0, routes:[{name: 'AuthenticationNavigator'}], key:null}))
                .catch((err) => console.log(err));
            } catch(err) {
                console.log(err.message);
                onErrorChanged(err.message);
                onPasswordChanged("");
                onHasErrorChanged(true);
            }
        } catch(err) {
            console.log(err.message);
            onErrorChanged("Your password is incorrect. Please try again.");
            onPasswordChanged("");
            onHasErrorChanged(true);
        }
    }

    const deleteUserProfile = async () => {
        try {
            await deleteDoc(doc(db, "profiles", profile));
        } catch (err) {
            console.log(err.message);
        }
    }

    const deleteUserPets = async () => {
        try {
            const docRef = query(collection(db, "pets"), where("userId", "==",user));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            for (let i=0; i<documents.length; i++) {
                try {
                    // Delete pet's medical records
                    // Not tested yet
                    try {
                        const MRDocRef = query(collection(db, "history"), where("pet", "==", documents[i].id));
                        const MRQuerySnapshot = await getDocs(MRDocRef);
                        const MRDocuments = MRQuerySnapshot.docs;
                        for (let j=0; i<MRDocuments.length; j++) {
                            let fileRef = ref(storage, MRDocuments[j].data().record);
                            deleteObject(fileRef)
                            .then(async () => {
                                await deleteDoc(doc(db, "history", MRDocuments[j].id))
                                .then()
                                .catch((err) => {
                                    console.log("ERROR: while deleting from history -> " + err.message);
                                });
                            })
                        }
                    } catch (err) {
                        console.log(err.message);
                    }

                    // Delete pet itself
                    await deleteDoc(doc(db, "pets", documents[i].id));
                } catch (err) {
                    console.log(err.message);
                }
            }
        } catch (err) {
            console.log(`${err.message}`);        
        }
    }

    const deleteUserCaregiving = async () => {
        try {
            const docRef = query(collection(db, "caregiving"), where("user", "==",user));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            for (let i=0; i<documents.length; i++) {
                try {
                    await deleteDoc(doc(db, "caregiving", documents[i].id));
                } catch (err) {
                    console.log(err.message);
                }
            }
        } catch (err) {
            console.log(`${err.message}`);        
        }
    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:25, marginRight:25, fontSize:20, alignSelf: 'center', fontWeight: 'bold'}}>Are you sure that you want to delete your account?</Text>
            <Text style={{textAlign:'left',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>Attention: 
                <Text style={{color:'gray'}}>This action is irreversible and will erase all the data related to your account and your pets from the My Pet Health Record app.</Text>
            </Text>
            
            <Text style={{marginBottom:5, fontSize:15, marginTop:15, marginLeft:22}}>Password</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.inputField}
                    placeholder="Enter password"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    onChangeText={onPasswordChanged}
                    value={password}
                />
                <Pressable onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                </Pressable>
            </View>

            { hasError && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}
            
            <Pressable onPress={ () => {
                Alert.alert('DELETE ACCOUNT', 'Please confirm account deletion.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => deleteAccountPressed()}
                ]);
            }}>
                <Text style={styles.deletePressable}>DELETE ACCOUNT</Text>
            </Pressable>

            <Pressable onPress={() => {navigation.goBack()}}>
                <Text style={styles.cancelPressable}>CANCEL</Text>
            </Pressable>
           
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    title: {
        // textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: '35'
    },
    deletePressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    cancelPressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        color: '#335C67',
        borderColor: '#335C67',
        borderStyle: 'solid',
        borderWidth: 1,
        marginLeft: 22,
        marginRight: 22,
        marginTop: 15,
        marginBottom: 0,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    mainView: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    inputContainer: {
        height: 45,
        width: '90%',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#808080',
        alignSelf: 'center'
    },
    inputField: {
        padding: 10,
        width: '90%'
    },
    errorStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        marginTop: 22
    }
});

export default DeleteAccountScreen;