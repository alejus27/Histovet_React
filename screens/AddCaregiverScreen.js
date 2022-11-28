import { SafeAreaView, StyleSheet, Text, Pressable, Alert, TextInput } from 'react-native';
import { useState } from "react";
import { auth, db } from '../FirebaseApp';
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const AddCaregiverScreen = ({navigation, route}) => {
    const [emailAddress, onEmailChanged] = useState('');
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, onErrorChanged] = useState('');

    const {pet, petName} = route.params;

    const addCaregiverPressed = async () => {
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
            addNewPetCaregiver(documents[0].data().userId);
        } catch (err) {
            console.log(err.message);
        }
    }

    const addNewPetCaregiver = async (caregiver) => {
        try {
            const record = {
                pet:pet,
                user:caregiver
            };
            const insertedRecord = await addDoc(collection(db, "caregiving"), record);
            navigation.pop(2);
        }
        catch (err) {
            console.log(`${err.message}`);
        }
    }
    
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:25, marginRight:25, fontSize:25, alignSelf: 'center', fontWeight: 'bold'}}>Who do you want to share your pet's data with?</Text>
            <Text style={{textAlign:'left',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>An email will be sent to the other person and once confirmed he will be able to access all of {} 
                <Text style={{textDecorationLine:'underline', fontWeight:'bold'}}>{petName}</Text>
            's medical record.
            </Text>

            <Text style={{marginBottom:5, marginLeft:22, marginTop:30}}>Email</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter email address"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onEmailChanged}
                value={emailAddress}
            />

            { hasError && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}
            
            <Pressable onPress={ () => {
                Alert.alert('ADD CAREGIVER', 'Please confirm caregiver addition.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => addCaregiverPressed()}
                ]);
            }}>
                <Text style={styles.deletePressable}>ADD CAREGIVER </Text>
            </Pressable>

            <Pressable onPress={() => {navigation.goBack()}}>
                <Text style={styles.cancelPressable}>CANCEL</Text>
            </Pressable>
           
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
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
    choosePressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 13,
        padding: 15,
        width: '25%',
        fontWeight: 'bold',
        borderRadius: 10,
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
    errorStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        marginTop: 22
    },
    input: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        borderRadius: '0%',
    },
});

export default AddCaregiverScreen;

