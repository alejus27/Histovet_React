import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { db, storage } from '../FirebaseApp';
import { ref, deleteObject } from "firebase/storage";
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';

const ShowHistoryScreen2 = ({ navigation, route }) => {

    const [records, setRecords] = useState([]);
    const [updated, setUpdated] = useState(false);
    const isFocused = useIsFocused();

    const { petId, petName } = route.params;


    useEffect(() => {
        setUpdated(false);
        navigation.setOptions({ title: petName + ' - Versiones Historial Clinico' })
        getRecords();

    }, [isFocused, updated])


    const getRecords = async () => {
        try {
            const docRef = query(collection(db, "clinical_history"), where("pet_id", "==", petId), orderBy("date", "desc"));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            setRecords(documents);
        } catch (err) {
            console.log("Getting Pet's Records: " + err.message);
        }
    }


    const deleteMedicalRecord = async (id) => {
        await deleteDoc(doc(db, "clinical_history", id))
            .then(console.log("removed"))
            .catch((err) => {
                console.log(err.message);
                onErrorChanged(err.message);
                onHasErrorChanged(true);
            });
        navigation.pop(1);
    }


    const getDate = (date_obj) => {
        const date = new Date(date_obj.toDate());
        return date.toDateString()
    }

    const ItemDivider = () => {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "#cccccc" }} />
        )
    }

    const renderItem = ({ item }) => (
        <View style={styles.eachRow}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexShrink: 1 }}>
                <MaterialCommunityIcons name="text-box-multiple" size={45} color="#335C67" />
                <View style={{ flexShrink: 1 }}>
                    <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: 'bold' }}>{item.data().consultation_reason}</Text>
                    <Text style={{ marginLeft: 20, color: 'dimgray', fontSize: 14 }}>Fecha: {getDate(item.data().date)}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <Pressable onPress={() => {
                    console.log("item_id: "+item.id);
                    //setHisID(item.id);
                    navigation.navigate('EditClinicalHistory', {clinicalId:item.id})

                }}>
                    <MaterialCommunityIcons name="eye" size={24} color='#335C67' />
                </Pressable>

                <Pressable onPress={() => {
                    deleteMedicalRecord(item.id)
                    alert('Historia clinica eliminada!');
                }}>
                    <MaterialCommunityIcons name="trash-can" size={24} color='#335C67' />
                </Pressable>



            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={records}
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
    eachRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        marginRight: 22,
        marginLeft: 22,
        alignItems: 'center',
        alignSelf: 'stretch',
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
        width: '90%',
        fontWeight: 'bold'
    },
    searchBar: {
        width: '90%',
        alignSelf: 'center',
        elevation: 1
    }
});

export default ShowHistoryScreen2;
