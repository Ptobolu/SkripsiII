import React, {useEffect, useState } from 'react'
import { Text, StyleSheet, View, Button, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import BackEnd from '../Config/Firebase/BackEnd';
import * as ImagePickerExpo from 'expo-image-picker'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


import moment from 'moment';
import localization from 'moment/locale/id';

moment.updateLocale('id', localization)

let tanggal = moment().locale('id')

const DetailNotif = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [proses, setProses] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [selectedImage, setSelectedImage] = useState({});
  const [laporan, setLaporan] = useState(route.params);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await BackEnd.database().ref(`data_user/${laporan.userid}`).once('value', (data) => {
      console.log(data.val());
      setUser(data.val());
    });

    await BackEnd.database().ref(`data_laporan/${laporan.key}`).once('value', (data) => {
      const newdata = data.val();
      newdata.key = data.key;
      setLaporan(newdata);
    });
    setLoading(false);
  }

  const confirmasi = (data, newstatus = null) => {
    let status = '';
    newstatus = (newstatus === '') ? data.status : newstatus;
    if (newstatus === '') {
      status = 'Terima';
    } else if (newstatus === 'Terima') {
      status = 'Dalam Perjalanan';
    } else if (newstatus === 'Dalam Perjalanan') {
      status = 'Sudah Diangkut';
    }
    console.log(status);

    if (status !== '') {
      if (status === 'Suda Diangkut' && selectedImage.base64 === undefined) {
        alert('Anda harus memasukan foto bukti pengangkutan sampah');
      } else {
        if (status === 'Sudah Diangkut') {
          var adaNameRef = BackEnd.database().ref(`data_laporan/${data.key}/`);
          adaNameRef.update({ status: status, fotopetugas: selectedImage.base64 })
            .then(async (data) => {
              bersihkanInput();
              navigation.navigate('Notifikasi', { status: status });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          var adaNameRef = BackEnd.database().ref(`data_laporan/${data.key}/`);
          adaNameRef.update({ status: status })
            .then(async (data) => {
              setNewStatus(status);
              const ns = await setStatus(status);
              setProses(ns);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  }

  const bersihkanInput = () => {
    setSelectedImage(null);
  }

  const cekSemuaInput = () => {
    if (selectedImage.base64 !== null) {
      return true;
    }
    return false;
  }

  const setStatus = (status) => {
    if (status === '') {
      return 'Terima';
    } else if (status === 'Terima') {
      return 'Dalam Perjalanan';
    } else if (status === 'Dalam Perjalanan') {
      return 'Kirim';
    }
  }

  const openCameraWithPermission = async () => {
    let permissionResult = await ImagePickerExpo.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Camera Permission");
      return;
    }

    let cameraResult = await ImagePickerExpo.launchImageLibraryAsync({
      base64: true,
    });

    if (cameraResult.canceled === true) {
      return;
    }

    // setImageBase64(cameraResult);
    setSelectedImage(cameraResult);
  };

  if (loading) {
    return (
      <Text style={{ fontSize: 25, color: '#3ade3b', fontWeight: 'bold', top: 200, margin: 20, width: 350, height: 300, marginLeft: 80 }}>Tunggu sebentar...</Text>
    )
  }

  const statusupdate = (newStatus === '') ? laporan.status : newStatus;
  console.log(statusupdate);
  return (
    <ScrollView>
        <Text style={styles.isi}>DATA PROFIL PELAPOR</Text>
        <View style={styles.garis} />
            <View style={styles.buatI}>
        <Text style={styles.text}>Nama:</Text>
          <Text style={styles.line}>{user.nama}</Text>
          <Text style={styles.text}>No KTP:</Text>
          <Text style={styles.line}>{user.ktp}</Text>
          <Text style={styles.text}>Alamat:</Text>
          <Text style={styles.line}>{user.alamat}</Text>
          <Text style={styles.text}>No.Tlpn:</Text>
          <Text style={styles.line}>{user.nomor}</Text>
          </View>
        <Text style={styles.isiII}>DATA LAPORAN YANG MASUK</Text>
        <View style={styles.garisII} />
        <View style={styles.buat}>
          <Text style={styles.text}>Keterangan:</Text>
          <Text style={styles.ket}>{laporan.keterangan}</Text>
          <Text style={styles.text}>Alamat:</Text>
          <Text style={styles.ket} >{laporan.alamat}</Text>
          <Text style={styles.text}>Status:</Text>
          <Text style={{fontSize: 12,left: -3, fontWeight: 'bold', top: 27, color: 'black', backgroundColor: 'gainsboro', width: 185, borderRadius: 10}}>{tanggal.format('LLLL')}</Text>
          <Text style={{fontSize: 18, color: 'white', top: -20, left: -3, fontWeight: 'bold'}}>({statusupdate === '' ? 'Belum di Terima' : statusupdate})</Text>
        </View>
        <Image
          source={{
            uri: laporan.foto
              ? `data:image/jpg;base64,${laporan.foto}`
              : null,
          }}
          style={styles.detail}/>
        <View style={styles.gariso} />
         <Text style={styles.isiIII}>SETELAH DI TERIMA LAPORAN AKAN ADA BUTTON FOTO KEMBALI SAMPAH</Text>
         <View style={styles.garison} />
        <SafeAreaView>
          {
            statusupdate === 'Dalam Perjalanan'
              ?
              <View style={styles.camera}>
                <TouchableOpacity
                  onPress={openCameraWithPermission} >
                  <Text style={styles.buttonText}>KAMERA</Text>
                </TouchableOpacity>
                {(selectedImage !== null)
                  &&
                  <Image
                    source={{
                      uri: selectedImage.uri
                    }}
                    style={styles.thumbnail}
                  />}
              </View>
              : null
          }

          {
            statusupdate === 'Sudah dibersihkan' ? null
              :
              <TouchableOpacity style={styles.klik} onPress={() => confirmasi(laporan, newStatus)}>
                <Text style={styles.terima}>{proses === '' ? setStatus(laporan.status) : proses}</Text>
              </TouchableOpacity>
          }
        </SafeAreaView>
    </ScrollView>
  );
}

export default DetailNotif;

const styles = StyleSheet.create({
  dateil: {
    flexDirection: 'column'
  },
  camera: {
    top: 20,
    borderWidth: 3,
    borderColor: '#50C878',
    backgroundColor: '#eee',
    width: '93%',
    height: 170,
    left: 10
  },
  thumbnail: {
    width: '100%',
    height: '84%',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center'
  },
  klik: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#50C878',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 60,
    width: 350,
    left: -55,
    top: -30
  },
  terima: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent: 'center',
    color: 'white',
  },
  buat: {
    flex: 1,
    margin: 4,
    padding: 10,
    height: 190,
    backgroundColor: "#50C878",
    borderEndWidth: 4,
    borderRadius: 10,
    borderColor: 'lightseagreen',
    top: 10
  },
  buatI:{
    flex: 1,
    margin: 4,
    padding: 10,
    height: 130,
    backgroundColor: "#50C878",
    borderEndWidth: 4,
    borderRadius: 10,
    borderColor: 'lightseagreen',
    top: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  line: {
    fontSize: 18,
    color: 'white',
    marginTop:  -25,
    marginLeft: 90
  },
  ket:{
    fontSize: 18,
    color: 'white',
  },
  detail: {
    // marginTop: 20,
    // marginLeft: 1,
    // width: 355,
    // height: 150,
    // borderRadius: 5,
    // borderWidth: 3,
    // borderRadius: 5,
    // borderColor: '#50C878'
    position: 'absolute',
    height: 184,
    width: 150,
    left: 203,
    top: 240,
    borderColor: 'white',
    borderWidth: 2,
  },
  isi: {
    fontSize: 25,
    fontWeight: '200',
    color: '#837D7D',
    borderColor: '#000000',
    marginLeft: 10
  },
  isiII:{
    fontSize: 25,
    fontWeight: '200',
    color: '#837D7D',
    borderColor: '#000000',
    marginTop: 10,
    marginLeft: 10
  },
  isiIII:{
    fontSize: 15,
    fontWeight: '200',
    color: '#837D7D',
    borderColor: '#000000',
    marginTop: 10,
    marginLeft: 10
  },
  garis: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    top: 5
  },
  garisII:{
    borderWidth: 2,
    borderColor: '#D9D9D9',
    top: 5
  },
  gariso:{
    borderWidth: 2,
    borderColor: '#D9D9D9',
    top: 10
  },
  garison:{
    borderWidth: 2,
    borderColor: '#D9D9D9',
    top: 1,
  }
})