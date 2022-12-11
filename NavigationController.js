import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Registration_v3 from './screens/Registration-v3';
import SetPasswordScreen from './screens/SetPasswordScreen';
import ResetPasswordScreen_v2 from './screens/ResetPasswordScreen-v2';
import ProfileInfo from './screens/ProfileInfo';
import AddressInfo from './screens/AddressInfo';
import PetsScreen from './screens/PetsScreen';
import SettingScreen from './screens/SettingScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import EditAddressScreen from './screens/EditAddressScreen';
import EditClinicalHistory from './screens/EditClinicalHistory';
import EditHospitalization from './screens/EditHospitalization';
import MedicineScreen from './screens/MedicineScreen';
import AddMedicine from './screens/AddMedicine';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import CheckMailScreen from './screens/CheckMailScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';
import DeleteAccountScreen from './screens/DeleteAccountScreen';
import CreateClinicalHistory from './screens/CreateClinicalHistory';
import CreatePetProfile from './screens/CreatePetProfile';
import CreateHospitalization from './screens/CreateHospitalization';
import CreatePetProfile2Screen from './screens/CreatePetProfile2Screen';
import AddTime from './screens/AddTime';
import VetsScreen from './screens/VetsScreen';
import VetsScreen2 from './screens/VetsScreen2';
import AddVetClinicsScreen from './screens/AddVetClinicsScreen';
import AddVetClinicsScreen2 from './screens/AddVetClinicsScreen2';
import PetProfileScreen from './screens/PetProfileScreen';
import PetSettingScreen from './screens/PetSettingScreen';
import UploadNewScreen from './screens/UploadNewScreen';
import ShareMedicalRecordScreen from './screens/ShareMedicalRecordScreen';
import EditPetScreen_1 from './screens/EditPetScreen-1';
import EditPetScreen_2 from './screens/EditPetScreen-2';
import ManageCaregiverScreen from './screens/ManageCareGiverScreen';
import TransferOwnershipScreen from './screens/TransferOwnershipScreen';
import DeletePetScreen from './screens/DeletePetScreen';
import PetHistoryScreen from './screens/PetHistoryScreen';
import AddPetHistoryScreen from './screens/AddPetHistoryScreen';
import AddCaregiverScreen from './screens/AddCaregiverScreen';
import DeleteCaregiverScreen from './screens/DeleteCaregiverScreen';
import { Pressable, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ShowHistoryScreen from './screens/ShowHistoryScreen';
import Medicine2Screen from './screens/Medicine2Screen';
import AppointmentScreen from './screens/AppointmentScreen';
import ShowHistoryScreen2 from './screens/ShowHistoryScreen2';
import ShowHospitalizationScreen from './screens/ShowHospitalizationScreen';
import DeleteMedicalRecordsScreen from './screens/DeleteMedicalRecordsScreen';
import { auth } from './FirebaseApp';
import { signOut } from "firebase/auth";


const Stack = createNativeStackNavigator();

const AuthenticationNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            //headerTintColor: '#335C67',
            headerTitleStyle: { color: '#ffffff' },
            headerStyle: {
                backgroundColor: '#2196FF',
            },
        }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={Registration_v3} />
            <Stack.Screen name="SetPassword" component={SetPasswordScreen} options={{ title: 'Registro' }} />
            <Stack.Screen name="Profile" component={ProfileInfo} />
            <Stack.Screen name="Address" component={AddressInfo} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen_v2} options={{ title: 'Restablecer contraseña' }} />
            <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ header: () => null }} />

            <Stack.Screen name="VetsScreen" component={VetsScreen} options={{ title: 'Centro veterinario' }} />
            <Stack.Screen name="AddVetClinicsScreen" component={AddVetClinicsScreen} options={{ title: 'Registrar centro veterinario' }} />
        </Stack.Navigator>
    )
}

export { AuthenticationNavigator };

const MainNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            //headerTintColor: '#335C67',
            headerTitleStyle: { color: '#ffffff' },
            headerStyle: {
                backgroundColor: '#2196FF',

            },

        }}>
            <Stack.Screen name="PetsScreen" component={PetsScreen} options={{ title: 'Menú' }} />
            <Stack.Screen name="PetProfileScreen" component={PetProfileScreen} />
            <Stack.Screen name="PetSettingScreen" component={PetSettingScreen} options={{ title: 'Pet Settings' }} />
            <Stack.Screen name="Settings" component={SettingScreen} options={{

                headerRight: () => (
                    <Pressable onPress={() => {
                        try {
                            signOut(auth);
                            navigation.reset({ index: 0, routes: [{ name: 'AuthenticationNavigator' }], key: null });
                        } catch (err) {
                            console.log(`Logout failed: ${err.message}`);
                        }

                        {/*}
                        Alert.alert('LOGOUT', 'Are you sure you want to logout?', [  
                            {text: 'NO', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                            {text: 'YES', onPress: async () => {
                                try {
                                    await signOut(auth);
                                    navigation.reset({index:0, routes:[{name: 'AuthenticationNavigator'}], key:null});      
                                } catch (err) {
                                    console.log(`Logout failed: ${err.message}`);
                                }
                            }},

                        ]);*/}
                    }}>
                        <MaterialIcons name="logout" size={24} />
                    </Pressable>
                )
            }} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Información de cuenta' }} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Cambiar contraseña' }} />
            <Stack.Screen name="CheckMailScreen" component={CheckMailScreen} />
            <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPasswordScreen} />
            <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} options={{ title: 'Borrar cuenta' }} />
            <Stack.Screen name="EditAddressScreen" component={EditAddressScreen} options={{ title: 'Información de dirección' }} />
            <Stack.Screen name="CreateHospitalization" component={CreateHospitalization} options={{ title: 'Hospitalización' }} />
            <Stack.Screen name="CreateClinicalHistory" component={CreateClinicalHistory} options={{ title: 'Historia clinica' }} />
            <Stack.Screen name="CreatePetProfile" component={CreatePetProfile} options={{ title: 'Registrar mascota' }} />
            <Stack.Screen name="CreatePetProfile2Screen" component={CreatePetProfile2Screen} options={{ title: 'Registrar mascota' }} />
            <Stack.Screen name="VetsScreen" component={VetsScreen} options={{ title: 'Centro veterinario' }} />
            <Stack.Screen name="VetsScreen2" component={VetsScreen2} options={{ title: 'Centro veterinario' }} />
            <Stack.Screen name="Vaccinations" component={PetHistoryScreenNavigator} />
            <Stack.Screen name="ManageCaregiverScreen" component={ManageCaregiverScreen} options={{ title: 'Manage Caregiver' }} />
            <Stack.Screen name="AddVetClinicsScreen" component={AddVetClinicsScreen} options={{ title: 'Registrar centro veterinario' }} />
            <Stack.Screen name="AddVetClinicsScreen2" component={AddVetClinicsScreen2} options={{ title: 'Registrar centro veterinario' }} />
            <Stack.Screen name="AddCaregiverScreen" component={AddCaregiverScreen} options={{ title: 'Add Caregiver' }} />
            <Stack.Screen name="AddTime" component={AddTime} options={{ title: 'Horario' }} />
            <Stack.Screen name="UploadNewScreen" component={UploadNewScreen} options={{ title: 'Importar registro médico' }} />
            <Stack.Screen name="ShareMedicalRecordScreen" component={ShareMedicalRecordScreen} options={{ title: 'Share Medical Record' }} />
            <Stack.Screen name="EditPetScreen-1" component={EditPetScreen_1} options={{ title: 'Editar mascota' }} />
            <Stack.Screen name="EditPetScreen-2" component={EditPetScreen_2} options={{ title: 'Editar mascota' }} />
            <Stack.Screen name="EditClinicalHistory" component={EditClinicalHistory} options={{ title: 'Gestión historia clinica' }} />
            <Stack.Screen name="EditHospitalization" component={EditHospitalization} options={{ title: 'Gestión hospitalización' }} />
            <Stack.Screen name="DeletePetScreen" component={DeletePetScreen} options={{ title: 'Borrar mascota' }} />
            <Stack.Screen name="AddMedicine" component={AddMedicine} options={{ title: 'Medicamentos' }} />
            <Stack.Screen name="MedicineScreen" component={MedicineScreen} options={{ title: 'Inventario' }} />
            <Stack.Screen name="Medicine2Screen" component={Medicine2Screen} options={{ title: 'Medicamentos' }} />
            <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} options={{ title: 'Citas Médicas' }} />
            <Stack.Screen name="ShowHospitalizationScreen" component={ShowHospitalizationScreen} options={{ title: 'Hospitalización' }} />
            <Stack.Screen name="ShowHistoryScreen" component={ShowHistoryScreen} options={{ title: 'Historia clinica' }} />
            <Stack.Screen name="ShowHistoryScreen2" component={ShowHistoryScreen2} options={{ title: 'Borrar historia clinica' }} />
            <Stack.Screen name="DeleteMedicalRecordsScreen" component={DeleteMedicalRecordsScreen} options={{ title: 'Delete Medical Record' }} />
            <Stack.Screen name="TransferPetOwnership" component={TransferOwnershipScreen} options={{ title: 'Transfer Ownership' }} />
            <Stack.Screen name="DeleteCaregiver" component={DeleteCaregiverScreen} options={{ title: 'Remove Caregiver' }} />
            <Stack.Screen name="AuthenticationNavigator" component={AuthenticationNavigator} options={{ header: () => null }} />
        </Stack.Navigator>
    )
}

export { MainNavigator };

const PetHistoryScreenNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PetHistoryScreen"
                component={PetHistoryScreen}
                options={{
                    title: 'Vaccinations',
                    headerShown: false
                }} />
            {/* <Stack.Screen name="PetProfileScreen" component={PetProfileScreen}/>
            <Stack.Screen name="SettingScreen" component={SettingScreen}/>
            <Stack.Screen name="AddPetScreen" component={AddPetScreen}/>
            <Stack.Screen name="AddVetScreen" component={AddVetScreen}/>
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Edit Profile' }}/>
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Change password' }}/>
            <Stack.Screen name="NotificationsSettingScreen" component={NotificationsSettingScreen} options={{ title: 'Notifications' }}/>
            <Stack.Screen name="CheckMailScreen" component={CheckMailScreen}/>
            <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPasswordScreen}/>
            <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen}/>
            <Stack.Screen name="EditAddressScreen" component={EditAddressScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="CreatePetProfile" component={CreatePetProfile}/>
            <Stack.Screen name="CreatePetProfile2Screen" component={CreatePetProfile2Screen}/>
            <Stack.Screen name="VetsTabScreen" component={VetsTabScreen}/> */}
            <Stack.Screen name="AddPetHistoryScreen" component={AddPetHistoryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export { PetHistoryScreenNavigator }
