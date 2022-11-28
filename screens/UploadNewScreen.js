import { SafeAreaView, StyleSheet, Text, Pressable, Alert, TextInput, View, ActivityIndicator, Image } from 'react-native';
import { AntDesign, MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons'; 
import { useState } from "react";
import { db, storage } from '../FirebaseApp';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import * as DocumentPicker from 'expo-document-picker';

const UploadNewScreen = ({navigation, route}) => {
    const [fileName, setFileName] = useState("Upload Medical Record");
    const [blobFile, setBlobFile] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [reason, setReason] = useState("");
    const [vet_id, setVetId] = useState(null);
    const [vet_name, setVetName] = useState('');
    const [vet_street, setVetStreet] = useState(null);
    const [vet_city, setVetCity] = useState('');

    const {petId} = route.params;

    const onSelectedVet = data => {
        var count = 0;
        for (const [key, value] of Object.entries(data)) {
            for (const [key2, value2] of Object.entries(value)) {
                if (count==0) { setVetId(value2); }
                else if (count==1) { setVetName(value2); }
                else if (count==2) { setVetStreet(value2); }
                else if (count==3) { setVetCity(value2); }
                count = count+1;
            }
        }
    };

    const _pickDocument = async () => {
        const file = await DocumentPicker.getDocumentAsync({
            // type: "*/*",
            // copyToCacheDirectory: true,
        });

        if (file.type==='cancel') {
            setFileName("Upload Medical Record");
        }
        else {
            const fetched_file = await fetch(file.uri);
            const blob_file = await fetched_file.blob();
            setFileName(file.name);
            setBlobFile(blob_file);
        };
	}

    const addDocumentPressed = async () => {
        const storageRef = ref(storage, `/medical-records/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, blobFile);

        uploadTask.on(
            "state_changed",
            () => {
                setLoading(true);
            },
            (err) => console.log("ERROR: while uploading file -> " + err),
            async () => {
                setLoading(false);

                // download url
                await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    addToHistory(url);
                });
            }
        );
    }

    const addToHistory = async (url) => {
        const today = new Date();
        try {
            const history = {
                pet:petId,
                record:url,
                reason:reason,
                date:Timestamp.fromDate(today),
                clinic:vet_name
            };
            const insertedHistory = await addDoc(collection(db, "history"), history);
            navigation.pop();
        }
        catch (err) {
            console.log(`${err.message}`);
        }
    }
    
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Text style={{marginBottom:5, marginLeft:22, marginTop: 20}}>Observaciones *</Text>
            <TextInput 
                style={styles.txtInput}
                placeholder=""
                keyboardType=""
                autoCapitalize="none"
                multiline={true}
                numberOfLines={10} 
                onChangeText={setReason}
                value={reason} 
            />

            <View style={{flexDirection:'row', alignItems:'center', alignSelf:'stretch', marginLeft:22, marginTop:22, marginRight:22}}>
                <Pressable onPress={_pickDocument}>
                    <Text style={styles.choosePressable}>CHOOSE FILE</Text>
                </Pressable>
                <Text style={{fontSize:13, color:'dimgray', flexShrink:1}}>{fileName}</Text>
            </View>

            <Text style={{fontSize:15, margin:22, fontWeight: 'bold'}}>¿Dónde fue realizado? *</Text>
            { vet_id==null && (
                <View style={{alignItems:'baseline', marginLeft:22, marginRight:22}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', alignItems:'center'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <FontAwesome5 name="clinic-medical" size={24} color="black" />
                            <Text style={{marginRight:20, marginLeft: 20}}>Ninguna clinica seleccionada</Text>
                        </View>
                        <Pressable onPress={ () => {
                            navigation.navigate("VetsScreen", {onSelect: onSelectedVet});
                        }}>
                            <AntDesign name="plus" size={20} color="black" style={{alignSelf:'flex-end'}}/>
                        </Pressable>
                    </View>
                </View>
            )}

            { !(vet_id==null) && (
                <View style={{alignItems:'baseline', marginLeft:22, marginRight:22}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginRight: 10, alignSelf:'stretch', alignItems:'center'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <View style={styles.smallImgView}>
                                <Image source={require('../assets/physical-examination-1.png')} style={styles.img}/>
                            </View>

                            { !(vet_street==null) && (
                                <View style={{marginRight:20, marginLeft: 20}}>
                                    <Text style={{fontWeight: 'bold'}}>{vet_name}</Text>
                                    <Text>{vet_street}</Text>
                                    <Text>{vet_city}</Text>
                                </View>
                            )}

                            { vet_street==null && (
                                <View style={{marginRight:20, marginLeft: 20}}>
                                    <Text style={{fontWeight: 'bold'}}>{vet_name}</Text>
                                </View>
                            )}
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'center', alignItems:'center'}}>
                            <FontAwesome name="trash" size={24} color="black" style={{marginRight:20}}/>
                            <Pressable onPress={ () => {
                                navigation.navigate("VetsScreen", {onSelect: onSelectedVet});
                            }}>
                                <MaterialIcons name="edit" size={24} color="black" style={{}}/>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
            
            {/*<Pressable onPress={ () => {
                Alert.alert('ADD MEDICAL RECORD', 'Please confirm adding medical record.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => addDocumentPressed()}
                ]);
            }}>
                <Text style={styles.deletePressable}>UPLOAD MEDICAL RECORD2</Text>
            </Pressable>
            */}


            <Pressable onPress={ () => {addDocumentPressed()}}>
                <Text style={styles.deletePressable}>CARGAR</Text>
            </Pressable>

        
            { isLoading && (
                <View style={{marginLeft:22, marginRight:22, alignSelf:'center', alignItems:'center', marginTop:22, fontWeight:'bold'}}>
                    <ActivityIndicator animating={true} size="small" color="#335C67"/>
                    <Text style={{color:'dimgray'}}>Uploading in progress</Text>
                </View>
            )}
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    deletePressable: {
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
    choosePressable: {
        textAlign: 'center',
        backgroundColor: '#fff',
        color: '#335C67',
        marginRight: 10,
        fontSize: 13,
        padding: 10,
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor:'#335C67',
    },
    cancelPressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        color: '#335C67',
        borderColor: '#335C67',
        borderStyle: 'solid',
        borderWidth: 1,
        marginLeft: 22,
        marginRight: 22,
        marginTop: 15,
        marginBottom: 0,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    mainView: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    errorStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        marginTop: 22
    },
    txtInput: {
        alignSelf: 'center',
        height: 50,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        textAlignVertical: 'top'
    },
    smallImgView: {
        width: 60,
        height: 60,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        padding: 8
    },
    img: {
        width:'100%', 
        height:undefined, 
        aspectRatio:1
    },
});

export default UploadNewScreen;