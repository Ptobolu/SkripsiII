import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import Home from '../Screens/App/Home';
import BuatLaporan from '../Screens/App/BuatLaporan';
import Notifikasi from '../Screens/Menu/Notifikasi'
import Tracking from "../Screens/Menu/Tracking";
import Feedback from "../Screens/Menu/Feedback";
import About from "../Screens/Menu/About";
import DetailNotif from "../DataNotif/DetailNotif";
import History from "../Screens/Menu/History";

const Stack = createStackNavigator();

function Welcome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="Signup" component={Signup} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="Home" component={Home} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="BuatLaporan" component={BuatLaporan} options={{
      title: 'Buat Pelaporan',
      headerStyle: {
        backgroundColor: '#29CC39',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}/>
      <Stack.Screen name="Notifikasi" component={Notifikasi} options={{
        title: 'Daftar Pelaporan',
        headerStyle: {
          backgroundColor: '#29CC39',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} 
      />
      <Stack.Screen name="DetailNotif" component={DetailNotif} options={{
        title: 'Detail Laporan',
        headerStyle: {
          backgroundColor: '#29CC39',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      
      <Stack.Screen name="Tracking" component={Tracking} options={{
        title: 'Status Laporan',
        headerStyle: {
          backgroundColor: '#29CC39',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />

      <Stack.Screen name="History" component={History} options={{
        title: 'Riwayat Laporan',
        headerStyle: {
          backgroundColor: '#29CC39',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />

      <Stack.Screen name="Feedback" component={Feedback} options={{
        title: 'Menu Feedback',
        headerStyle: {
          backgroundColor: '#29CC39',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <Stack.Screen name="About" component={About} options={{title: 'About'}} />
    </Stack.Navigator>
  );
}

export default Welcome;