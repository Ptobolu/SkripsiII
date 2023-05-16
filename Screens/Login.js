import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, Text, View, SafeAreaView, ScrollView, Image } from 'react-native'
import BackEnd from '../Config/Firebase/BackEnd';
import { simpanDataUser } from '../Auth';



import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  const [isShow, setShow] = useState(true);

  const togglePassword = () =>{
    setShow(!isShow)
   }

  const clearInput = () => {
    setEmail('');
    setPassword('');
    setLoading('');
  };

  const masuk = () => {
    setLoading('Loading data...');
    if (email !== '' && password !== '') {
      const dataUser = {
        email: email,
        password: password
      }
      masukanDataUser(dataUser);
    } else {
      setLoading('Email/Password Salah');
    }
  }

  const masukanDataUser = (dataUser) => {
    BackEnd.database().ref('data_user/').once('value', function (data) {
      let sudaMasuk = false;
      data.forEach(user => {
        if (dataUser.email === user.val().email && dataUser.password === user.val().password) {
          const dataBaru = {
            key: user.key,
            nama: user.val().nama,
            email: user.val().email,
            nomor: user.val().nomor,
            ktp: user.val().ktp,
            alamat: user.val().alamat,
            level: user.val().level,
          }
          sudaMasuk = true;
          simpanDataUser(dataBaru);
          navigation.navigate('Home', dataBaru);
        } else {
          setLoading('Silahkan Daftar Dulu.');
        }
        if (sudaMasuk) {
          clearInput();
        }
      });
    });
  }

  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../assets/Image/1.jpg')}
          style={{ resizeMode: "center", height: 250, width: 550 }}/>
      </View>
      <Text style={{fontSize: 35, fontWeight: 'bold', top: 10, color: 'limegreen', textDecorationLine:'underline'}}>KAMI SIAP MELAYANI</Text>
      <View style={styles.inputContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red', justifyContent: 'center', alignItems: 'center', top: 45}}>{loading}</Text>
        <Text style={{fontWeight: '700', top: 55, fontSize: 17, color: 'dimgrey'}}>Alamat Email</Text>
        <TextInput
          placeholder="jhon@mail.com"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          placeholderTextColor={'darkgrey'}
        />
        <View style={{left: 10, top: 40, fontSize: 15, fontWeight: 'bold', color: 'limegreen'}}>
        <FontAwesome5 name="user-lock" size={24} color="limegreen" />
        </View>
       <Text style={{fontWeight: '700', top: 55, fontSize: 17, color: 'dimgrey'}}>Kata Sandi</Text>
        <TextInput
          placeholder="*************"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry={isShow}
          placeholderTextColor={'darkgrey'}
        />
        <Text style={{left: 210, top: 43, fontSize: 15, fontWeight: 'bold', color: 'limegreen'}}>Lihat</Text>
          <TouchableOpacity style={{left: 250, top: 20}} onPress={togglePassword}>
          {isShow ? (
            <Entypo name="eye" size={24} color="limegreen" />
          ) : (
            <Entypo name="eye-with-line" size={24} color="black" />
          )}
        </TouchableOpacity> 
      </View>
      <View style={{left: -123, top: -10, fontSize: 15, fontWeight: 'bold', color: 'limegreen'}}>
      <MaterialCommunityIcons name="form-textbox-password" size={28} color="limegreen" />
        </View>        
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => masuk()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={[styles.buttonI, styles.buttonOutlineI]}
        >
          <Text style={styles.buttonOutlineI}>Belum Punya Akun?</Text>
          <Text style={styles.akun}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: -23,
    top: 80,
    borderRadius: 10,
    borderColor: 'limegreen',
    borderWidth: 3,
    fontSize: 16,
    color: 'limegreen',
    fontWeight: '700',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#29CC39',
    width: '140%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonI: {
    width: '140%',
    padding: 15,
    alignItems: 'center',
  },
  buttonOutline: {
  top: -12,
  },
  buttonOutlineI: {
    marginTop: 5,
    fontSize: 20,
    right: 14,
  },
  akun:{
    top: -28,
    left: 110,
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'limegreen',
    fontWeight: '700'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
  },
  buttonOutlineText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 15
  }
})

// import React, { useState } from 'react'
// import { StyleSheet, TextInput, TouchableOpacity, Text, View, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native'
// import BackEnd from '../Config/Firebase/BackEnd';
// import { simpanDataUser } from '../Auth';

// // import { Entypo } from '@expo/vector-icons';


// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState('');

