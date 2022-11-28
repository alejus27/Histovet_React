import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import { db } from "../FirebaseApp";
import { collection, query, where, getDocs, setDoc, doc, addDoc } from "firebase/firestore";

const AddTime = ({ navigation, route }) => {
    const [time, onTimeChanged] = useState('');

    const { vet_name } = route.params;

    const addMedicinePressed = async () => {

        //const clinicRef = query(collection(db, "profiles"), where("userId", "==", "G3xGd8P7ypJAoGxxs2YO"));
        //const clinicquerySnapshot = await getDocs(clinicRef);
        //const clinicProfile = clinicquerySnapshot.docs[0].data().clinic;

        // add new vet to db

        const newDoc = doc(collection(db, "medicine"));
        try {
            await setDoc(newDoc, {
                id: newDoc.id,
                first_name: name,
                time: time
            }
            );
            navigation.pop(2);

        } catch (err) {
            console.log(`${err.message}`);
        }


        /*const medicine = {
            name: name,
            description: description,
            group: group,
            precio: Number(precio),
            fechaVen: fechaVen
        }*/
        //const insertedMedicine = await addDoc(collection(db, "medicine"), medicine);


    }

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', justifyContent: 'space-between' }}>
            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Rango de horas de atención (Entrada-Salida)</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onTimeChanged}
                value={time}
            />


            <Pressable onPress={() => { addMedicinePressed() }}>
                <Text style={styles.pressableStyle}>REGISTRAR NUEVO DE RANGO DE ATENCIÓN</Text>
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
        borderRadius: '0%',
    },
    pressableStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#fff',
        // backgroundColor: '#ffffff',
        // color: '#335C67',
        // borderColor: '#335C67',
        // borderStyle: 'solid',
        // borderWidth: 1,
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
});

export default AddTime;