import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, Text, View, SafeAreaView, ScrollView } from 'react-native';
import BackEnd from '../Config/Firebase/BackEnd';
import { simpanDataUser } from '../Auth';
import { SelectList } from 'react-native-dropdown-select-list'
import { Ionicons } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';

const Signup = ({ navigation }) => {
  let userLevel = [
      {key:'1', value:'Masyarakat'},
      {key:'2', value:'Petugas'},
  ]
  
  const [nama, setNama] = useState('')
  const [nomor, setNomor] = useState('')
  const [alamat, setAlamat] = useState('')
  const [ktp, setKtp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState('');

  const [isShowPs, setShowPs] = useState(true);

  const togglePassword = () =>{
    setShowPs(!isShowPs)
   }


  useEffect(() => {
    cekKadis();
  }, []);

  const cekKadis = async() => {
    await BackEnd.database().ref('data_user/').once('value', function (data) {
      let adaKadis = false;
      data.forEach(user => {
        if (user.val().level === 'Kadis') {
          adaKadis = true;
        }
      });
      if (!adaKadis) {
        userLevel.push({key: '3', value: 'Kadis'});
      }
    });
  }

  const daftarBaru = () => {
    if (cekSemuaInput()) {
      const dataUser = {
        nama: nama,
        nomor: nomor,
        alamat: alamat,
        ktp: ktp,
        email: email,
        password: password,
        level: level
      }
      cekDataUser(dataUser);
    } else {
      setLoading('Isi Semua Data');
    }
  }

  const cekDataUser = (dataUser) => {
    BackEnd.database().ref('data_user/').once('value', function (data) {
      if (data.val()) {
        let userSudaAda = false;
        data.forEach(user => {
          if (dataUser.email === user.val().email && dataUser.password === user.val().password) {
            userSudaAda = true;
          }
        });

        if (!userSudaAda) {
          masukanDataUser(dataUser);
        } else {
          setLoading('User suda terdaftar.');
        }
      } else {
        masukanDataUser(dataUser);
      }
    });
  }

  const masukanDataUser = (dataUser) => {
    const ref = BackEnd.database().ref('data_user');
    ref.push(dataUser)
    .then((data) => {
      let key = JSON.stringify(data);
      key = key.split('/');
      dataUser.key = key[key.length - 1].replace('"', '');
      simpanDataUser(dataUser);
      navigation.navigate('Login', dataUser);
    })
    .catch((error) =>{
      setLoading(error);
    })
  }

  const cekSemuaInput = () => {
    if (nama !== '' && nomor !== '' && alamat !== '' && ktp !== '' && email !== '' && password !== '' && level !== '') {
      return true;
    } else {
      return false;
    }
  }

  return (
    <ScrollView style={styles.scrollView} behavior="padding">
    <SafeAreaView style={styles.container}>
    <Text style={{fontSize: 22, fontWeight: 'bold', top: 45, color: "limegreen"}}>Silakan Daftar Terlebih Dahulu</Text>
      <Text style={{fontSize: 40, fontWeight: 'bold', top: 40, color: 'limegreen', textDecorationLine:'underline'}}>DAFTAR SEBAGAI:</Text>
      <Text style={{fontSize: 22, fontWeight: 'bold', top: 40, color: "limegreen"}}>MASYARAKAT/PETUGAS/KADIS</Text>
      <Text style={styles.load}>{loading}</Text>
      <View style={{width: '89%', margin: 20, color: 'limegreen'}}>
        <SelectList
          setSelected={(val) => setLevel(val)}
          data={userLevel}
          save="value"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nama Lengkap"
          value={nama}
          onChangeText={text => setNama(text)}
          style={styles.input}
        />
        <View style={{left: 10, top: -40, fontSize: 15, fontWeight: 'bold', color: 'limegreen'}}>
        <AntDesign name="adduser" size={24} color="limegreen" />
        </View>
        <TextInput
          placeholder="Nomor HP (Aktif)"
          value={nomor}
          onChangeText={text => setNomor(text)}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={14}
        />
        <View style={{left: 10, top: -40, fontSize: 15, fontWeight: 'bold', color: 'limegreen'}}>
        <Foundation name="telephone" size={24} color="limegreen" />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Alamat"
          value={alamat}
          onChangeText={text => setAlamat(text)}
          style={styles.input}
        />
        <View style={{left: 10, top: -37, fontSize: 15, fontWeight: 'bold', color: 'limegreen'}}>
        <MaterialIcons name="home-work" size={20} color="limegreen" />
        </View>
        <TextInput
          placeholder="Nomor KTP"
          value={ktp}
          onChangeText={text => setKtp(text)}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={16}
        />
        <View style={{left: 10, top: -37, fontSize: 15, fontWeight: 'bold', color: 'limegreen'}}>
        <FontAwesome name="id-card" size={20} color="limegreen" />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <View style={{left: 10, top: -40, fontSize: 15, fontWeight: 'bold', color: 'limegreen'}}>
        <MaterialCommunityIcons name="email-plus" size={24} color="limegreen" />
        </View>
        <TextInput
          placeholder="Kata Sandi"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry={isShowPs}
        />
        <Text style={{left: 210, top: -35, fontSize: 15, fontWeight: 'bold', color: 'limegreen'}}>Lihat</Text>
          <TouchableOpacity style={{left: 250, top: -58}} onPress={togglePassword}>
          {isShowPs ? (
            <Entypo name="eye" size={24} color="limegreen" />
          ) : (
            <Entypo name="eye-with-line" size={24} color="black" />
          )}
        </TouchableOpacity> 
      </View>
      <View style={{left: -123, top: -89, fontSize: 15, fontWeight: 'bold', color: 'limegreen'}}>
      <MaterialCommunityIcons name="form-textbox-password" size={28} color="limegreen" />
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => daftarBaru()}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Daftar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[styles.buttonI, { marginTop: 10 }]}
        >
           <Ionicons name="arrow-back-sharp" size={24} color="limegreen" />
          <Text style={styles.buttonTextI}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </ScrollView>
)
}
export default Signup;

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
logo: {
  justifyContent: 'flex-start',
},
inputContainer: {
  width: '80%',
  marginTop: 10
},
input: {
  backgroundColor: 'white',
    paddingHorizontal: 39,
    paddingVertical: 10,
    marginTop: -10,
    borderRadius: 10,
    borderColor: 'limegreen',
    borderWidth: 3,
    fontSize: 16,
    color: 'dimgrey',
    fontWeight: '700',
},
buttonTextI:{
  top: -29,
  textDecorationLine: 'underline',
  fontSize: 20,
  left: 30,
  fontWeight: '700',
  color: 'limegreen'
},
buttonI:{
  top: 15,
  textDecorationLine: 'underline',
  fontSize: 15,
  fontWeight: 'bold',
  left: -25
},
buttonContainer: {
  width: '60%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
},
button: {
  backgroundColor: '#29CC39',
  width: '140%',
  padding: 15,
  borderRadius: 25,
  alignItems: 'center',
  borderRadius: 10
},
buttonOutline: {
  marginTop: -50,
  fontSize: 20,
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 17,
},
buttonOutlineText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 17,
},
load: {
  fontSize: 16,
  justifyContent: 'center',
  alignItems: 'center',
  margin: -20,
  padding: 20,
  fontSize: 20,
  fontWeight: 'bold',
  color: 'darkred'
},
daf: {
  fontWeight: 'bold',
  fontSize: 20,
  margin: 10,
  justifyContent: 'center',
  alignItems: 'center',
  top: 20
},
levelf:{
  fontSize: 20,
  fontWeight: 'bold'
}
})