import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import { useState, useEffect } from 'react';
import { db } from '../FirebaseApp';
import { updateDoc, doc } from "firebase/firestore";

const EditProfileScreen = ({navigation, route}) => {
    const [selectedNumCode, setSelectedNumCode] = useState("");
    const [firstname, onFirstnameChanged] = useState('');
    const [lastname, onLastnameChanged] = useState('');
    const [phonenumber, onPhonenumberChanged] = useState('');
    const [userProfileData, setUserProfileData] = useState(null);
    const [docRef, setDocRef] = useState(null);

    const numCode = [{key:'1',value:'+1'}];

    const {userProfile, profileDoc} = route.params;

    useEffect(() => {
        async function getProfile() {
            const docRef = doc(db, "profiles", userProfile);
            setDocRef(docRef);
            setUserProfileData(profileDoc.data());

            onFirstnameChanged(profileDoc.data().first_name);
            onLastnameChanged(profileDoc.data().last_name);
            onPhonenumberChanged(profileDoc.data().phone_number.slice(-10));
        }
        getProfile();
    }, [])

    const updateProfilePressed = async () => {
        const updatedProfileData = {
            userId:userProfileData.userId,
            emai:userProfileData.email,
            first_name:firstname,
            last_name:lastname,
            phone_number:selectedNumCode+phonenumber,
            address_1: userProfileData.address_1,
            address_2: userProfileData.address_2,
            city: userProfileData.city,
            country: userProfileData.country,
            province: userProfileData.province,
            postal_code: userProfileData.postal_code
        };
        try {
            updateDoc(docRef, updatedProfileData);
            navigation.goBack();
        }
        catch (err) {
            console.log(`${err.message}`);
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <Text style={styles.screentitle}>Perfil</Text>
            <Text style={styles.titleTxt}>Nombre</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onFirstnameChanged}
                value={firstname}
            />

            <Text style={styles.titleTxt}>Apellido</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onLastnameChanged}
                value={lastname}
            />

            <Text style={styles.titleTxt}>Número</Text>
            <View style={{flexDirection:'row', alignItems:'center', width:'90%', alignSelf:'center'}}>
                <SelectList 
                    setSelected={setSelectedNumCode} 
                    data={numCode} 
                    onSelect={() => {setSelectedNumCode(numCode[selectedNumCode-1].value)}}
                    boxStyles={styles.numCodeInput}
                    dropdownItemStyles={styles.numCodeInput}
                    dropdownStyles={{borderColor:'transparent'}}
                    maxHeight='100'
                    searchPlaceholder=""
                    search={false}
                    placeholder=" "
                />
                <TextInput 
                    style={styles.rowInput}
                    placeholder="(_ _ _)_ _ _-_ _ _"
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={onPhonenumberChanged}
                    value={phonenumber}
                />
            </View>

            {/*<Pressable onPress={() => {
                Alert.alert('UPDATE PROFILE', 'Are you sure you want to update your profile?', [  
                    {text: 'NO', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'YES', onPress: () => updateProfilePressed()}
                ]);
            }}>
                <Text style={styles.PressableStyle}>UPDATE PROFILE</Text>
        </Pressable>*/}

            <Pressable onPress={() => {
                updateProfilePressed()
            }}>
                <Text style={styles.PressableStyle}>ACTUALIZAR PERFIL</Text>
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
        marginTop:20, 
        marginBottom:5, 
        marginLeft:22, 
        marginRight:22
    },
    descTxt: {
        fontSize:15, 
        color:'#808080', 
        marginTop:5, 
        marginLeft:22, 
        marginRight:22
    },
    screentitle: {
        fontWeight:'bold', 
        fontSize:30, 
        marginLeft:22, 
        marginRight:22,
        marginTop:22
    }
});

export default EditProfileScreen;
