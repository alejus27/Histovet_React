import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import { AntDesign, MaterialIcons, FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { db } from '../FirebaseApp';
import { getDoc, doc } from "firebase/firestore";

import * as ImagePicker from 'expo-image-picker';

const EditPetScreen_1 = ({ navigation, route }) => {
    const [pet_name, onPetnameChanged] = useState('');
    const [pet_birthday, onPetbirthdayChanged] = useState('');
    const [pet_gender, onPetgenderChanged] = useState('');
    const [vet_id, setVetId] = useState(null);
    const [vet_name, setVetName] = useState('');
    const [vet_street, setVetStreet] = useState('');
    const [vet_city, setVetCity] = useState('');
    const [petData, setPetData] = useState(null);

    const { pet, petDoc } = route.params;

    const gender = [
        { key: '1', value: 'Male' },
        { key: '2', value: 'Female' }
    ]

    useEffect(() => {
        async function getPetData() {
            console.log(pet);
            const docRef = doc(db, "pets", pet);

            onPetnameChanged(petDoc.data().name);
            onPetbirthdayChanged(petDoc.data().birthday);

            if (petDoc.data().regular_clinic != null) {
                setVetId(petDoc.data().regular_clinic);
                getClinic(petDoc.data().regular_clinic);
            }

            setPetData(petDoc);
        }
        getPetData();
    }, [])

    const getClinic = async (vet) => {
        const docRef = doc(db, "vet_list", vet);
        const clinic = await getDoc(docRef);
        setVetName(clinic.data().name);
        setVetStreet(clinic.data().street_address);
        setVetCity(clinic.data().city_address);
    }

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

    const nextPressed = () => {
        const petToUpdate = {
            owner: petData.data().owner,
            name: pet_name,
            birthday: pet_birthday,
            gender: pet_gender,
            regular_clinic: vet_id,
            specie: petData.data().specie,
            breed: petData.data().breed,
            coat_color: petData.data().coat_color,
            mark: petData.data().mark,
            neutering: petData.data().neutering,
        };
        navigation.navigate('EditPetScreen-2', { pet: petToUpdate, pet_id: pet });
    }
    const state = {
        image: null,
    };
    let { image } = state;
    const _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        alert(result.uri);
        console.log(result)

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'space-between' }}>

            <View style={styles.imgView}>
                <Image source={require('../assets/paw.png')} style={styles.img} />
            </View>
            <Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 15 }}>
                    {/*<MaterialIcons name="file-upload" size={24} color='#335C67' />
                    <Text style={{ color: '#335C67', fontWeight: 'bold' }} onPress={_pickImage}>Change photo</Text>
                     <View style={{ 'marginTop': 20}}>
                        <Button
                        title="Select Image"
                        onPress={_pickImage}
                        />
                        {image &&
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View> */}
                </View>
            </Pressable>
            <Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 15 }}>
                {/* <MaterialCommunityIcons name="trash-can" size={24} color='#335C67' />
                    <Text style={{ color: '#335C67', fontWeight: 'bold' }}>Remove photo</Text>*/}
                </View>
            </Pressable>

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 30 }}>Pet Name *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onPetnameChanged}
                value={pet_name}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 20 }}>Pet Birthday *</Text>
            <TextInput
                style={styles.input}
                placeholder="YY-MM-DD"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onPetbirthdayChanged}
                value={pet_birthday}
            />

            <Text style={{ marginBottom: 5, marginLeft: 22, marginTop: 20 }}>Pet Gender *</Text>
            <SelectList
                setSelected={onPetgenderChanged}
                data={gender}
                onSelect={() => { onPetgenderChanged(gender[pet_gender - 1].value) }}
                boxStyles={styles.input}
                dropdownItemStyles={styles.input}
                dropdownStyles={{ borderColor: 'transparent' }}
                maxHeight='100'
                placeholder=" "
            />

            {vet_id == null && (
                <View style={{ flex: 1, alignItems: 'baseline', margin: 22 }}>
                    <Text style={{ marginBottom: 15, fontSize: 16, fontWeight: 'bold' }}>Regular Clinic</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <FontAwesome5 name="clinic-medical" size={24} color="black" />
                            <Text style={{ marginRight: 20, marginLeft: 20 }}>No regular Clinic</Text>
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
                <View style={{ flex: 1, alignItems: 'baseline', margin: 22 }}>
                    <Text style={{ marginBottom: 15, fontSize: 16, fontWeight: 'bold' }}>Regular Clinic</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, alignSelf: 'stretch', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={styles.smallImgView}>
                                <Image source={require('../assets/physical-examination-1.png')} style={styles.img} />
                            </View>
                            <View style={{ marginRight: 20, marginLeft: 20 }}>
                                <Text style={{ fontWeight: 'bold' }}>{vet_name}</Text>
                                <Text>{vet_street}</Text>
                                <Text>{vet_city}</Text>
                            </View>
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

            <Pressable onPress={nextPressed}>
                <Text style={styles.pressableStyle}>NEXT</Text>
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
        borderWidth: 1,
        borderColor: 'black',
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

export default EditPetScreen_1;