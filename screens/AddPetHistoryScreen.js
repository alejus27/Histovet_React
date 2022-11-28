import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert, Platform } from 'react-native';
// import DatePicker from 'react-native-datepicker';
// import DatePicker from 'react-native-modern-datepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';

//ADD TO FIRESTORE AFTER ADDING DATA

const AddPetHistory = ({navigation}) => {
    // const [date, setDate] = useState(new Date())
    // const [show, setShow] = useState(false)
    // const [mode, setMode] = useState('date')
    // const [text, setText] = useState('Empty')

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date
    //     setShow(Platform.OS === 'ios')
    //     setDate(currentDate)

    //     let tempDate = new Date(currentDate)
    //     let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    //     console.log(fDate);
    // }

    // const showMode = (currentMode) => {
    //     setShow(true)
    // }

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
            
            <Text style={styles.title}>New Pet Vaccination</Text>

            <Text style={{marginBottom:5, marginLeft:22}}>Vaccination Name *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter name"
                keyboardType="default"
                autoCapitalize="none"
            />

            <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Latest Vaccination Date *</Text>
            
            <Pressable onPress={() => showMode('date')}>
                <TextInput 
                // editable = {false}
                style={styles.input}
                placeholder="Enter Vaccination Date"
                keyboardType="default"
                autoCapitalize="none"
            />
            </Pressable>

            <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Next Vaccination Date *</Text>
            <TextInput  
                style={styles.input}
                placeholder="Enter Next Vaccination Date"
                keyboardType="default"
                autoCapitalize="none"
                // editable = {false}
            />
            

            <Pressable onPress={ () => {
                // navigation.navigate("CreatePetProfile2Screen")
                    Alert.alert('Save Changes', 'Confirm',
                    [  
                        {  
                            text: 'Cancel',  
                            onPress: () => console.log('Cancel Pressed'),  
                            style: 'cancel',  
                        },  
                        {text: 'OK', onPress: () => console.log('OK Pressed')},  
                    ]  
                    );
                }}>
                <Text style={styles.deletePressable}>Add Vaccination</Text>
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
        fontSize: '30'
    },
    input: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
    },
    deletePressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 18,
        padding: 15,
        width: '90%',
        marginBottom:22
    },
    saveChanges: {
        // borderRadius: 5,
        // borderWidth: 1,
        flex:1, 
        alignItems:'baseline',
        alignSelf:'center'
    },
    deleteAccount: {
        // borderRadius: 5,
        // borderWidth: 1,
        //flex:1, 
        alignItems:'center',
        alignSelf:'center'
    }
});

export default AddPetHistory;