import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Image, TextInput, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { db } from "../FirebaseApp"
import { collection, getDocs } from "firebase/firestore";

const Medicine2Screen = ({ navigation, route }) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        getMedList()
        // setFilteredDataSource(meds);
        // setMasterDataSource(meds);
    }, []);

    const onSelectedMed = data => {
        var count = 0;
        for (const [key, value] of Object.entries(data)) {
            var id;
            var name;
            for (const [key2, value2] of Object.entries(value)) {
                if (count == 0) { id = value2; }
                else if (count == 1) { name = value2; }
                count = count + 1;
            }
            sendMedData(id, name);
        }
    };

    const sendMedData = (id, name) => {
        const medData = {
            id: id,
            name: name,
           description: null,
        }
        route.params.onSelect({ selectedMed: medData });
        navigation.goBack();
    }

    const getMedList = async () => {
        try {
            let querySnapshot = await getDocs(collection(db, "medicine"));
            let documents = querySnapshot.docs
            setFilteredDataSource(documents);
            setMasterDataSource(documents);
        } catch (err) {
            console.log(`${documents.id}`)
            console.log(`${err.message}`)
        }
    }

    const medSelected = (med) => {
        const medData = {
            id: med.id,
            name: med.data().name,
            description: med.data().description
        }
        route.params.onSelect({ selectedMed: medData });
        navigation.goBack();
    }

    const renderItem = ({ item }) => (
        <Pressable onPress={() => {
            //maybe add navigation for details (not yet confirmed)
            medSelected(item);
        }
        }>
            <View style={styles.med}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexShrink: 1 }}>
                    <Image source={require('../assets/physical-examination-1.png')} style={styles.img} />
                    <View style={{ flexDirection: 'column', marginLeft: 20, alignItems: 'baseline', flexShrink: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.data().name}</Text>
                        <Text style={{ fontSize: 14 }}>{item.data().description}</Text>
                
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
            {/*<View style={styles.addMedView}>
                <Text  
                    onPress={() => navigation.navigate("AddMedClinicsScreen", {onSelect: onSelectedMed})} 
                    style={styles.addMedText}>Registrar nueva mederinaria
                </Text> 
    </View>*/}
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
    med: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
    img: {
        marginLeft: 22,
        width: 60,
        height: 60,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
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
    addMedText: {
        alignSelf: 'center',
        color: '#335C67',
        fontWeight: 'bold',
        fontSize: 15,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#335C67",
        marginTop: 5
    },
    addMedView: {
        padding: 10
    }
});

export default Medicine2Screen;
