import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, Alert, View, Image} from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import { useState, useEffect } from 'react';
import { db } from '../FirebaseApp';
import { updateDoc, doc, getDoc } from "firebase/firestore";

//import Alert from '@mui/material/Alert';





const EditClinicalHistory = ({ navigation, route }) => {
    const [reproductive_status, onStatusChanged] = useState('');
    const [birth_number, onBirthChanged] = useState('');
    const [vaccination, onVaccinationChanged] = useState('');
    const [deworming, onDewormingChanged] = useState('');
    const [parasites_control, onControlChanged] = useState('');
    const [diet_type, onDietChange] = useState('');
    const [consultation_reason, onReasonChanged] = useState('');
    const [previous_illnesses, onIllnessChanged] = useState('');
    const [previous_surgeries, onSurgeriesChanged] = useState('');
    const [previous_treatments, onTreatmentsChanged] = useState('');
    const [respiratory_system, onRespiratoryChanged] = useState('');
    const [digestive_system, onDigestiveChanged] = useState('');
    const [nervous_system, onNervousChanged] = useState('');
    const [presumptive_diagnosis, onDiagnosisChanged] = useState('');
    const [paraclinical_tests, onTestsChanged] = useState('');
    const [therapeutic_plan, onPlanChanged] = useState('');
    const [observations, onObservationChanged] = useState('');

    const [pet_name, onPNameChanged] = useState('');
    const [owner_name, onONameChanged] = useState('');
    const [clinic, onClinicChanged] = useState('');
    const [date, onDateChanged] = useState('');

    const { clinicalId } = route.params;

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
            getDoc(doc(db, "clinical_history", clinicalId)).then(docData => {
                if (docData.exists()) {
                    onStatusChanged(docData.data().reproductive_status);
                    onBirthChanged(docData.data().birth_number);
                    onVaccinationChanged(docData.data().vaccination);
                    onDewormingChanged(docData.data().deworming);
                    onControlChanged(docData.data().parasites_control);
                    onDietChange(docData.data().diet_type);
                    onReasonChanged(docData.data().consultation_reason);
                    onIllnessChanged(docData.data().previous_illnesses);
                    onSurgeriesChanged(docData.data().previous_surgeries);
                    onTreatmentsChanged(docData.data().previous_treatments);
                    onRespiratoryChanged(docData.data().reproductive_status);
                    onDigestiveChanged(docData.data().digestive_system);
                    onNervousChanged(docData.data().nervous_system);
                    onDiagnosisChanged(docData.data().presumptive_diagnosis);
                    onTestsChanged(docData.data().paraclinical_tests);
                    onPlanChanged(docData.data().therapeutic_plan);
                    onObservationChanged(docData.data().observations);
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

    const updateHistoryPressed = async () => {
        updateDoc(doc(db, "clinical_history", clinicalId), {
            reproductive_status: reproductive_status,
            birth_number: birth_number,
            vaccination: vaccination,
            deworming: deworming,
            parasites_control: parasites_control,
            diet_type: diet_type,
            consultation_reason: consultation_reason,
            previous_illnesses: previous_illnesses,
            previous_surgeries: previous_surgeries,
            previous_treatments: previous_treatments,
            respiratory_system: respiratory_system,
            digestive_system: digestive_system,
            nervous_system: nervous_system,
            presumptive_diagnosis: presumptive_diagnosis,
            paraclinical_tests: paraclinical_tests,
            therapeutic_plan: therapeutic_plan,
            observations: observations,
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
                <Image source={require('../assets/logo.png')} style={styles.img} />
            </View>

            <Text style={styles.text}>Nombre due??o *</Text>
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

            <Text style={styles.text}>Fecha realizaci??n *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDateChanged}
                value={date}
            />

            <View style={{ height: 2, width: "100%", backgroundColor: "#cccccc", marginTop: 30 }} />

            <Text style={styles.text}>Estado reproductivo *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onStatusChanged}
                value={reproductive_status}
            />

            <Text style={styles.text}>N??mero de partos *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onBirthChanged}
                value={birth_number}
            />


            <Text style={styles.text}>Vacunaci??n vigente *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onVaccinationChanged}
                value={vaccination}
            />


            <Text style={styles.text}>Desparasitaci??n vigente *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDewormingChanged}
                value={deworming}
            />


            <Text style={styles.text}>Control de ectopar??sitos vigente *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onControlChanged}
                value={parasites_control}
            />



            <Text style={styles.text}>Tipo de dieta *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDietChange}
                value={diet_type}
            />

            <Text style={styles.text}>Motivo de consulta *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onReasonChanged}
                value={consultation_reason}
            />


            <Text style={styles.text}>Enfermedades anteriores *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onIllnessChanged}
                value={previous_illnesses}
            />

            <Text style={styles.text}>Cirug??as previas *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onSurgeriesChanged}
                value={previous_surgeries}
            />


            <Text style={styles.text}>Tratamientos previos y evoluci??n *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onTreatmentsChanged}
                value={previous_treatments}
            />

            <Text style={styles.text}>Estado sistema respiratorio *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onRespiratoryChanged}
                value={respiratory_system}
            />

            <Text style={styles.text}>Estado sistema digestivo *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDigestiveChanged}
                value={digestive_system}
            />

            <Text style={styles.text}>Estado sistema nervioso *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onNervousChanged}
                value={nervous_system}
            />

            <Text style={styles.text}>Diagn??stico presuntivo *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDiagnosisChanged}
                value={presumptive_diagnosis}
            />

            <Text style={styles.text}>Pruebas paracl??nicas *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onTestsChanged}
                value={paraclinical_tests}
            />

            <Text style={styles.text}>Plan terap??utico *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onPlanChanged}
                value={therapeutic_plan}
            />

            <Text style={styles.text}>Observaciones *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onObservationChanged}
                value={observations}
            />

            <View style={{ height: 2, width: "100%", backgroundColor: "#cccccc", marginTop: 30 }} />

            <View style={{ marginTop: 10, marginBottom: 22 }}>
                <Pressable onPress={() => {
                    updateHistoryPressed();
                    navigation.pop(1);
                    alert('Historia clinica actualizada!');
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
        backgroundColor: '#FF8000',
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

export default EditClinicalHistory;