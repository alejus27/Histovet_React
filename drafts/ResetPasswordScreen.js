import { SafeAreaView, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { useState } from "react";
import { StackActions } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';

const ResetPasswordScreen = ({navigation}) => {
    const [codeIsSent, setCodeSent] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();


    return (
        <SafeAreaView style={{flex:1}}>
            <Text style={styles.screentitle}>Forgot Password</Text>

            { !emailConfirmed && (
                <View>
                    <Text style={styles.titleTxt}>Email address</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="example@example.example"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
            )}

            { codeIsSent && emailConfirmed && (
                <View>
                    <Text style={styles.descTxt}>Your email address has been verified. {"\n"}Please set a password for your account.</Text>
                    <Text style={styles.titleTxt}>Email address</Text>
                    <View style={styles.disabledInputContainer}>
                        <FontAwesome name="lock" size={22} color="black" style={{marginLeft:10}}/>
                        <TextInput 
                            style={styles.disabledInput}
                            placeholder="example@example.example"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            selectTextOnFocus={false}
                            value={'george@gmail.com'}
                        />
                    </View>
            </View>
            )}

            { !codeIsSent && (
                <Pressable onPress={ () => {
                    setCodeSent(true);
                }} disabled={codeIsSent}>
                    <Text style={styles.PressableStyle}>Send Verification Code</Text>
                </Pressable>
            )}

            { codeIsSent && !emailConfirmed && (
                <View>
                    <Text style={styles.descTxt2}>We just sent you an email with a code</Text>
                    <Text style={styles.descTxt}>Enter the code to verify your account.</Text>
                    <Text style={styles.titleTxt}>Verification code</Text>

                    <View style={{flexDirection:'row', marginLeft:22, marginTop:5, marginRight:22, alignSelf:'stretch'}}>
                        <TextInput
                            style={styles.verificationCode}
                            placeholder="------"
                            autoCapitalize="none"
                        />
                        <Pressable onPress={ () => {
                            // send a new verification code
                        }} style={{flex:1}}>
                            <View style={{flex:1, flexDirection:'row', alignSelf:'center'}}>
                                <Ionicons name="refresh" size={24} color="black" style={{alignSelf:'center'}}/>
                                <Text style={{fontSize:15, alignSelf:'center'}}>Send again</Text>
                            </View>
                        </Pressable>
                    </View>
                    <Pressable onPress={ () => {
                        setEmailConfirmed(true);
                    }} disabled={emailConfirmed}>
                        <Text style={styles.PressableStyle}>Confirm</Text>
                    </Pressable>
                </View>
            )}

            { codeIsSent && emailConfirmed && (
                <View>
                    <Text style={styles.titleTxt}>New Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                        style={styles.inputField}
                        placeholder=""
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                        />
                        <Pressable onPress={handlePasswordVisibility}>
                            <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                        </Pressable>
                    </View>

                    <Text style={styles.titleTxt}>Confirm New Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                        style={styles.inputField}
                        placeholder=""
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                        />
                        <Pressable onPress={handlePasswordVisibility}>
                            <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                        </Pressable>
                    </View>
                    <Pressable onPress={ () => {
                        navigation.dispatch(StackActions.replace('TabsNavigator'))
                    }}>
                        <Text style={styles.PressableStyle}>Update Password</Text>
                    </Pressable>
                </View>
            )}
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
    },
    disabledInput: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        padding: 10,
        borderColor: '#808080',
    },
    disabledInputContainer: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        borderColor: '#808080',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    inputContainer: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        borderColor: '#808080',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    PressableStyle: {
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
    },
    verificationCode: {
        flex:1,
        alignSelf: 'center',
        height: 45,
        width: '60%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
    },
    inputContainer: {
        height: 45,
        width: '90%',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#808080',
        alignSelf: 'center'
    },
    inputField: {
        padding: 10,
        width: '90%'
    },
    titleTxt: {
        marginTop:15, 
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
    descTxt2: {
        fontSize:15, 
        color:'#808080', 
        marginTop:5, 
        marginLeft:22, 
        marginRight:22,
        marginTop: 10,
    },
    screentitle: {
        fontWeight:'bold', 
        fontSize:30, 
        marginLeft:22, 
        marginRight:22,
        marginTop: 22
    }
});

export default ResetPasswordScreen;