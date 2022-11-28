import { SafeAreaView, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { useState } from "react";
import { db } from '../FirebaseApp';
import { deleteDoc, doc } from "firebase/firestore";

const DeleteCaregiverScreen = ({navigation, route}) => {
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, onErrorChanged] = useState('');

    const {caregiverId, userName, petName} = route.params;

    const removerCaregiverPressed = async () => {
        await deleteDoc(doc(db, "caregiving", caregiverId))
        .then(console.log("Caregiver removed"))
        .catch((err) => {
            console.log(err.message);
            onErrorChanged(err.message);
            onHasErrorChanged(true);
        });
        navigation.pop(2);
    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35, fontSize:20, alignSelf: 'center', fontWeight: 'bold'}}>Are you sure you don't want to share your pet's data anymore?</Text>
            <Text style={{textAlign:'left',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>The user {}
                <Text style={{textDecorationLine:'underline', fontWeight:'bold'}}>{userName}</Text> 
                {} will no longer have access to {}
                <Text style={{textDecorationLine:'underline', fontWeight:'bold'}}>{petName}</Text>
                's medical record.
            </Text>

            { hasError && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}
            
            <Pressable onPress={ () => {
                Alert.alert(`REMOVE CAREGIVER`, 'Please confirm caregiver removal.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => removerCaregiverPressed()}
                ]);
            }}>
                <Text style={styles.deletePressable}>REMOVE CAREGIVER</Text>
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

export default DeleteCaregiverScreen;