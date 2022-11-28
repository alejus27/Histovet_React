import { StyleSheet, Text, SafeAreaView, Pressable, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { db } from '../FirebaseApp';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';

const SettingScreen = ({navigation, route}) => {
    const [userData, setUserData] = useState([]);
    const [profileToSend, setProfileToSend] = useState(null);
    const [profileDoc, setProfileDoc] = useState(null);

    const isFocused = useIsFocused();

    const {userId} = route.params;

    useEffect(()=>{
        getUserDetails();
    }, [isFocused])

    const getUserDetails = async () => {
        try {
            const docRef = query(collection(db, "profiles"), where("userId", "==",userId));
            const querySnapshot = await getDocs(docRef);
            const userProfile = querySnapshot.docs[0];

            setProfileToSend(userProfile.id);
            setProfileDoc(userProfile);

            if (userProfile.data().address_2===''){
                const user = [
                    userProfile.data().first_name+' '+userProfile.data().last_name,
                    userProfile.data().email,
                    userProfile.data().phone_number,
                    userProfile.data().clinic
                ]
                setUserData(user);
            }
            else {
                const user = [
                    userProfile.data().first_name+' '+userProfile.data().last_name,
                    userProfile.data().email,
                    userProfile.data().phone_number,
                    userProfile.data().clinic
                ]
                setUserData(user);
            }
        } catch (err) {
            console.log(err.message);      
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.mainView}>
                <FontAwesome name="user-circle" size={60} color="black" style={{marginRight:10}}/>
                <View style={{flex:1, margin: 10}}>
                    <Text style={{fontWeight:'bold', fontSize:17}}>{userData[0]}</Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Email: 
                        <Text style={{color:'gray', fontWeight:'normal'}}> {userData[1]}</Text>
                    </Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Telefono: 
                        <Text style={{color:'gray', fontWeight:'normal'}}> {userData[2]}</Text>
                    </Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Veterinaria: 
                        <Text style={{color:'gray', fontWeight:'normal'}}> {userData[3]}</Text>
                    </Text>
                </View>
            </View>

            <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:16}}>Cuenta</Text>

            <View>
                <Pressable onPress={ () => {navigation.navigate("EditProfileScreen", {userProfile:profileToSend, profileDoc:profileDoc})}}>
                    <Text style={styles.pressableStyle}>EDITAR PERFIL</Text>
                </Pressable>
                <Pressable onPress={ () => {navigation.navigate("EditAddressScreen", {userProfile:profileToSend, profileDoc:profileDoc})}}>
                    <Text style={styles.pressableStyle}>EDITAR DIRECCIÓN</Text>
                </Pressable>
                <Pressable onPress={ () => {navigation.navigate("ChangePasswordScreen")}}>
                    <Text style={styles.pressableStyle}>CAMBIAR CONTRASEÑA</Text>
                </Pressable>
                <Pressable onPress={ () => {navigation.navigate("DeleteAccountScreen", {user:userId, userProfile:profileToSend})}}>
                    <Text style={styles.pressableStyle}>BORRAR CUENTA</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );

}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainView: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding: 22
        
    },
    pressableStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#fff',
        // backgroundColor: '#ffffff',
        // color: '#335C67',
        // borderColor: '#335C67',
        // borderStyle: 'solid',
        // borderWidth: 1,
        marginTop: 10,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
});

export default SettingScreen;