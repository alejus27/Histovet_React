import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Pressable, Alert, TextInput, View, ActivityIndicator, Image } from 'react-native';
import { collection, query, where, getDocs, setDoc, doc, addDoc } from "firebase/firestore";
import { db, storage } from '../FirebaseApp';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as DocumentPicker from 'expo-document-picker';

const AddMedicine = ({ navigation, route }) => {
    const [name, onNameChanged] = useState('');
    const [description, onDescriptionChanged] = useState('');
    const [group, onGroupChanged] = useState('');
    const [precio, onPrecioChanged] = useState('');
    const [fechaVen, onFechaVenChanged] = useState('');

    const [fileName, setFileName] = useState("Cargar imagen");
    const [blobFile, setBlobFile] = useState(null);
    const [isLoading, setLoading] = useState(false);


    const _pickDocument = async () => {
        const file = await DocumentPicker.getDocumentAsync({
            // type: "*/*",
            // copyToCacheDirectory: true,
        });

        if (file.type === 'cancel') {
            setFileName("Upload Image");
        }
        else {
            const fetched_file = await fetch(file.uri);
            const blob_file = await fetched_file.blob();
            setFileName(file.name);
            setBlobFile(blob_file);
        };
    }

    const addDocumentPressed = async () => {
        const storageRef = ref(storage, `/images/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, blobFile);

        uploadTask.on(
            "state_changed",
            () => {
                setLoading(true);
            },
            (err) => console.log("ERROR: while uploading file -> " + err),
            async () => {
                setLoading(false);

                // download url
                await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    addMedicinePressed(url);
                });
            }
        );
    }


    const addMedicinePressed = async (url) => {

        //const clinicRef = query(collection(db, "profiles"), where("userId", "==", "G3xGd8P7ypJAoGxxs2YO"));
        //const clinicquerySnapshot = await getDocs(clinicRef);
        //const clinicProfile = clinicquerySnapshot.docs[0].data().clinic;

        // add new vet to db


        const newDoc = doc(collection(db, "medicine"));
        try {
            await setDoc(newDoc, {
                id: newDoc.id,
                name: name,
                description: description,
                group: group,
                precio: Number(precio),
                fechaVen: fechaVen,
                record: url
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

        <SafeAreaView style={styles.area}>

            <Text style={styles.text}>Imagen</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', marginLeft: 22, marginTop: 22, marginRight: 22 }}>
                <Pressable onPress={_pickDocument}>
                    <Text style={styles.choosePressable}>SELECCIONAR</Text>
                </Pressable>
                <Text style={{ fontSize: 13, color: 'dimgray', flexShrink: 1 }}>{fileName}</Text>
            </View>


            <Text style={styles.text}>Nombre</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese nombre del medicamento"
                keyboardType="default"
                autoCapitalize="none"
                maxLength={10}

                onChangeText={onNameChanged}
                value={name}
            />

            <Text style={styles.text}>Descripción</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese descripción del medicamento"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDescriptionChanged}
                value={description}
            />

            <Text style={styles.text}>Grupo</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el grupo del medicamento"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onGroupChanged}
                value={group}
            />

            <Text style={styles.text}>Precio</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el precio del medicamento"
                keyboardType="numeric"
                autoCapitalize="none"
                onChangeText={onPrecioChanged}
                value={Number(precio)}
            />

            <Text style={styles.text}>Fecha Vencimiento</Text>
            <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onFechaVenChanged}
                value={fechaVen}
            />

            <Pressable onPress={() => { addDocumentPressed() }}>
                <Text style={styles.pressableStyle}>REGISTRAR MEDICAMENTO</Text>
            </Pressable>

            {isLoading && (
                <View style={{ marginLeft: 22, marginRight: 22, alignSelf: 'center', alignItems: 'center', marginTop: 22, fontWeight: 'bold' }}>
                    <ActivityIndicator animating={true} size="small" color="#335C67" />
                    <Text style={{ color: 'dimgray' }}>Uploading in progress</Text>
                </View>
            )}

            {/*<Pressable onPress={() => { addMedicinePressed() }}>
                <Text style={styles.pressableStyle}>REGISTRAR MEDICAMENTO</Text>
            </Pressable>*/}
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
        marginBottom: 35,
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
    choosePressable: {
        textAlign: 'center',
        backgroundColor: '#fff',
        color: '#335C67',
        marginRight: 10,
        fontSize: 13,
        padding: 10,
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#335C67',
    },
});

export default AddMedicine;