import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, Alert, View, Image } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import { useState, useEffect } from 'react';
import { db } from '../FirebaseApp';
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { AntDesign, MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';


const EditHospitalization = ({ navigation, route }) => {
    const [description, onDescriptionChanged] = useState('');
    const [prognosis, onPrognosisChanged] = useState('');
    const [cardiac, onCardiacChanged] = useState('');
    const [respiratory, onRespiratoryChanged] = useState('');
    const [pulse, onPulseChanged] = useState('');
    const [temperature, onTemperatureChange] = useState('');
    const [mucous, onMucousChanged] = useState('');
    const [tllc, onTllcChanged] = useState('');
    const [dehydration, onDehydrationChanged] = useState('');
    const [apetite, onApetiteChanged] = useState('');
    const [urine, onUrineChanged] = useState('');
    const [fecal, onFecalChanged] = useState('');
    const [medicine_quantity, onQuantityChanged] = useState('');
    const [medicine_quantity2, onQuantityChanged2] = useState('');
    const [medicine_quantity3, onQuantityChanged3] = useState('');
    const [remark, onRemarkChanged] = useState('');

    const [medicine, onMedicineChanged] = useState('');
    const [medicine2, onMedicine2Changed] = useState('');
    const [medicine3, onMedicine3Changed] = useState('');


    const [pet_name, onPNameChanged] = useState('');
    const [owner_name, onONameChanged] = useState('');
    const [clinic, onClinicChanged] = useState('');
    const [date, onDateChanged] = useState('');

    const { hisId } = route.params;

    {/*const vaccination_ = [
        { key: '1', value: 'Si' },
        { key: '2', value: 'No' }
    ]
    const deworming_ = [
        { key: '1', value: 'Si' },
        { key: '2', value: 'No' }
    ]
    const parasitesControl_ = [
        { key: '1', value: 'Si' },
        { key: '2', value: 'No' }
    ]*/}



    useEffect(() => {
        async function getProfile() {

            getDoc(doc(db, "hospitalization", hisId)).then(docData => {

                if (docData.exists()) {

                    onDescriptionChanged(docData.data().description);
                    onPrognosisChanged(docData.data().prognosis);
                    onCardiacChanged(docData.data().cardiac);
                    onRespiratoryChanged(docData.data().respiratory);
                    onPulseChanged(docData.data().pulse);
                    onTemperatureChange(docData.data().temperature);
                    onMucousChanged(docData.data().mucous);
                    onTllcChanged(docData.data().tllc);
                    onDehydrationChanged(docData.data().dehydration);
                    onApetiteChanged(docData.data().apetite);
                    onUrineChanged(docData.data().urine);
                    onFecalChanged(docData.data().fecal);
                    onMedicineChanged(docData.data().medicine);
                    onQuantityChanged(docData.data().medicine_quantity);
                    onMedicine2Changed(docData.data().medicine2);
                    onQuantityChanged2(docData.data().medicine_quantity2);
                    onMedicine3Changed(docData.data().medicine3);
                    onQuantityChanged3(docData.data().medicine_quantity3);
                    onRemarkChanged(docData.data().remark);
                    onONameChanged(docData.data().owner_name);
                    onPNameChanged(docData.data().pet_name);
                    onClinicChanged(docData.data().clinic);
                    onDateChanged(docData.data().date);

                } else {
                    console.log('No such a data!');
                }
            }).catch((error) => {
                console.log(error);
            })
        }

        getProfile();
    }, [])

    const updateHospitalizationPressed = async () => {
        updateDoc(doc(db, "hospitalization", hisId), {
            date: date,
            clinic: clinic,
            description: description,
            prognosis: prognosis,
            cardiac: cardiac,
            respiratory: respiratory,
            pulse: pulse,
            temperature: temperature,
            mucous: mucous,
            tllc: tllc,
            dehydration: dehydration,
            apetite: apetite,
            urine: urine,
            fecal: fecal,
            medicine: medicine,
            medicine_quantity: medicine_quantity,
            medicine2: medicine2,
            medicine_quantity2: medicine_quantity2,
            medicine3: medicine3,
            medicine_quantity3: medicine_quantity3,
            remark: remark,
        }).then(() => {
            // Data saved successfully!
            console.log('data updated');

        }).catch((error) => {
            // The write failed...
            console.log(error);
        });
    }


    return (
        <SafeAreaView style={styles.area}>

            <View style={styles.imgView}>
                <Image source={require('../assets/logo2.png')} style={styles.img} />
            </View>


            <Text style={styles.text}>Nombre dueño *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onONameChanged}
                value={owner_name}
            />

            <Text style={styles.text}>Nombre mascota *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onPNameChanged}
                value={pet_name}
            />

            <Text style={styles.text}>Centro clinico *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onClinicChanged}
                value={clinic}
            />

            <Text style={styles.text}>Fecha realización *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDateChanged}
                value={date}
            />

