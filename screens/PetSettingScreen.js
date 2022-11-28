import { SafeAreaView, StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { auth, db } from '../FirebaseApp';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDoc, doc, getDocs } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';

const PetSettingScreen = (props) => {
    const [petDoc, setPetDoc] = useState(null);
    const [pet_name, setPetName] = useState('');
    const [pet_birthday, setPetBirthday] = useState('');
    const [caregivers, setCaregivers] = useState([]);
    const [ownerName, setOwnerName] = useState('');
    const [caregiversName, setCaregiversName] = useState([]);
    const [petOwner, setPetOwner] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);

    const {pet} = props.route.params;
    const isFocused = useIsFocused();

    useEffect(()=>{
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
        if (userFromFirebaseAuth) {
            setLoggedInUser(userFromFirebaseAuth);
        }
        else {
            setLoggedInUser(null);
        }
        })
        return listener
    }, [])

    useEffect(()=>{
        async function getPetData() {
            const docRef = doc(db, "pets", pet);
            const pet_data = await getDoc(docRef);
            setPetDoc(pet_data);
            setPetName(pet_data.data().name);
            setPetBirthday(pet_data.data().birthday);
            setPetOwner(pet_data.data().owner);
            getOwnerName(pet_data.data().owner);
        }
        getPetData();
        getCaregivers();
    }, [isFocused])

    useEffect(()=>{
        getCaregiversName();
    }, [caregivers])

    useEffect(()=>{
        if (loggedInUser!=null && petOwner!='') {
            if (loggedInUser.uid==petOwner) {setIsOwner(true)}
        }
    }, [loggedInUser, petOwner])

    const getOwnerName = async (owner_id) => {
        const userProfileDocRef = query(collection(db, "profiles"), where("userId", "==", owner_id));
        const userProfileQuerySnapshot = await getDocs(userProfileDocRef);
        const userProfileDocument = userProfileQuerySnapshot.docs;
        setOwnerName(userProfileDocument[0].data().first_name+" "+userProfileDocument[0].data().last_name);
    }

    const getCaregivers = async () => {
        try {
            const docRef = query(collection(db, "caregiving"), where("pet", "==", pet));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            setCaregivers(documents);
        } catch (err) {
            console.log("Getting User's Pets: " + err.message);        
        }
    }

    const getCaregiversName = async () => {
        var index = 0;
        var names = [];
        while (index<caregivers.length) {
            try {
                const docRef = query(collection(db, "profiles"), where("userId", "==", caregivers[index].data().user));
                const querySnapshot = await getDocs(docRef);
                const documents = querySnapshot.docs;
                names.push({key:index, value:documents[0].data().first_name+" "+documents[0].data().last_name});
            } catch(err) {
                console.log(err.message);
            }
            index = index+1;
        }
        setCaregiversName(names);
    }

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        var month = 0;
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
            month = birthDate.getMonth();
        }
        else {
            month = m
        }
        if (age===0) {
            return `${month} months`;
        }
        else {
            return `${age} years ${month} months`;
        }
    }

    const renderItem = ({item}) => (
        <View style={{flexDirection:'row'}}>
            <FontAwesome name="user-circle" size={15} color="black" style={{marginRight:5}}/>
            <Text style={{color:'gray', fontWeight:'normal'}}>{item.value}</Text>
        </View>
    )

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
            <View style={styles.mainView}>
                <View style={styles.imgView}>
                    <Image source={require('../assets/paw.png')} style={styles.img}/>
                </View>
                <View style={{flex:1, marginLeft:10}}>
                    <Text style={{fontWeight:'bold', fontSize:17}}>{pet_name}</Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Age: 
                        <Text style={{color:'gray', fontWeight:'normal'}}>{getAge(pet_birthday)}</Text>
                    </Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Owner: 
                        <Text style={{color:'gray', fontWeight:'normal'}}> {ownerName}</Text>
                    </Text>
                </View>
            </View>

            {caregivers.length!=0 && (
                <View style={{paddingLeft:22, paddingRight:22, marginTop:10}}>
                    <Text style={{color:'dimgray', fontWeight:'bold', marginBottom:5}}>Caregivers: </Text>
                    <FlatList
                        data={caregiversName}
                        keyExtractor={item => item.key}
                        renderItem={renderItem}
                    />
                </View>
            )}

            <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:16, marginBottom:20, marginTop:20}}>Settings</Text>
            
            { isOwner && (
                <View>
                    <Pressable onPress={ () => {props.navigation.navigate('EditPetScreen-1', {pet:pet, petDoc:petDoc})}}>
                        <Text style={styles.pressableStyle}>EDIT PET</Text>
                    </Pressable>
                    {/*
                    <Pressable onPress={ () => {props.navigation.navigate('ManageCaregiverScreen', {pet:pet, pet_name:pet_name})}}>
                        <Text style={styles.pressableStyle}>MANAGE CAREGIVERS</Text>
                    </Pressable>
                    <Pressable onPress={ () => {props.navigation.navigate('TransferPetOwnership', {pet:pet, petDoc:petDoc, user:loggedInUser.uid})}}>
                        <Text style={styles.pressableStyle}>TRANSFER OWNERSHIP</Text>
            </Pressable>*/}
                </View>
            )}
            <Pressable onPress={ () => {props.navigation.navigate('DeletePetScreen', {pet:pet, petDoc:petDoc})}}>
                <Text style={styles.pressableStyle}>REMOVE PET</Text>
            </Pressable>
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    mainView: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop: 22
    },
    rowView: {
        flexDirection:'row',
        paddingLeft:22,
        alignItems:'center'
    },
    img: {
        width:'100%', 
        height:undefined, 
        aspectRatio:1
    },
    imgView: {
        width: 60,
        height: 60,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        marginLeft: 22,
        padding: 8
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

export default PetSettingScreen;