import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from 'react-native';
import { isLoggedIn } from "./Auth";

import Welcome from './Components/Welcome';
import Loggedin from './Components/Loggedin';


LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

export default function App() {
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
      {signedIn ? <Loggedin /> : <Welcome />}
    </NavigationContainer>
  );
}