//   // const [isSecureEntry, setSecureEntry] = useState(true);

  // const togglePassword = () =>{
  //  setSecureEntry(!isSecureEntry)
  // }

//   const clearInput = () => {
//     setEmail('');
//     setPassword('');
//     setLoading('');
//   };

//   const masuk = () => {
//     setLoading('Loading data...');
//     if (email !== '' && password !== '') {
//       const dataUser = {
//         email: email,
//         password: password
//       }
//       masukanDataUser(dataUser);
//     } else {
//       setLoading('Email/Password Salah');
//     }
//   }

//   const masukanDataUser = (dataUser) => {
//     BackEnd.database().ref('data_user/').once('value', function (data) {
//       let sudaMasuk = false;
//       data.forEach(user => {
//         if (dataUser.email === user.val().email && dataUser.password === user.val().password) {
//           const dataBaru = {
//             key: user.key,
//             nama: user.val().nama,
//             email: user.val().email,
//             nomor: user.val().nomor,
//             ktp: user.val().ktp,
//             alamat: user.val().alamat,
//             level: user.val().level,
//           }
//           sudaMasuk = true;
//           simpanDataUser(dataBaru);
//           navigation.navigate('Home', dataBaru);
//         } else {
//           setLoading('Silahkan Daftar Dulu.');
//         }
//         if (sudaMasuk) {
//           clearInput();
//         }
//       });
//     });
//   }

//   return (
//     <ScrollView style={styles.container}>
//     <SafeAreaView >
//       <View style={styles.logo}>
//         <Image source={require('../assets/Image/1.jpg')}
//           style={{ resizeMode: "center", height: 280, width: 520 }}/>
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={{fontSize: 20, fontWeight: 'bold', color: 'limegreen', justifyContent: 'center', alignItems: 'center'}}>{loading}</Text>
//         <Text style={{fontWeight: '700', top:5, fontSize: 17, color: 'dimgrey'}}>Alamat Email</Text>
//         <TextInput
//           label={("jhon@mail.com")}
//           value={email}
//           onChangeText={text => setEmail(text)}
//           style={styles.input}
//           placeholderTextColor={("limegreen")}
//         />
//        <Text style={{fontWeight: '700', top:5, fontSize: 17, color: 'dimgrey'}}>Kata Sandi</Text>
//        {/* <Image source={require("../assets/Image/Password.png")} style={{width: 35, height: 35, top: -10}}></Image> */}
        
//         <TextInput
//           placeholder="Kata Sandi"
//           value={password}
//           onChangeText={text => setPassword(text)}
//           style={styles.input}
//           secureTextEntry
//           // secureTextEntry={isSecureEntry}
//         />
        //  <TouchableOpacity onPress={togglePassword}>
        //   {isSecureEntry ? (
        //     <Entypo name="eye" size={24} color="black" />
        //   ) : (
        //     <Entypo name="eye-with-line" size={24} color="black" />
        //   )}
        // </TouchableOpacity> 
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={() => masuk()}
//           style={styles.button}
//         >
//           <Text style={styles.buttonText}>Masuk</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Signup')}
//           style={[styles.buttonI, styles.buttonOutlineI]}
//         >
//           <Text style={styles.buttonOutlineI}>Belum Punya Akun?</Text>
//           <Text style={styles.akun}>Daftar</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//     </ScrollView>
//   )
// }

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     height: "100%",
//     width: "100%",
//   },
//   inputContainer: {
//     width: '90%',
//     marginLeft: "5%",
//   },
//   input: {
//     backgroundColor: 'white',
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     marginTop: 10,
//     borderRadius: 10,
//     borderColor: 'limegreen',
//     borderWidth: 3,
//     fontSize: 16,
//     color: 'limegreen',
//     fontWeight: '700',
//   },
//   buttonContainer: {
//     width: '64%',
//     paddingTop: 30,
//     marginLeft: "5%"
//   },
//   button: {
//     backgroundColor: '#29CC39',
//     width: '140%',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     fontSize: 20,
//     fontWeight: 'bold'
//   },
//   buttonI: {
//     width: '140%',
//     padding: 15,
//     alignItems: 'center',
//   },
//   buttonOutline: {
//   top: -12,
//   },
//   buttonOutlineI: {
//     marginTop: 1,
//     fontSize: 20,
//     right: 14,
//   },
//   akun:{
//     top: -28,
//     left: 110,
//     fontSize: 20,
//     textDecorationLine: 'underline',
//     color: 'limegreen',
//     fontWeight: '700'
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 17,
//   },
//   buttonOutlineText: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 17,
//   },
//   logo: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingBottom: 20
//   }
// })

