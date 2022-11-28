import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import { AntDesign, MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { db } from '../FirebaseApp';
import { collection, setDoc, doc, Timestamp } from "firebase/firestore";

const CreateHospitalization = ({ navigation, route }) => {
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
    const [medicine, onMedicineChanged] = useState('');
    const [medicine_quantity, onQuantityChanged] = useState('');
    const [medicine_frequency, onFrequencyChanged] = useState('');
    const [medicine_via, onViaChanged] = useState('');
    const [remark, onRemarkChanged] = useState('');
    const [vet_id, setVetId] = useState(null);
    const [vet_name, setVetName] = useState('');
    const [vet_street, setVetStreet] = useState(null);
    const [vet_city, setVetCity] = useState('');

    const { petId, petName, ownerName } = route.params;

    /*const vaccination_ = [
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
     */

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


    const addHospitalizationPressed = async () => {
        const today = new Date();

        const newDoc = doc(collection(db, "hospitalization"));
        try {
            await setDoc(newDoc, {
                id: newDoc.id,
                owner_name: ownerName,
                pet_name: petName,
                pet_id: petId,
                date: Timestamp.fromDate(today),
                clinic: vet_name,
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
                medicine_frequency: medicine_frequency,
                medicine_via: medicine_via,
                remark: remark,
            }
            );
            navigation.pop(1);
        }
        catch (err) {
            console.log(`${err.message}`);
        }

        {/*try {
            const hospitalizationToInsert = {
                owner_name: ownerName,
                pet_name: petName,
                pet_id: petId,
                date: Timestamp.fromDate(today),
                clinic: vet_name,


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
                medicine_frequency: medicine_frequency,
                medicine_via: medicine_via,
                remark: remark,


            };

            const insertedHospitalization = await addDoc(collection(db, "hospitalization"), hospitalizationToInsert);
            navigation.pop(2);
        }
        catch (err) {
            console.log(`${err.message}`);
        }*/}

    }

    return (
        <SafeAreaView style={styles.area}>



            <View style={styles.imgView}>
                <Image source={require('../assets/logo2.png')} style={styles.img} />
            </View>


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

            <Text style={styles.text}>Medicinas aplicadas *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onMedicineChanged}
                value={medicine}
            />

            <Text style={styles.text}>Cantidad *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onQuantityChanged}
                value={medicine_quantity}
            />
            <Text style={styles.text}>Frecuencia *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onFrequencyChanged}
                value={medicine_frequency}
            />

            <Text style={styles.text}>Via de aplicación *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onViaChanged}
                value={medicine_via}
            />

            <Text style={styles.text}>Observaciones *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onRemarkChanged}
                value={remark}
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


            <Pressable onPress={() => { addHospitalizationPressed() }}>
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
        fontSize: 15,
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

export default CreateHospitalization;