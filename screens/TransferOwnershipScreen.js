import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { useState, useEffect } from "react";
import CheckBox from "expo-checkbox";
import { auth, db  } from "../FirebaseApp";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";

const TransferOwnershipScreen = ({navigation, route}) => {
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, onErrorChanged] = useState('');
    const [emailAddress, onEmailChanged] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [petRef, setPetRef] = useState(null);
    const [petData, setPetData] = useState(null);
    const [petName, setPetName] = useState('');

    const {pet, petDoc, user} = route.params;

    useEffect(()=>{
        const docRef = doc(db, "pets", pet);
        setPetName(petDoc.data().name);
        setPetRef(docRef);
        setPetData(petDoc.data());
    }, [])

    const transferOwnershipPressed = async () => {
        await fetchSignInMethodsForEmail(auth, emailAddress)
        .then((result) => {
            if (result.length===0) {
                onHasErrorChanged(true);
                onErrorChanged("No user was found with this email.");
                onEmailChanged("");
            }
            else {
                onHasErrorChanged(false);
                onErrorChanged("");
                getUser();
            }})
        .catch((err) => {
            onHasErrorChanged(true);
            onErrorChanged("No user was found with this email.");
            onEmailChanged("");
            console.log(err.message);
        });
    }

    const getUser = async () => {
        try {
            const docRef = query(collection(db, "profiles"), where("email", "==", emailAddress));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            await removeIfIsCaregiver(documents[0].data().userId);
            await addNewCaregiver();
            await updatePetOwner(documents[0].data().userId);
        } catch (err) {
            console.log(err.message);
        }
    }

    const removeIfIsCaregiver = async (user_id) => {
        try {
            const docRef = query(collection(db, "caregiving"), where("pet", "==", pet), where("user", "==", user_id));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            if (documents.length!=0) {
                console.log("is a caregiver");
                await deleteDoc(doc(db, "caregiving", documents[0].id))
                .then(console.log("Caregiver removed"))
                .catch((err) => {
                    console.log("ERROR: Can't remove caregiver -> " + err.message);
                    onErrorChanged(err.message);
                    onHasErrorChanged(true);
                });
            }
        } catch(err) {
            console.log(err.message);
            onErrorChanged(err.message);
            onHasErrorChanged(true);
        }
    }

    const addNewCaregiver = async () => {
        if (isSelected) {
            console.log("add me as caregiver");
            try {
                const record = {
                    pet:pet,
                    user:user
                };
                const insertedRecord = await addDoc(collection(db, "caregiving"), record);
                console.log("Added user as caregiver");
            }
            catch (err) {
                console.log("ERROR: Can't add as caregiver -> " + err.message);
            }
        }
    }

    const updatePetOwner = async (user_id) => {
        const updatedPetData = {
            owner:user_id,
            name:petData.name,
            birthday:petData.birthday,
            gender:petData.gender,
            regular_clinic:petData.regular_clinic,
            specie:petData.specie,
            breed:petData.breed,
            coat_color:petData.coat_color,
            mark:petData.mark,
            neutering:petData.neutering,
        };
        try {
            updateDoc(petRef, updatedPetData);
            console.log("pet owner updated");
            navigation.pop(3);
        }
        catch (err) {
            console.log("ERROR: Can't update pet owner -> " + err.message);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:25, marginRight:25, fontSize:20, alignSelf: 'center', fontWeight: 'bold'}}>Who will be the new owner of {}
                <Text style={{textDecorationLine:'underline'}}>{petName}</Text>
            ?
            </Text>
            <Text style={{textAlign:'left',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>Attention: 
                <Text style={{color:'gray'}}>Transferring pet ownership allows another user to have full control of the pet.</Text>
            </Text>
            
            <Text style={{marginBottom:5, fontSize:15, marginTop:15, marginLeft:22}}>Email</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onEmailChanged}
                value={emailAddress}
            />

            <View style={{flexDirection:'row', alignItems:'center', marginLeft:22, marginTop:10}}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    color='#335C67'
                />
                <Text style={{marginLeft:5, fontSize:15}}>Add me as a caregiver</Text>
            </View>

            { hasError && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}
            
            {/*<Pressable onPress={ () => {
                Alert.alert('TRANSFER OWNERSHIP', 'Please confirm ownership transformation.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => transferOwnershipPressed()}
                ]);
            }}>
                <Text style={styles.deletePressable}>TRANSFER OWNERSHIP</Text>
        </Pressable>*/}

            <Pressable onPress={() => {navigation.goBack()}}>
                <Text style={styles.cancelPressable}>CANCEL</Text>
            </Pressable>
           
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
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
    errorStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        marginTop: 22
    }
});

export default TransferOwnershipScreen;