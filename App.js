import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { auth } from './FirebaseApp';
import { onAuthStateChanged } from "firebase/auth";
import { AuthenticationNavigator, MainNavigator } from './NavigationController';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);



  useEffect(() => {
    const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
      if (userFromFirebaseAuth) {
        if (userFromFirebaseAuth.emailVerified) {
          setLoggedInUser(userFromFirebaseAuth);
          console.log('user logged in: ' + userFromFirebaseAuth.email)
          console.log(userFromFirebaseAuth.uid)
        }
      }
      else {
        setLoggedInUser(null);
      }
    })
    return listener
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTintColor: '#335C67',
        headerTitleStyle: { color: '#000000' },
        headerShown: false
      }}>
        {
          (loggedInUser === null)
            ?
            (<Stack.Screen component={AuthenticationNavigator} name="authentication" />)
            :
            (<Stack.Screen component={MainNavigator} name="main" />)
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
