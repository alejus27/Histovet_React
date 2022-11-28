import { SafeAreaView, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { useState, useEffect } from "react";
import { auth, db, storage } from '../FirebaseApp';
import { onAuthStateChanged } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage";
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";

const DeletePetScreen = ({navigation, route}) => {
    const [petName, setPetName] = useState('');
    const [petOwner, setPetOwner] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    // Not tested yet //
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, onErrorChanged] = useState('');
    //

    const {pet, petDoc} = route.params;

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
        setPetName(petDoc.data().name);
        setPetOwner(petDoc.data().owner);
    }, [])

    useEffect(()=>{
        if (loggedInUser!=null && petOwner!='') {
            if (loggedInUser.uid==petOwner) {setIsOwner(true)}
        }
    }, [loggedInUser, petOwner])

    const deletePetPressed = async () => {
        if (isOwner){
            deleteAllCaregivers();
            deleteAllMedicalRecords();
            await deleteDoc(doc(db, "pets", pet))
            .then(() => navigation.pop(3))
            .catch((err) => {
                console.log(err.message);
                onErrorChanged(err.message);
                onHasErrorChanged(true);
            });
        }
        else {
            const docRef = query(collection(db, "caregiving"), where("user", "==", loggedInUser.uid), where("pet", "==", pet));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            await deleteDoc(doc(db, "caregiving", documents[0].id))
            .then(() => navigation.pop(3))
            .catch((err) => {
                console.log(err.message);
                onErrorChanged(err.message);
                onHasErrorChanged(true);
            });
        }
    }

    const deleteAllMedicalRecords = async () => {
        try {
            const docRef = query(collection(db, "history"), where("pet", "==", pet));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            for (let i=0; i<documents.length; i++) {
                let fileRef = ref(storage, documents[i].data().record);
                deleteObject(fileRef)
                .then(async () => {
                    await deleteDoc(doc(db, "history", documents[i].id))
                    .then()
                    .catch((err) => {
                        console.log("ERROR: while deleting from history -> " + err.message);
                    });
                })
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const deleteAllCaregivers = async () => {
        try {
            const docRef = query(collection(db, "caregiving"), where("pet", "==", pet));
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
            console.log(err.message);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:25, marginRight:25, fontSize:20, alignSelf: 'center', fontWeight: 'bold'}}>Are you sure you want to remove {}
                <Text style={{textDecorationLine:'underline'}}>{petName}</Text>
            ?
            </Text>

            {isOwner && (
                <Text style={{textAlign:'left',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>Attention: 
                    <Text style={{color:'gray'}}>This action is irreversible and will erase all the data related to your account and your pet from the My Pet Health Record app.</Text>
                    <Text style={{color:'gray'}}>{"\n"}{"\n"}All of your pet's caregivers will lose access if deleted.</Text>
                </Text>
            )}

            { hasError && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}
            
            <Pressable onPress={ () => {
                Alert.alert(`REMOVE ${petName.toUpperCase()}`, 'Please confirm pet deletion.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => deletePetPressed()}
                ]);
            }}>
                <Text style={styles.deletePressable}>REMOVE
                    <Text style={{textTransform:'uppercase'}}> {petName}</Text>
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

export default DeletePetScreen;