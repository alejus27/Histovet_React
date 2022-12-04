import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Image, TextInput, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { db } from "../FirebaseApp"
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
const AppointmentScreen = ({ navigation, route }) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const { u_id } = route.params;


    useEffect(() => {
        getVetList()
        //setFilteredDataSource(vets);
        //setMasterDataSource(vets);
    }, []);

    const getVetList = async () => {
        try {


            const docRef = query(collection(db, "appointment"), where("doctor", "==",u_id));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;


            setFilteredDataSource(documents);
            setMasterDataSource(documents);
        } catch (err) {
            //console.log(`${documents.id}`)    
            console.log(`${err.message}`)
        }
    }

    const deleteRecord = async (id) => {
        await deleteDoc(doc(db, "appointment", id))
            .then(console.log("removed"))
            .catch((err) => {
                console.log(err.message);
                onErrorChanged(err.message);
                onHasErrorChanged(true);
            });
        navigation.pop(1);
    }


    const renderItem = ({ item }) => (
        <Pressable onPress={() => { }
        }>
            <View style={styles.vet}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexShrink: 1 }}>
                    <Image source={require('../assets/app_logo.png')} style={styles.img} />
                    <View style={{ flexDirection: 'column', marginLeft: 20, alignItems: 'baseline', flexShrink: 1 }}>

                        <Text style={{ fontSize: 14 }}>{item.data().vet_name}</Text>
                        <Text style={{ fontSize: 14 }}>{item.data().fecha}</Text>
                        <Text style={{ fontSize: 14 }}>{item.data().time}</Text>
                    </View>

                    <Pressable onPress={() => {
                        deleteRecord(item.id)
                    }}>
                        <MaterialCommunityIcons name="account-check" size={24} color='#008000' />

                    </Pressable>

                </View>
                {/*<AntDesign name="right" size={20} color='#336C67' style={{marginRight:22}}/>*/}
            </View>

        </Pressable>
    );

    const ItemDivider = () => {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "#cccccc" }} />
        )
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.data().name
                    ? item.data().name.toUpperCase()
                    : ''.toUpperCase();
                console.log("itemData is : " + itemData);
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />
            <View style={styles.addVetView}>
                <Text
                    onPress={() => navigation.navigate("AddTime", { u_id: u_id })}
                    style={styles.addVetText}>Registrar nuevos horarios de atención
                </Text>


            </View>

            <FlatList
                data={filteredDataSource}
                keyExtractor={item => item.id}
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
    vet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
    img: {
        marginLeft: 22,
        width: 65,
        height: 65,
        borderRadius: '20%',
        borderWidth: 2,
        borderColor: '#335C67',
    },
    textInputStyle: {
        height: 40,
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
    addVetText: {
        alignSelf: 'center',
        color: '#335C67',
        fontWeight: 'bold',
        fontSize: 15,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#335C67",
        marginTop: 5
    },
    addVetView: {
        padding: 10
    }
});

export default AppointmentScreen;
