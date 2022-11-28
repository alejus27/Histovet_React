import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Image, TextInput,} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { db } from "../FirebaseApp"
import { collection, doc, getDocs } from "firebase/firestore";

const PetHistoryScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        setFilteredDataSource(vaccinations);
        setMasterDataSource(vaccinations);
    }, []);

    // const getHistoryList = async () => {
    //     try {
    //         let querySnapshot = await getDocs(collection(db, "vac_list"));

    //         let documents = querySnapshot.docs

    //         FOR TESTING PURPOSES
    //         for (let i = 0; i < documents.length; i++) {
    //             const currDocument = documents[i]
    //             console.log(`ID: ${currDocument.id}`)
    //             console.log(currDocument.data())
    //             console.log("------")
    //         }

    //         setFilteredDataSource(documents);
    //         setMasterDataSource(documents);

    //     } catch (err) {
    //         console.log(`${documents.id}`)    
    //         console.log(`${err.message}`)        
    //     }
    // }
    
    const vaccinations = [
        {id: 1, name: "Canine Lepto Vaccine", lastDone: "2021-09-16", nextVaccination: "2022-09-16"},
        {id: 2, name: "Canine Bordatella with Vaccina", lastDone: "2021-09-16", nextVaccination: "2022-09-16"},
        {id: 3, name: "Canine DHPP Annual", lastDone: "2021-09-16", nextVaccination: "2022-09-16"}
    ];

    const renderItem = ( {item} ) => (
        <Pressable onPress={ () => {
            //maybe add navigation for details (not yet confirmed)
            console.log(`${item.name}`);
        }
        }>
            <View style={styles.histories}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Image source={require('../assets/injection.png')} style={styles.img}/>
                    <View>
                        <View style={{flexDirection:'column', marginLeft:20, alignItems:'baseline'}}>
                            <Text style={{fontSize:18, fontWeight:'bold'}}>{item.name}</Text>
                            <Text style={{fontSize:14}}>Last Done: {item.lastDone}</Text>
                            <Text style={{fontSize:14}}>Next Vaccination: {item.nextVaccination}</Text>
                        </View> 
                    </View>
                </View>
                {/* arrow right icon */}
                <AntDesign name="right" size={20} color='#335C67' style={{marginRight:22}}/>
            </View>
        </Pressable>
    );

    const ItemDivider = () => {
        return (
            <View style={{height: 1, width: "100%", backgroundColor: "#cccccc"}}/>
        )
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          const newData = masterDataSource.filter(function (item) {
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
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
            {/* add new vaccination button */}
            <Pressable onPress={ () => {
                    navigation.navigate("AddPetHistoryScreen");
                    }}>
                        <Text style={styles.addNewButton}>Add New Vaccination</Text>
                </Pressable>
            {/* History Lists */}
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
    histories: {
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
    addNewButton: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        fontSize: 18,
        padding: 15,
        width: '90%',
    },
});

export default PetHistoryScreen;

