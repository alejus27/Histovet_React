import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import CheckBox from "expo-checkbox";
import { useState, useEffect } from 'react';
import { db } from '../FirebaseApp';
import { updateDoc, doc } from "firebase/firestore";

const EditPetScreen_2 = ({navigation, route}) => {
    const [pet_specie, onSpecieChanged] = useState('');
    const [pet_breed, onBreedChanged] = useState('');
    const [coat_color, onColorChanged] = useState('');
    const [mark, onMarkChanged] = useState('');
    const [isSpayed, setSpayed] = useState(false);
    const [isIntact, setIntact] = useState(false);

    const {pet, pet_id} = route.params;

    useEffect(()=>{
        onSpecieChanged(pet.specie);
        onBreedChanged(pet.breed);
        onColorChanged(pet.coat_color);
        onMarkChanged(pet.mark);
        if (pet.neutering=='Intact') {
            setIntact(true);
            setSpayed(false);
        }
        else if (pet.neutering=='Neutered') {
            setIntact(false);
            setSpayed(true);
        }
        else{
            setIntact(false);
            setSpayed(false);
        }
    }, [])

    const updatePetPressed = async () => {
        const docRef = doc(db, "pets", pet_id);

        var castration = "";
        if (isSpayed) { castration = 'Neutered' }
        else if (isIntact) { castration = 'Intact' };

        const updatedPetData = {
            owner:pet.owner,
            name:pet.name,
            birthday:pet.birthday,
            gender:pet.gender,
            regular_clinic:pet.regular_clinic,
            specie:pet_specie,
            breed:pet_breed,
            coat_color:coat_color,
            mark:mark,
            neutering:castration,
        };
        try {
            updateDoc(docRef, updatedPetData);
            navigation.pop(1);
        }
        catch (err) {
            console.log(`${err.message}`);
        }
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff', justifyContent:'space-between'}}>

            <View>
                <Text style={{marginBottom:5, marginLeft:22, marginTop:22}}>Pet Specie</Text>
                <TextInput 
                    style={styles.input}
                    placeholder=""
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={onSpecieChanged}
                    value={pet_specie}
                />

                <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Pet Breed</Text>
                <TextInput 
                    style={styles.input}
                    placeholder=""
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={onBreedChanged}
                    value={pet_breed}
                />

                <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Pet Coat Color</Text>
                <TextInput  
                    style={styles.input}
                    placeholder=""
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={onColorChanged}
                    value={coat_color}
                />

                <View style={{alignItems:'baseline', margin: 22}}>
                    <Text style={{marginBottom:15, fontSize:16}}>Neutering / Castration</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <CheckBox
                            value={isSpayed}
                            onValueChange={() => {
                                setSpayed(!isSpayed);
                                setIntact(false);
                            }}
                            style={{borderRadius:'100%', borderWidth:1}}
                            color={isSpayed ? '#335C67' : undefined}
                        />
                        <Text style={{marginLeft:5, fontSize:15}}>Spayed or Neutered</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                        <CheckBox
                            value={isIntact}
                            onValueChange={() => {
                                setSpayed(false);
                                setIntact(!isIntact);
                            }}
                            style={{borderRadius:'100%', borderWidth:1}}
                            color={isIntact ? '#335C67' : undefined}
                        />
                        <Text style={{marginLeft:5, fontSize:15}}>Intact</Text>
                    </View>
                </View>

                <Text style={{marginBottom:5, marginLeft:22}}>Pet Distinguish Mark</Text>
                <TextInput 
                    style={styles.txtInput}
                    placeholder=""
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={onMarkChanged}
                    value={mark}
                />

            </View>
            
            <View style={{marginTop:10, marginBottom:22}}>
                <Pressable onPress={() => {
                    Alert.alert('UPDATE PET', 'Are you sure you want to update the pet?', [  
                        {text: 'NO', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                        {text: 'YES', onPress: () => updatePetPressed()}
                    ]);
                }}>
                    <Text style={styles.pressableStyle}>UPDATE PET</Text>
                </Pressable>

                <Pressable onPress={ () => {updatePetPressed()}}>
                <Text style={styles.pressableStyle}>UPDATE PET 2</Text>
                </Pressable>
            </View>
                
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    title: {
        // textAlign: 'center',
        alignSelf: 'center',
        padding: 20,
        margin: 30,
        fontWeight: 'bold',
        fontSize: '35'
    },
    input: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
    },
    txtInput: {
        alignSelf: 'center',
        height: 150,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        textAlignVertical: 'top'
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
});

export default EditPetScreen_2;