<View style={{ height: 2, width: "100%", backgroundColor: "#cccccc", marginTop: 30 }} />

            <Text style={styles.text}>Diagnóstico *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDescriptionChanged}
                value={description}
            />

            <Text style={styles.text}>Pronóstico *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onPrognosisChanged}
                value={prognosis}
            />


            <Text style={styles.text}>Frecuencia Cardiaca *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onCardiacChanged}
                value={cardiac}
            />

            <Text style={styles.text}>Frecuencia Respiratoria *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onRespiratoryChanged}
                value={respiratory}
            />


            <Text style={styles.text}>Pulso *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onPulseChanged}
                value={pulse}
            />

            <Text style={styles.text}>Temperatura *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onTemperatureChange}
                value={temperature}
            />


            <Text style={styles.text}>Mocusa *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onMucousChanged}
                value={mucous}
            />

            <Text style={styles.text}>TLLC (Tiempo de llenado capilar)*</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onTllcChanged}
                value={tllc}
            />

            <Text style={styles.text}>Deshidratación*</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDehydrationChanged}
                value={dehydration}
            />

            <Text style={styles.text}>Apetito *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onApetiteChanged}
                value={apetite}
            />

            <Text style={styles.text}>Estado de orina *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onUrineChanged}
                value={urine}
            />

            <Text style={styles.text}>Estado de materia fecal *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onFecalChanged}
                value={fecal}
            />

            <View style={{ height: 2, width: "100%", backgroundColor: "#cccccc", marginTop: 30 }} />


            <Text style={styles.text}>1. Medicina:</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onMedicineChanged}
                value={medicine}
            />



            <Text style={styles.text}>Dosis</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onQuantityChanged}
                value={medicine_quantity}
            />


            <View style={{ height: 2, width: "100%", backgroundColor: "#cccccc", marginTop: 30 }} />


            <Text style={styles.text}>2. Medicina:</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onMedicine2Changed}
                value={medicine2}
            />


            <Text style={styles.text}>Dosis</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onQuantityChanged2}
                value={medicine_quantity2}
            />




            <View style={{ height: 2, width: "100%", backgroundColor: "#cccccc", marginTop: 30 }} />


            <Text style={styles.text}>3. Medicina:</Text>

            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onMedicine3Changed}
                value={medicine3}
            />


            <Text style={styles.text}>Dosis</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onQuantityChanged3}
                value={medicine_quantity3}
            />


            <View style={{ height: 2, width: "100%", backgroundColor: "#cccccc", marginTop: 30 }} />

            <Text style={styles.text}>Observaciones *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onRemarkChanged}
                value={remark}
            />


            <View style={{ height: 2, width: "100%", backgroundColor: "#cccccc", marginTop: 30 }} />


            <View style={{ marginTop: 10, marginBottom: 22 }}>
                <Pressable onPress={() => {

                    updateHospitalizationPressed();
                    navigation.pop(1);
                    alert('Hospitalización actualizada!');

                }}>
                    <Text style={styles.pressableStyle}>ACTUALIZAR</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        // textAlign: 'center',
        alignSelf: 'center',
        padding: 20,
        margin: 30,
        fontWeight: 'bold',
        fontSize: '35'
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
    text: {
        marginBottom: 5,
        marginLeft: 22,
        marginTop: 30,
        fontSize: 15,
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
    pressableStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor:  '#FF8000',
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
        width: '10%',
        fontWeight: 'bold'
    },
    imgView: {
        width: 150,
        height: 150,
        borderRadius: '100%',
        borderWidth: 3,
        borderColor: '#335C67',
        alignSelf: 'center',
        marginTop: 22,
        padding: 30
    },
    smallImgView: {
        width: 60,
        height: 60,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        padding: 8
    },
    img: {
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
});

export default EditHospitalization;