import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import { AntDesign, MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { db } from '../FirebaseApp';
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";

const CreateClinicalHistory = ({ navigation, route }) => {
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
    const [vet_id, setVetId] = useState(null);
    const [vet_name, setVetName] = useState('');
    const [vet_street, setVetStreet] = useState(null);
    const [vet_city, setVetCity] = useState('');

    const { petId, petName, ownerName } = route.params;

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





    const onSelectedVet = data => {
        var count = 0;
        for (const [key, value] of Object.entries(data)) {
            for (const [key2, value2] of Object.entries(value)) {
                if (count == 0) { setVetId(value2); }
                else if (count == 1) { setVetName(value2); }
                else if (count == 2) { setVetStreet(value2); }
                else if (count == 3) { setVetCity(value2); }
                count = count + 1;
            }
        }
    };


    const addClinicalHistoryPressed = async () => {
        const today = new Date();

        const newDoc = doc(collection(db, "clinical_history"));
        try {
            await setDoc(newDoc, {
                id: newDoc.id,
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
            }
            );
            navigation.pop(1);
        }
        catch (err) {
            console.log(`${err.message}`);
        }


        {/*try {
            const clinicalHistoryToInsert = {
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

            const insertedClinicalHistory = await setDo(collection(db, "clinical_history"), clinicalHistoryToInsert);
            navigation.pop(2);
        }
        catch (err) {
            console.log(`${err.message}`);
        }*/
        };
    }

    return (
        <SafeAreaView style={styles.area}>

            <View style={styles.imgView}>
                <Image source={require('../assets/logo.png')} style={styles.img} />
            </View>


            <Text style={styles.text}>Estado reproductivo *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onStatusChanged}
                value={reproductive_status}
            />

            <Text style={styles.text}>Número de partos *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onBirthChanged}
                value={birth_number}
            />




            <Text style={styles.text}>Vacunación vigente *</Text>
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

            <Text style={styles.text}>Desparasitación vigente *</Text>
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

            <Text style={styles.text}>Control de ectoparásitos vigente *</Text>
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

            <Text style={styles.text}>Cirugías previas *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onSurgeriesChanged}
                value={previous_surgeries}
            />


            <Text style={styles.text}>Tratamientos previos y evolución *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onTreatmentsChanged}
                value={previous_treatments}
            />

            <Text style={styles.text}>Sistema Respiratorio *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onRespiratoryChanged}
                value={respiratory_system}
            />

            <Text style={styles.text}>Sistema Digestivo *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDigestiveChanged}
                value={digestive_system}
            />

            <Text style={styles.text}>Sistema Nervioso *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onNervousChanged}
                value={nervous_system}
            />

            <Text style={styles.text}>Diagnóstico presuntivo *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onDiagnosisChanged}
                value={presumptive_diagnosis}
            />

            <Text style={styles.text}>Pruebas paraclínicas *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onTestsChanged}
                value={paraclinical_tests}
            />

            <Text style={styles.text}>Plan terapéutico *</Text>
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




            <Text style={{ fontSize: 15, margin: 22, fontWeight: 'bold' }}>¿Dónde fue realizado? *</Text>
            {vet_id == null && (
                <View style={{ alignItems: 'baseline', marginLeft: 22, marginRight: 22 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <FontAwesome5 name="clinic-medical" size={24} color="black" />
                            <Text style={{ marginRight: 20, marginLeft: 20 }}>Ninguna clinica seleccionada</Text>
                        </View>
                        <Pressable onPress={() => {
                            navigation.navigate("VetsScreen", { onSelect: onSelectedVet });
                        }}>
                            <AntDesign name="plus" size={20} color="black" style={{ alignSelf: 'flex-end' }} />
                        </Pressable>
                    </View>
                </View>
            )}

            {!(vet_id == null) && (
                <View style={{ alignItems: 'baseline', marginLeft: 22, marginRight: 22 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, alignSelf: 'stretch', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={styles.smallImgView}>
                                <Image source={require('../assets/physical-examination-1.png')} style={styles.img} />
                            </View>

                            {!(vet_street == null) && (
                                <View style={{ marginRight: 20, marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{vet_name}</Text>
                                    <Text>{vet_street}</Text>
                                    <Text>{vet_city}</Text>
                                </View>
                            )}

                            {vet_street == null && (
                                <View style={{ marginRight: 20, marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{vet_name}</Text>
                                </View>
                            )}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center' }}>
                            <FontAwesome name="trash" size={24} color="black" style={{ marginRight: 20 }} />
                            <Pressable onPress={() => {
                                navigation.navigate("VetsScreen", { onSelect: onSelectedVet });
                            }}>
                                <MaterialIcons name="edit" size={24} color="black" style={{}} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}


            <Pressable onPress={() => { addClinicalHistoryPressed() }}>
                <Text style={styles.pressableStyle}>AÑADIR</Text>
            </Pressable>

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

export default CreateClinicalHistory;