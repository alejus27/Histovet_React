import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useState } from "react";
import CheckBox from "expo-checkbox";
import { UseTogglePasswordVisibility } from '../UseTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ChangePasswordScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between', alignSelf:'center'}}>

            <Text style={styles.title}>Reset Password</Text>
            <Text style={{textAlign:'left',marginTop:10, marginLeft:36, marginRight:35}}> Enter the email or phone number associated with your account and we'll send you an email with instructions to reset your password.</Text>

            <View style={{marginTop:50}}/>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:16}}>Email Address</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter first name"
                    keyboardType="default"
                    autoCapitalize="none"
                />

                {/* <Text style={{margin:25, fontSize:16, alignSelf:'center'}}>Or</Text>

                <Text style={{marginBottom:5, fontSize:16}}>Phone number</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter phone number"
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                /> */}
            </View>
            <View  style={{marginTop:10, marginBottom:50}}> 
                <Pressable onPress={ () => {
                    // navigation.navigate("CheckMailScreen");
                        //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                        Alert.alert('Send instructions', 'Confirm',
                        [  
                            {  
                                text: 'Cancel',  
                                onPress: () => console.log('Cancel Pressed'),  
                                style: 'cancel',  
                            },  
                            {text: 'OK', onPress: () => navigation.navigate("CheckMailScreen")},  //console.log('OK Pressed')
                        ]  
                        );
                    }}>
                        <Text style={styles.deletePressable}>Send Instructions</Text>
                </Pressable>

            </View>
                
           
           


        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        height: 40,
        width: 350,
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
    },
    title: {
        // textAlign: 'center',
        alignSelf: 'center',
        padding: 20,
        fontWeight: 'bold',
        fontSize: '35'
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
        width: 350,
    },
});

export default ChangePasswordScreen;