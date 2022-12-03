import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import { db } from "../FirebaseApp";
import { collection, query, where, getDocs, setDoc, doc, addDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const AddTime = ({ navigation, route }) => {

    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());

    //const [nameProfile, setNameProfile] = useState('');

    const { u_id } = route.params;



    const addMedicinePressed = async () => {

        //const clinicRef = query(collection(db, "profiles"), where("userId", "==", "G3xGd8P7ypJAoGxxs2YO"));
        //const clinicquerySnapshot = await getDocs(clinicRef);
        //const clinicProfile = clinicquerySnapshot.docs[0].data().clinic;

        // add new vet to db


        const ref = query(collection(db, "profiles"), where("userId", "==", u_id));
        const querySnapshot = await getDocs(ref);
        const profile_name = querySnapshot.docs[0].data().first_name;


        const newDoc = doc(collection(db, "attention_ schedule"));
        try {
            await setDoc(newDoc, {
                id: newDoc.id,
                doctor_id:u_id,
                first_name: profile_name,
                time: moment(startDate).format('h:mm a') + " - " + moment(startDate2).format('h:mm a')
            }
            );
            navigation.pop(1);

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

            <Text style={{ marginBottom: 20, marginTop: 30, fontWeight: 'bold', fontSize: 16, alignSelf: 'center', }}>Horario de atención</Text>

            <Text style={{ fontSize: 16 }}>Inicio de cita médica:</Text>
    
            <DatePicker
                wrapperClassName="datePicker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="h:mm aa"
            />

            <Text style={{ marginTop: 30, fontSize: 16 }}>Fin de cita médica:</Text>
            <DatePicker
                selected={startDate2}
                onChange={(date) => setStartDate2(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="h:mm aa"
            />


            <Pressable onPress={() => { addMedicinePressed() }}>
                <Text style={styles.pressableStyle}>REGISTRAR NUEVO HORARIO</Text>
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
        marginTop: 30,
        marginBottom: 30,
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
        alignSelf: 'center'
    },
    
});

export default AddTime;