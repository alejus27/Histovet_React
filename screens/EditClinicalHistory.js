import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import CheckBox from "expo-checkbox";
import SelectList from 'react-native-dropdown-select-list';
import { useState, useEffect } from 'react';
import { db } from '../FirebaseApp';
import { updateDoc, doc } from "firebase/firestore";

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

    const {clinicalId} = route.params;

    const vaccination_ = [
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
    ]

    useEffect(() => {
        async function getProfile() {
            const docRef =doc(collection(db, "clinical_history"), where("pet_id", "==", "ZuG1el37r9fiFVmxXLVX"));

            setDocRef(docRef);
            setUserProfileData(clinicalProfile.data());

            onStatusChanged(clinicalDoc.data().reproductive_status);
            onBirthChanged(clinicalDoc.data().reproductive_status);
            onVaccinationChanged(clinicalDoc.data().reproductive_status);
            onDewormingChanged(clinicalDoc.data().reproductive_status);
            onControlChanged(clinicalDoc.data().reproductive_status);
            onDietChange(clinicalDoc.data().reproductive_status);
            onReasonChanged(clinicalDoc.data().reproductive_status);
            onIllnessChanged(clinicalDoc.data().reproductive_status);
            onSurgeriesChanged(clinicalDoc.data().reproductive_status);
            onTreatmentsChanged(clinicalDoc.data().reproductive_status);
            onRespiratoryChanged(clinicalDoc.data().reproductive_status);
            onDigestiveChanged(clinicalDoc.data().reproductive_status);
            onNervousChanged(clinicalDoc.data().reproductive_status);
            onDiagnosisChanged(clinicalDoc.data().reproductive_status);
            onTestsChanged(clinicalDoc.data().reproductive_status);
            onPlanChanged(clinicalDoc.data().reproductive_status);
            onObservationChanged(clinicalDoc.data().reproductive_status);
        }
        getProfile();
    }, [])


    const updatePetPressed = async () => {
        const updatedHistoryData = {
            owner_name: ownerName,
            pet_name: petName,
            pet_id: petId,
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
            date: Timestamp.fromDate(today),
            clinic: vet_name
        };
        try {
            updateDoc(docRef, updatedHistoryData);
            navigation.pop(2);
        }
        catch (err) {
            console.log(`${err.message}`);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' }}>

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Estado reproductivo *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onStatusChanged}
                value={reproductive_status}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Número de partos *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onBirthChanged}
                value={birth_number}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 20 }}>Vacunación vigente *</Text>
            <SelectList
                setSelected={onVaccinationChanged}
                data={vaccination_}
                onSelect={() => { onVaccinationChanged(vaccination_[vaccination - 1].value) }}
                boxStyles={styles.input}
                dropdownItemStyles={styles.input}
                dropdownStyles={{ borderColor: 'transparent' }}
                maxHeight='100'
                placeholder=" "
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 20 }}>Desparasitación vigente *</Text>
            <SelectList
                setSelected={onDewormingChanged}
                data={deworming_}
                onSelect={() => { onDewormingChanged(deworming_[deworming - 1].value) }}
                boxStyles={styles.input}
                dropdownItemStyles={styles.input}
                dropdownStyles={{ borderColor: 'transparent' }}
                maxHeight='100'
                placeholder=" "
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 20 }}>Control de ectoparásitos vigente *</Text>
            <SelectList
                setSelected={onControlChanged}
                data={parasitesControl_}
                onSelect={() => { onControlChanged(parasitesControl_[parasites_control - 1].value) }}
                boxStyles={styles.input}
                dropdownItemStyles={styles.input}
                dropdownStyles={{ borderColor: 'transparent' }}
                maxHeight='100'
                placeholder=" "
            />


            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Tipo de dieta *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDietChange}
                value={diet_type}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Motivo de consulta *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onReasonChanged}
                value={consultation_reason}
            />


            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Enfermedades anteriores *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onIllnessChanged}
                value={previous_illnesses}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Cirugías previas *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onSurgeriesChanged}
                value={previous_surgeries}
            />


            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Tratamientos previos y evolución *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onTreatmentsChanged}
                value={previous_treatments}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Sistema Respiratorio *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onRespiratoryChanged}
                value={respiratory_system}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Sistema Digestivo *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDigestiveChanged}
                value={digestive_system}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Sistema Nervioso *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onNervousChanged}
                value={nervous_system}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Diagnóstico presuntivo *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDiagnosisChanged}
                value={presumptive_diagnosis}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Pruebas paraclínicas *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onTestsChanged}
                value={paraclinical_tests}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Plan terapéutico *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onPlanChanged}
                value={therapeutic_plan}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Observaciones *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onObservationChanged}
                value={observations}
            />

            <View style={{ marginTop: 10, marginBottom: 22 }}>
                <Pressable onPress={() => {
                    Alert.alert('UPDATE PET', 'Are you sure you want to update the pet?', [
                        { text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel' },
                        { text: 'YES', onPress: () => updatePetPressed() }
                    ]);
                }}>
                    <Text style={styles.pressableStyle}>UPDATE PET</Text>
                </Pressable>

                <Pressable onPress={() => { updatePetPressed() }}>
                    <Text style={styles.pressableStyle}>UPDATE PET 2</Text>
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
    },
    txtInput: {
        alignSelf: 'center',
        height: 150,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        textAlignVertical: 'top'
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

export default EditClinicalHistory;