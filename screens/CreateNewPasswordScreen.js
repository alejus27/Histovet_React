import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useState } from "react";
import CheckBox from "expo-checkbox";
import { UseTogglePasswordVisibility } from '../UseTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CreateNewPasswordScreen = ({navigation}) => {
    const [isSelected, setSelection] = useState(false);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            <View>
             
            <Text style={styles.title}>Create new password</Text>
            <Text style={{textAlign:'left',marginTop:10, marginLeft:36, marginRight:35}}>Your new password must be different from previous used passwords.</Text>

            <View style={{ alignItems:'baseline', alignSelf:'center', marginTop: 30, justifyContent:'space-between'}}>
            <Text style={{marginBottom:5, fontSize:16, marginTop:20}}>Old Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.inputField}
                        placeholder="Enter password"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </Pressable>
                    
                </View>

                <Text style={{marginBottom:5, fontSize:16, marginTop:20}}>New Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.inputField}
                        placeholder="Enter password"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </Pressable>
                    
                </View>
                <Text style={{marginBottom:5, fontSize:16, marginTop: 0, color:'grey'}}>Password must be at least 8 characters</Text>

                <Text style={{marginBottom:5, fontSize:16, marginTop:20}}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.inputField}
                        placeholder="Enter password"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </Pressable>
                    
                </View>
                <Text style={{marginBottom:5, fontSize:16, marginTop: 0, color:'grey'}}>Both passwords must match</Text>

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
                            {text: 'OK', onPress: () => navigation.dispatch(StackActions.replace('Authentication'))},  //console.log('OK Pressed')
                        ]  
                        );
                    }}>
                        <Text style={styles.deletePressable}>Reset Password</Text>
                </Pressable>

            </View>
           
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
    inputField: {
        padding: 10,
        width: '90%',
        
    },
    inputContainer: {
        height: 40,
        width: 350,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#808080'
    },
});

export default CreateNewPasswordScreen;