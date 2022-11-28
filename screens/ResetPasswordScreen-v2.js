import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { UseTogglePasswordVisibility } from '../UseTogglePasswordVisibility';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../FirebaseApp";
import { collection, getDoc, query, where, doc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons'; 

const ResetPasswordScreen_v2 = ({navigation}) => {
    const [emailAddress, onEmailChanged] = useState('');
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, setError] = useState('');
    const [codeIsSent, setCodeSent] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();

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

    const sendVerificationEmailPressed = async () => {
        try {
            // await auth.getUserByEmail(emailAddress)
            //     .then((userRecord) => {
            //         // See the UserRecord reference doc for the contents of userRecord.
            //         console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
            //     })
            //     .catch((error) => {
            //         console.log('Error fetching user data:', error);
            //     });

            // const docRef = query(collection(db, "Users"), where("email", "==",emailAddress));
            const docRef = doc(db, "Users", 'IgOOQaJ22Ohr1twPZ93jtimCMpN2');
            const userToUpdate = await getDoc(docRef);
            const userData = userToUpdate.data();
            console.log(userData);
            // console.log(userData.email);
            sendEmailVerification(userToUpdate, {
                handleCodeInApp: true,
                url: 'https://mphr-fall2022.firebaseapp.com',
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

    const updatePasswordPressed = async() => {
        // updatePassword(user, password);
        // navigation.reset({index:0, routes:[{name: 'Profile', params: {user: user}}]});

        // const docRef = doc(db, "profiles", profile);
        // const profileToUpdate = await getDoc(docRef);
        // const updatedProfileData = {
        //     userId:profileToUpdate.data().userId,
        //     first_name:profileToUpdate.data().first_name,
        //     last_name:profileToUpdate.data().last_name,
        //     phone_number:profileToUpdate.data().phone_number,
        //     address_1: address1,
        //     address_2: address2,
        //     city: city,
        //     country: selectedCountry,
        //     province: selectedProvince,
        //     postal_code: postalcode
        // };
        // try {
        //     updateDoc(docRef, updatedProfileData);
        //     navigation.reset({index:0, routes:[{name: 'MainNavigator', params: {user: profileToUpdate.data().userId}}], key:null});
        // }
        // catch (err) {
        //     console.log(`${err.message}`);
        // }
    }

    useEffect(()=>{
        // const docRef = query(collection(db, "Users"), where("email", "==",emailAddress));
        // const docRef = doc(db, "Users", emailAddress);
        // const userToUpdate = await getDoc(docRef);
        // const userData = userToUpdate.data();
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
            if (userFromFirebaseAuth) {
                console.log('signed up user: '+userFromFirebaseAuth.email); 
                userFromFirebaseAuth.reload();
                if (userFromFirebaseAuth.emailVerified){
                    setLoggedInUser(userFromFirebaseAuth);  
                    console.log('verified user: '+userFromFirebaseAuth.email);
                    setIsVerified(true);
                }   
            }
            else {
              setLoggedInUser(null);
            }
          })
          return listener
    }, [timeLeft])

    return (
        <SafeAreaView style={{flex:1}}>

            { !codeIsSent && !isVerified && (
                <View>
                    <Text style={styles.screentitle}>Forgot Password</Text>
                    <Text style={styles.descTxt}>Verify your email to change your password.</Text>
                    <Text style={styles.titleTxt}>Enter your email address</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="example@example.example"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={onEmailChanged}
                        value={emailAddress}
                    />
                    <Pressable onPress={sendVerificationEmailPressed} disabled={codeIsSent}>
                        <Text style={styles.PressableStyle}>Send Verification Email</Text>
                    </Pressable>
                </View>
            )}

            { hasError && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}

            { codeIsSent && (
                <View>
                    <Text style={styles.screentitle}>Forgot Password</Text>
                    <Text style={styles.descTxt}>Verify your email to change your password.</Text>
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

            { isVerified && (
                <View>
                    <Text style={styles.screentitle}>Set New Password</Text>
                    <Text style={styles.descTxt}>Your email has been successfully verified. Please set a new password</Text>
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
                    <Pressable onPress={updatePasswordPressed}>
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
    },
    inputField: {
        padding: 10,
        width: '90%'
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
    disabledPressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: 'lightgray',
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
        marginTop: 22
    },
    errorStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        marginTop: 22
    }
});

export default ResetPasswordScreen_v2;