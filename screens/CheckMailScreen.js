import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const CheckMailScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            <View style={styles.mainView}>

            <MaterialCommunityIcons name="email-newsletter" size={74} color="black" />
            
            <Text style={styles.title}>Check your mail</Text>
            <Text style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35, fontSize:20, alignSelf: 'center'}}>We have sent a password recover instructions to your email.</Text>

            <View  style={{marginTop:10, marginBottom:50}}> 
                <Pressable onPress={ () => {
                    // navigation.navigate("CheckMailScreen");
                        //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                        Alert.alert('Opening email', 'Confirm',
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
                        <Text style={styles.deletePressable}>Open email app</Text>
                </Pressable>

            </View>
            <View style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35}}>
                {/* <Text style={{textAlign:'center'}}>Skip, I'll confirm later</Text> */}
                <Text  onPress={() => navigation.navigate("CreateNewPasswordScreen")} style={styles.terms_text}>Skip, I'll confirm later</Text> 
            </View>
            
            </View>
            <View style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35, paddingBottom: 40}}>
                <Text style={{textAlign:'center'}}>Did not recieve the email? Check your spam filter, or try another email address or phone number</Text>
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
        paddingTop: 50,
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
        width: 250,
    },
    mainView: {
       
       flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    terms_text: {
        color: 'blue'
    }
});

export default CheckMailScreen;