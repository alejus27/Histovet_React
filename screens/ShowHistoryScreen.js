import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { db, storage } from '../FirebaseApp';
import { ref, deleteObject,getStorage, uploadBytes, getBlob } from "firebase/storage";
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';

const ShowHistoryScreen = ({ navigation, route }) => {
    const [records, setRecords] = useState([]);
    const [updated, setUpdated] = useState(false);

    const isFocused = useIsFocused();

    const { petId, petName } = route.params;

    useEffect(() => {
        setUpdated(false);
        navigation.setOptions({ title: petName + ' Historial Clinico' })
        getRecords();
    }, [isFocused, updated])

    const getRecords = async () => {
        try {
            const docRef = query(collection(db, "history"), where("pet", "==", petId), orderBy("date", "desc"));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            setRecords(documents);
        } catch (err) {
            console.log("Getting Pet's Records: " + err.message);
        }
    }

    const deleteMedicalRecord = async (url, id) => {
        let fileRef = ref(storage, url);
        deleteObject(fileRef)
            .then(async () => {
                await deleteDoc(doc(db, "history", id))
                    .then()
                    .catch((err) => {
                        console.log("ERROR: while deleting from history -> " + err.message);
                    });
                setUpdated(true);
            })
            .catch((err) => { console.log("ERROR: while deleting file -> " + err.message); })
    }

    const downloadMedicalRecord = async (refToFile) => {
        //const xhr = new XMLHttpRequest();
        //xhr.responseType = 'blob';
        //xhr.onload = (event) => {
        //   const blob = xhr.response;
        //};
        //xhr.open('GET', url);
        //xhr.send();
        
        const storage = getStorage()
        const fileRef = ref(storage, refToFile)
        const blob = await getBlob(fileRef)
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = 'myfilename.pdf'
        link.click()
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

    const renderItem = ({ item, index }) => (
        <View style={styles.eachRow}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexShrink: 1 }}>
                <MaterialCommunityIcons name="file-pdf-box" size={45} color="#335C67" />
                <View style={{ flexShrink: 1 }}>
                    <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: 'bold' }}>{item.data().reason}</Text>
                    <Text style={{ marginLeft: 20, color: 'dimgray', fontSize: 14 }}>At: {item.data().clinic}</Text>
                    <Text style={{ marginLeft: 20, color: 'dimgray', fontSize: 14 }}>Uploaded at: {getDate(item.data().date)}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable onPress={() => { downloadMedicalRecord(item.data().record) }}>
                    <MaterialCommunityIcons name="download" size={24} color='#335C67' style={{ marginRight: 5 }} />
                </Pressable>

                <Pressable onPress={() => {

                    deleteMedicalRecord(item.data().record, item.id);

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

export default ShowHistoryScreen;
