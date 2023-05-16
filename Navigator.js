import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import { isLoggedIn } from "./Auth";
import Welcome from './Components/Welcome';
import Loggedin from './Components/Loggedin';

const Stack = createStackNavigator();

function Navigator () {
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
      const loadData = async() => {
        const status = await isLoggedIn();
        setSignedIn(status);
      }
      loadData();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={signedIn ? "Loggedin" : "Welcome"}
                screenOptions={{
                animationEnabled: false
                }}
                headerMode='none'
                >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Loggedin" component={Loggedin} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Navigator;