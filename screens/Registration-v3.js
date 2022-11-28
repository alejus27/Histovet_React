import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { useState, useEffect } from 'react';
import { UseTogglePasswordVisibility } from '../UseTogglePasswordVisibility';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseApp";
import { onAuthStateChanged } from "firebase/auth";
import { FontAwesome } from '@expo/vector-icons'; 

const Registration_v3 = ({navigation}) => {
    const [emailAddress, onEmailChanged] = useState('');
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, setError] = useState('');
    const [codeIsSent, setCodeSent] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [verifiedUser, onVerifiedUserChanged] = useState(false);

    let resendTimerInterval;

    const triggerTimer = (targetTimeInSeconds = 30) => {
        setTargetTime(targetTimeInSeconds);
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
            setTimeLeft(null);
            setCodeSent(false);
        }
    }

    const generateRandomString = (lenth) => {
        const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
        const random = Array.from(
            {length: lenth},
            () => char[Math.floor(Math.random() * char.length)]
        );
        const randomKey = random.join("");
        return randomKey
    }

    const sendVerificationEmailPressed = async () => {
        try {
            await createUserWithEmailAndPassword(auth, emailAddress, generateRandomString(8));
            sendEmailVerification(auth.currentUser, {
                handleCodeInApp: true,
                //url: 'https://mphr-fall2022.firebaseapp.com',
                url: 'https://veterinaria-11f1a.firebaseapp.com',
            });
            onHasErrorChanged(false);
            setCodeSent(true);
            triggerTimer(30);
            return () => {
                clearInterval(resendTimerInterval);
            }
        } catch (err) {
            onHasErrorChanged(true);
            setError(err.message);
            console.log(err.message);
        }
    }

    const interval = setInterval(function() {
        onAuthStateChanged(auth, (userFromFirebaseAuth) => {
            if (userFromFirebaseAuth) {
                userFromFirebaseAuth.reload();
                if (userFromFirebaseAuth.emailVerified){
                    setLoggedInUser(userFromFirebaseAuth);
                    onVerifiedUserChanged(true);
                    clearInterval(interval);
                }   
            };
        })
    }, 1 * 1000);

    useEffect(()=>{
        if (verifiedUser){ navigation.reset({index:0, routes:[{name: 'SetPassword', params: {user: loggedInUser}}]}); };
    }, [verifiedUser])

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

            <Text style={styles.screentitle}>Registro</Text>
            <Text style={styles.descTxt}>Verificación de correo electronico.</Text>

            { !codeIsSent && (
                <View>
                    <Text style={styles.titleTxt}>Ingrese su e-mail *</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="example@example.example"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={onEmailChanged}
                        value={emailAddress}
                    />
                    <Pressable onPress={sendVerificationEmailPressed} disabled={codeIsSent}>
                        <Text style={styles.PressableStyle}>ENVIAR E-MAIL DE CONFIRMACIÓN</Text>
                    </Pressable>
                </View>
            )}

            { hasError && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}

            { codeIsSent && (
                <View>
                    <Text style={styles.titleTxt}>Email address</Text>
                    <View style={styles.inputContainer}>
                        <FontAwesome name="lock" size={22} color="black" style={{marginLeft:10}}/>
                        <TextInput 
                            style={styles.disabledInput}
                            placeholder="example@example.example"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            selectTextOnFocus={false}
                            value={emailAddress}
                        />
                    </View>
                    <Pressable disabled={true}>
                        <Text style={styles.disabledPressable}>Send Verification Email</Text>
                    </Pressable>
                    <Text style={{alignSelf:'center', fontSize:13, marginTop:22}}>
                        Try again in <Text style={{fontWeight:'bold'}}>{timeLeft || targetTime}</Text> second(s)
                    </Text>
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
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    disabledPressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: 'lightgray',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 15,
        padding: 12,
        width: '90%',
        fontWeight: 'bold'
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
    errorStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        marginTop: 22
    }
});

export default Registration_v3;