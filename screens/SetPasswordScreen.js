import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { UseTogglePasswordVisibility } from '../UseTogglePasswordVisibility';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { updatePassword } from 'firebase/auth';

const SetPasswordScreen = ({navigation, route}) => {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();
    const {user} = route.params;
    const [password, onPasswordChanged] = useState('');

    const nextPressed = () => {
        updatePassword(user, password);
        navigation.reset({index:0, routes:[{name: 'Profile', params: {user: user}}]});
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
                    value={user.email}
                />
            </View>

            <Text style={styles.titleTxt}>Set a password *</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.inputField}
                    placeholder=""
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    onChangeText={onPasswordChanged}
                />
                <Pressable onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                </Pressable>
                </View>
                <Pressable onPress={nextPressed}>
                    <Text style={styles.PressableStyle}>NEXT</Text>
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
});

export default SetPasswordScreen;