import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Image  } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { AntDesign, MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import SelectList from 'react-native-dropdown-select-list';
import { useState } from 'react';

const ProfileInfo = ({ navigation, route }) => {
    const [selectedNumCode, setSelectedNumCode] = useState("");
    const [firstname, onFirstnameChanged] = useState('');
    const [lastname, onLastnameChanged] = useState('');
    const [phonenumber, onPhonenumberChanged] = useState('');

    const [vet_id, setVetId] = useState(null);
    const [vet_name, setVetName] = useState('');
    const [vet_street, setVetStreet] = useState(null);
    const [vet_city, setVetCity] = useState('');


    const { user } = route.params;

    const numCode = [{ key: '1', value: '+57' }];

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
        const profileToInsert = {
            userId: user.uid,
            email: user.email,
            first_name: firstname,
            last_name: lastname,
            phone_number: selectedNumCode + phonenumber,
            clinic: vet_name,
        };
        navigation.navigate('Address', { profile: profileToInsert });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 120 }}>
                <ProgressSteps
                    borderWidth={3}
                    activeStepIconBorderColor="#335C67"
                    activeLabelFontSize={12}
                    activeLabelColor="black"
                    labelFontSize={12}
                    labelColor="black"
                    activeStep={1}
                    completedLabelColor="black"
                    completedStepIconColor="#335C67"
                    completedProgressBarColor="#335C67"
                >
                    <ProgressStep label="Registration" removeBtnRow={true} />
                    <ProgressStep label="Profile" removeBtnRow={true} />
                    <ProgressStep label="Address" removeBtnRow={true} />
                </ProgressSteps>
            </View>
            <Text style={styles.screentitle}>Información</Text>
            <Text style={styles.descTxt}>Complete los campos</Text>
            <Text style={styles.titleTxt}>Nombre *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onFirstnameChanged}
                value={firstname}
            />
            <Text style={styles.titleTxt}>Apellidos *</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onLastnameChanged}
                value={lastname}
            />
            <Text style={styles.titleTxt}>Phone number *</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center' }}>
                <SelectList
                    setSelected={setSelectedNumCode}
                    data={numCode}
                    onSelect={() => { setSelectedNumCode(numCode[selectedNumCode - 1].value) }}
                    boxStyles={styles.numCodeInput}
                    dropdownItemStyles={styles.numCodeInput}
                    dropdownStyles={{ borderColor: 'transparent' }}
                    maxHeight='100'
                    searchPlaceholder=""
                    search={false}
                    placeholder=" "
                />
                <TextInput
                    style={styles.rowInput}
                    placeholder=""
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={onPhonenumberChanged}
                    value={phonenumber}
                />
            </View>



            <Text style={{ fontSize: 15, margin: 22, fontWeight: 'bold' }}>Clinica veterinaria *</Text>
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




            <Pressable onPress={nextPressed}>
                <Text style={styles.PressableStyle}>SIGUIENTE</Text>
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
    numCodeInput: {
        alignSelf: 'center',
        height: 45,
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        borderRadius: '0%',
    },
    rowInput: {
        flex: 1,
        alignSelf: 'center',
        height: 45,
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        borderRadius: '0%',
        marginLeft: 5
    },
    PressableStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    titleTxt: {
        marginTop: 15,
        marginBottom: 5,
        marginLeft: 22,
        marginRight: 22
    },
    descTxt: {
        fontSize: 15,
        color: '#808080',
        marginTop: 5,
        marginLeft: 22,
        marginRight: 22
    },
    screentitle: {
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: 22,
        marginRight: 22
    }
});

export default ProfileInfo;