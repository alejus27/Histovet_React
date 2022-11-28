import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const Registration_v2 = ({navigation}) => {
    const [codeIsSent, setCodeSent] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [resendIsActive, setResendActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();

    let resendTimerInterval;

    const triggerTimer = (targetTimeInSeconds = 30) => {
        setTargetTime(targetTimeInSeconds);
        setResendActive(false);
        const finalTime = +new Date() + targetTimeInSeconds*1000;
        resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
    }

    const calculateTimeLeft = (finalTime) => {
        const difference = finalTime - +new Date();
        if (difference >= 0) {
            setTimeLeft(Math.round(difference/1000));
        }
        else {
            clearInterval(resendTimerInterval);
            setResendActive(true);
            setTimeLeft(null);
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            
            <View style={{height:120}}> 
                <ProgressSteps
                    borderWidth={3}
                    activeStepIconBorderColor="#335C67"
                    activeLabelFontSize={12}
                    activeLabelColor="black"
                    labelFontSize={12}
                    labelColor="black"
                    completedLabelColor="black"
                >
                    <ProgressStep label="Registration" removeBtnRow={true}/>
                    <ProgressStep label="Profile" removeBtnRow={true}/>
                    <ProgressStep label="Address" removeBtnRow={true}/>
                </ProgressSteps>
            </View>

            <Text style={styles.screentitle}>Registration</Text>

            { !emailConfirmed && (
                <View>
                    <Text style={styles.descTxt}>Verify your email to register. It will only take a few minutes.</Text>
                    <Text style={styles.titleTxt}>Enter your email address</Text>
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
                    triggerTimer(30);
                    return () => {
                        clearInterval(resendTimerInterval);
                    }
                }} disabled={codeIsSent}>
                    <Text style={styles.PressableStyle}>Send Verification Code</Text>
                </Pressable>
            )}

            { codeIsSent && resendIsActive && !emailConfirmed && (
                <View>
                    <Text style={styles.titleTxt}>Enter verification code</Text>
                    <Text style={styles.descTxt}>Enter the verification code that was sent to your email.</Text>
                    
                    <View style={{flexDirection:'row', marginLeft:22, marginTop:5, marginRight:22, alignSelf:'stretch'}}>
                        <TextInput
                            style={styles.verificationCode}
                            placeholder="------"
                            autoCapitalize="none"
                        />
                        <Pressable onPress={ () => {
                            // send a new verification code
                            triggerTimer(30);
                            return () => {
                                clearInterval(resendTimerInterval);
                            }
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

            { codeIsSent && !resendIsActive && !emailConfirmed && (
                <View>
                    <Text style={styles.titleTxt}>Enter verification code</Text>
                    <Text style={styles.descTxt}>Enter the verification code that was sent to your email.</Text>
                    
                    <View style={{flexDirection:'row', marginLeft:22, marginTop:5, marginRight:22, alignSelf:'stretch'}}>
                        <TextInput
                            style={styles.verificationCode}
                            placeholder="------"
                            autoCapitalize="none"
                        />
                        <Pressable onPress={ () => {
                            // !send a new verification code
                        }} style={{flex:1}} disabled={true}>
                            <View style={{flex:1, flexDirection:'row', alignSelf:'center'}}>
                                <Ionicons name="refresh" size={24} color='lightgray' style={{alignSelf:'center'}}/>
                                <Text style={{fontSize:15, alignSelf:'center', color:'lightgray'}}>Send again</Text>
                            </View>
                            <Text style={{alignSelf:'center', fontSize:12}}>
                                in <Text style={{fontWeight:'bold'}}>{timeLeft || targetTime}</Text> second(s)
                            </Text>
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
                    <Text style={styles.titleTxt}>Set a password</Text>
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
                        navigation.reset({index:0, routes:[{name: 'Profile'}]});
                    }}>
                        <Text style={styles.PressableStyle}>Next</Text>
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
        marginRight:22
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
});

export default Registration_v2;