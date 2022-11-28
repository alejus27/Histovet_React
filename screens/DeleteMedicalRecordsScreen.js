import { SafeAreaView, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { useState, useEffect } from "react";
import { auth, db } from '../FirebaseApp';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";

const DeleteMedicalRecordsScreen = ({navigation, route}) => {
    const [petName, setPetName] = useState('');
    const [petOwner, setPetOwner] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    // Not tested yet //
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, onErrorChanged] = useState('');
    //

    const {pet} = route.params;

    useEffect(()=>{
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
        if (userFromFirebaseAuth) {
            setLoggedInUser(userFromFirebaseAuth);
        }
        else {
            setLoggedInUser(null);
        }
        })
        return listener
    }, [])


    useEffect(()=>{
        if (loggedInUser!=null && petOwner!='') {
            if (loggedInUser.uid==petOwner) {setIsOwner(true)}
        }
    }, [loggedInUser, petOwner])

    const deleteRecordPressed = async () => {
        navigation.navigate("ShowHistoryScreen");
        // if (isOwner){
        //     deleteAllCaregivers();
        //     await deleteDoc(doc(db, "pets", pet))
        //     .then(() => navigation.pop(3))
        //     .catch((err) => {
        //         console.log(err.message);
        //         onErrorChanged(err.message);
        //         onHasErrorChanged(true);
        //     });
        // }
        // else {
        //     const docRef = query(collection(db, "caregiving"), where("user", "==", loggedInUser.uid), where("pet", "==", pet));
        //     const querySnapshot = await getDocs(docRef);
        //     const documents = querySnapshot.docs;
        //     await deleteDoc(doc(db, "caregiving", documents[0].id))
        //     .then(() => navigation.pop(3))
        //     .catch((err) => {
        //         console.log(err.message);
        //         onErrorChanged(err.message);
        //         onHasErrorChanged(true);
        //     });
        // }
       
    }


    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35, fontSize:20, alignSelf: 'center', fontWeight: 'bold'}}>Are you sure you want to delete one of the medical records?
            </Text>

                <Text style={{textAlign:'left',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}><Text style={{fontWeight: 'bold'}}>Attention: </Text>
                    <Text style={{color:'gray'}}>This action is irreversible and will erase all the data related to the medical history from the My Pet Health Record app.</Text>
                    <Text style={{color:'gray'}}>{"\n"}{"\n"}All of your pet's caregivers will lose access to this medical history if deleted.</Text>
                </Text>
        
            
            <Pressable onPress={ () => {
                Alert.alert(`REMOVE MEDICAL RECORD`, 'Please confirm record deletion.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => deleteRecordPressed()}
                ]);
            }}>
                <Text style={styles.deletePressable}>REMOVE MEDICAL RECORD
                </Text>
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
    }
});

export default DeleteMedicalRecordsScreen;