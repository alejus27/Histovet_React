import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import { db } from "../FirebaseApp";
import { collection, addDoc } from "firebase/firestore";

const AddVetClinicsScreen2 = ({ navigation, route }) => {
    const [name, onNameChanged] = useState('');
    const [street, onStreetChanged] = useState('');
    const [city, onCityChanged] = useState('');

    const addVetPressed = async () => {
        // add new vet to db
        const vet = {
            name: name,
            street: street,
            city: city
        }
        const insertedClinic = await addDoc(collection(db, "vet_list"), vet);

        navigation.pop(2);
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', justifyContent: 'space-between' }}>
            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Nombre</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onNameChanged}
                value={name}
            />
            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Dirección</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onStreetChanged}
                value={street}
            />
            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Ciudad</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onCityChanged}
                value={city}
            />
            <Pressable onPress={() => { addVetPressed() }}>
                <Text style={styles.pressableStyle}>Registrar Veterinaria</Text>
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

export default AddVetClinicsScreen2;