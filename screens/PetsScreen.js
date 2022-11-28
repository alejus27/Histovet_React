import { StyleSheet, Text, SafeAreaView, Pressable, FlatList, View, Image, Alert } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from '../FirebaseApp';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';
import image from "../assets/fondo.jpg";


const PetsScreen = ({ navigation }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [usersPets, setUsersPets] = useState([]);
    const [usersCaregiving, setUsersCaregiving] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => {
                        navigation.navigate("Settings", { userId: loggedInUser.uid });
                    }}>
                        <Ionicons name="settings-sharp" size={24} color='#335C67' style={{ marginRight: 15 }} />
                    </Pressable>
                    <Pressable onPress={() => {
                        Alert.alert('Logout', 'Are you sure you want to logout?', [
                            { text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel' },
                            {
                                text: 'YES', onPress: async () => {
                                    try {
                                        await signOut(auth);
                                        navigation.reset({ index: 0, routes: [{ name: 'AuthenticationNavigator' }], key: null });
                                    } catch (err) {
                                        console.log(`Logout failed: ${err.message}`);
                                    }
                                }
                            },
                        ]);
                    }}>
                        <MaterialIcons name="logout" size={24} color='#335C67' />
                    </Pressable>
                </View>
            )
        })
    }, [loggedInUser, isFocused])

    useEffect(() => {
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

    useEffect(() => {
        getUserPets();
        getUserCaregiving();
    }, [loggedInUser, isFocused])

    useEffect(() => {
        setFilteredDataSource(usersPets.concat(usersCaregiving));
        setMasterDataSource(usersPets.concat(usersCaregiving));
    }, [usersPets, usersCaregiving])

    const getUserPets = async () => {
        var index = 0;
        var pets = [];
        try {
            //const docRef = query(collection(db, "pets"), where("owner", "==", loggedInUser.uid));

            const clinicRef = query(collection(db, "profiles"), where("userId", "==", loggedInUser.uid));
            const clinicquerySnapshot = await getDocs(clinicRef);
            const clinicProfile = clinicquerySnapshot.docs[0].data().clinic;

            const docRef = query(collection(db, "pets"), where("clinic", "==", clinicProfile));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            while (index < documents.length) {
                pets.push({ key: documents[index].id, owner: 'You', value: documents[index] });
                index = index + 1;
            }
            setUsersPets(pets);
        } catch (err) {
            console.log("Getting User's Pets: " + err.message);
        }
    }

    const getUserCaregiving = async () => {
        var index = 0;
        var pets = [];
        try {
            const caregivingDocRef = query(collection(db, "caregiving"), where("user", "==", loggedInUser.uid));
            const caregivingQuerySnapshot = await getDocs(caregivingDocRef);
            const caregivingDocuments = caregivingQuerySnapshot.docs;

            while (index < caregivingDocuments.length) {
                try {
                    const petDocRef = doc(db, "pets", caregivingDocuments[index].data().pet);
                    const petQuerySnapshot = await getDoc(petDocRef);

                    try {
                        const userProfileDocRef = query(collection(db, "profiles"), where("userId", "==", petQuerySnapshot.data().owner));
                        const userProfileQuerySnapshot = await getDocs(userProfileDocRef);
                        const userProfileDocument = userProfileQuerySnapshot.docs;

                        pets.push({
                            key: petQuerySnapshot.id,
                            owner: userProfileDocument[0].data().first_name + " " + userProfileDocument[0].data().last_name,
                            value: petQuerySnapshot
                        });
                    } catch (err) {
                        console.log("Getting User's Caregiving Profile: " + err.message);
                    }
                } catch (err) {
                    console.log("Getting User's Caregiving Pet: " + err.message);
                }
                index = index + 1;
            }
            setUsersCaregiving(pets);
        } catch (err) {
            console.log("Getting User's Caregiving: " + err.message);
        }
    }



    const onChangeSearch = query => setSearchQuery(query);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        console.log("inside filter function..");
        if (text) {
            console.log("text is : " + text);

            const newData = masterDataSource.filter(function (item) {
                const itemData = item.value.data().name //item.first_name
                    ? item.value.data().name.toUpperCase()
                    : ''.toUpperCase();
                console.log("itemData is : " + itemData);
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            //setMasterDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            //setMasterDataSource(masterDataSource);
            setSearch(text);
        }
    };


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
        if (age === 0) {
            return `${month} months`;
        }
        else {
            return `${age} years ${month} months`;
        }
    }

    const renderItem = ({ item }) => (
        <Pressable onPress={() => {
            navigation.navigate("PetProfileScreen", { pet: item.key });
        }
        }>
            <View style={styles.pet}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={styles.imgView}>
                        <Image source={require('../assets/paw.png')} style={styles.img} />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={{ marginLeft: 20, fontSize: 18 }}>{item.value.data().name}</Text>
                            
                        </View>
                        <Text style={{ marginLeft: 20, color: 'dimgray' }}>Edad:
                            <Text style={{ color: 'gray' }}> {item.value.data().age}</Text>
                        </Text>
                        <Text style={{ marginLeft: 20, color: 'dimgray' }}>Especie:
                            <Text style={{ color: 'gray' }}> {item.value.data().specie}</Text>
                        </Text>
                    </View>
                </View>
                <AntDesign name="right" size={20} color='#335C67' style={{ marginRight: 22 }} />
            </View>
        </Pressable>
    );

    const ItemDivider = () => {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "#cccccc" }} />
        )
    }

    /*const vet_n = async () => {

        const clinicRef = query(collection(db, "profiles"), where("userId", "==", loggedInUser.uid));
        const clinicquerySnapshot = await getDocs(clinicRef);
        const clinicProfile = clinicquerySnapshot.docs[0].data().clinic;

        return clinicProfile.text;

    }*/

    return (
        <SafeAreaView style={styles.container}>


            <View style={styles.container2}>

                <View style={styles.imgView2}>
                    <Image source={require('../assets/vet.png')} style={styles.img} />
                </View>

                <Pressable onPress={() => {
                    navigation.navigate("AppointmentScreen", { user: loggedInUser.uid })
                }}>
                    <Text style={styles.pressableStyle}>CITAS MÉDICAS</Text>
                </Pressable>

                <Pressable onPress={() => {
                    navigation.navigate("VetsScreen2", { clinic: loggedInUser.uid })
                }}>
                    <Text style={styles.pressableStyle}>VETERINARIAS</Text>
                </Pressable>

                <Pressable onPress={() => {
                    navigation.navigate("MedicineScreen", { user: loggedInUser.uid })
                }}>
                    <Text style={styles.pressableStyle}>MEDICAMENTOS</Text>
                    <View style={{marginBottom: 30 }}>

                    </View>
                </Pressable>

              

            </View>

            <View style={{ marginTop: 10, marginBottom: 10 }}>


                <Text style={styles.pressableStyle2}>MASCOTAS</Text>

                <Searchbar placeholder="Search" onChangeText={(text) => searchFilterFunction(text)} value={search} style={styles.searchBar} />
                {/*<Pressable onPress={ () => {
                    navigation.navigate("CreatePetProfile", {user:loggedInUser.uid})
                }}>
                    <Text style={styles.pressableStyle}>AÑADIR MASCOTA</Text>
            </Pressable>*/}
            </View>

            <FlatList
                data={filteredDataSource}
                keyExtractor={item => item.key}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemDivider}
            />
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container2: {
        backgroundImage: `url(${image})`,
        //backgroundColor: '#335C67',

    },
    pet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
    img: {
        width: '100%',
        height: undefined,
        aspectRatio: 1
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

    imgView2: {
        width: 100,
        height: 100,
        //borderRadius: '100%',
        //borderWidth: 1,
        //borderColor: 'black',
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
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 15,
        padding: 15,
        width: '30%',
        fontWeight: 'bold',
        borderRadius: 100,
    },
    pressableStyle2: {
        alignSelf: 'center',
        textAlign: 'center',
        //backgroundColor: '#335C67',
        color: '#335C67',
        // backgroundColor: '#ffffff',
        // color: '#335C67',
        // borderColor: '#335C67',
        // borderStyle: 'solid',
        // borderWidth: 1,
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 25,
        padding: 15,
        width: '100%',
        fontWeight: 'bold'
    },
    searchBar: {
        width: '90%',
        alignSelf: 'center',
        elevation: 1
    }
});

export default PetsScreen;
