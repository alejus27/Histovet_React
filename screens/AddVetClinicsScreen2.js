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

        navigation.pop(1);
    }

    return (
        <SafeAreaView  style={styles.area}>
            <Text style={styles.text}>Nombre</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onNameChanged}
                value={name}
            />
            <Text style={styles.text}>Dirección</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onStreetChanged}
                value={street}
            />
            <Text style={styles.text}>Ciudad</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onCityChanged}
                value={city}
            />
            <Pressable onPress={() => { addVetPressed() 
            alert('Clinica veterinaria creada!');}}>
                <Text style={styles.pressableStyle}>REGISTRAR VETERINARIA</Text>
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
        marginBottom: 20,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    area: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 35,
        marginBottom: 35,
        borderColor: '#335C67',
        borderWidth: 2,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    text: {
        marginBottom: 5,
        marginLeft: 22,
        marginTop: 30,
        fontSize: 15,
        fontWeight: 'bold'
    },
    searchBar: {
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
        elevation: 1,
        borderWidth: 1,
        borderColor: '#009688',
    }
});

export default AddVetClinicsScreen2;