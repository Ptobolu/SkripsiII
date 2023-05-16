import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, Image, Text, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import BackEnd from '../../Config/Firebase/BackEnd';
import * as ImagePickerExpo from 'expo-image-picker';

import { Ionicons } from '@expo/vector-icons';

import { ambilDataUser, simpanLaporanAktif, ambilLaporanAktif, hapusLaporanAktif } from '../../Auth';

import moment from 'moment';
import localization from 'moment/locale/id';

moment.updateLocale('id', localization)

let tanggal = moment().locale('id')

const BuatLaporan = ({ navigation }) => {
  const [ket, setKet] = useState('');
  const [alamat, setAlamat] = useState('');
  const [selectedImage, setSelectedImage] = useState({});
  const [loading, setLoading] = useState('');
  const [laporanAktif, setLaporanAktif] = useState(Object);
  const [dataLogin, setDataLogin] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    loadDataUser();
  }, []);

  const loadDataUser = async () => {
    setIsFetching(true);
    const data = await ambilDataUser();
    setDataLogin(data);
    checkLaporanAktif(data);
  }

  const checkLaporanAktif = async (dataUser) => {
    await BackEnd.database().ref('data_laporan/').once('value', function (data) {
      if (data.val() !== null) {
        data.forEach(laporan => {
          if (laporan.val().userid === dataUser.key && laporan.val().feedback === '') {
            simpanLaporanAktif(laporan.val());
            setLaporanAktif(laporan.val());
          } else {
            hapusLaporanAktif();
          }
        });
      } else {
        hapusLaporanAktif();
      }
    });
    loadDataLaporan();
  }

  const loadDataLaporan = async () => {
    const data = await ambilLaporanAktif();
    if (data !== null) {
      setLaporanAktif(data);
    }
    setIsFetching(false);
    setIsLoaded(false);
  }

  const buatLaporan = () => {
    if (cekSemuaInput()) {
      const dataLaporan = {
        userid: dataLogin.key,
        keterangan: ket,
        alamat: alamat,
        foto: selectedImage.base64,
        lokasi: location,
        status: '',
        feedback: ''
      }
      tambahLapran(dataLaporan);
    } else {
      setLoading('Semua Data Harus di Isi*');
    }
  }

  const tambahLapran = async (dataLaporan) => {
    const ref = BackEnd.database().ref('data_laporan');
    ref.push(dataLaporan)
      .then((data) => {
        let key = JSON.stringify(data);
        key = key.split('/');
        key = key[key.length - 1].replace('"', '');
        dataLaporan.key = key;
        simpanLaporanAktif(dataLaporan);
        setLaporanAktif(dataLaporan)
        bersihkanInput();
      })
      .catch((error) => {
        setLoading(error);
      })
  }

  const bersihkanInput = () => {
    setKet('');
    setAlamat('');
    setSelectedImage({});
    setLocation({});
  }

  const cekSemuaInput = () => {
    if (ket !== '' && alamat !== '' && setLocation !== '' && selectedImage.base64 !== null) {
      return true;
    }
    return false;
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
    setSelectedImage(cameraResult);
  };
  if (isLoaded) {
    return (
      <Text style={{ fontSize: 25, color: '#3ade3b', fontWeight: 'bold', top: 200, margin: 20, width: 350, height: 300, marginLeft: 80 }}>Tunggu sebentar...</Text>
    )
  }

  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView
        contentContainerStyle={styles.refres}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => loadDataUser()}
          />
        }>
        <Text style={{
          color: 'red', fontSize: 20, fontWeight: 'bold', marginLeft: 76,
          top: 40
        }}>{loading}</Text>
        {
          laporanAktif ?
            <View>
              <Text style={styles.isi}>Laporan Terkirim:</Text>
              <Ionicons name="checkmark-done-sharp" size={30} color="#50C878" style={{left: 210, top: -30}}/>
              <View style={styles.garis} />
              <View style={styles.buat}>
                <Text style={styles.text}>Keterangan:</Text>
                <Text style={styles.line}>{laporanAktif.keterangan}</Text>
                <Text style={styles.text}>Alamat:</Text>
                <Text style={styles.line}>{laporanAktif.alamat}</Text>
                <Text style={styles.text}>Status:</Text>
                <Text style={{fontSize: 12, fontWeight: 'bold', top: 30, color: 'black', backgroundColor: 'gainsboro', width: 185, borderRadius: 10}}>{tanggal.format('LLLL')}</Text>
                <Text style={{fontSize: 18, top: -20, fontWeight: 'bold', color: 'gainsboro' }}>{laporanAktif.status === '' ? 'Belum Diterima' : laporanAktif.status}</Text>
              </View>
              <Image
                source={{
                  uri: laporanAktif.foto
                    ? `data:image/jpg;base64,${laporanAktif.foto}`
                    : null,
                }}
                style={styles.detail}
              />



              {
                laporanAktif.status === 'Sudah Diangkut' && laporanAktif.feedback === ''
                  ?

                  <View>
                    <Text style={styles.feed}>Berikan Feedback untuk Petugas Kami.</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Tracking')}
                      style={[styles.button, styles.buttonOutline]}
                    >
                      <Text style={styles.buttonOutlineText}>Beri feedback</Text>
                    </TouchableOpacity>

                  </View>
                  : null
              }

            </View>
            :
            <SafeAreaView style={styles.container}>
              <Text style={[styles.daf, { marginTop: 20, top: 10 }]}>Formulir Pengaduan</Text>
              <View style={styles.inputContainer}>
                <Text style={{ flex: 1, fontWeight: 'bold', marginTop: 20, top: -10 }}>Keterangan</Text>
                <Text style={{ flex: 1, fontWeight: 'bold', top: -30, color: 'red', left: 75, fontSize: 20, marginTop: -1 }}>*</Text>
                <TextInput
                  placeholder="Keterangan"
                  value={ket}
                  onChangeText={text => setKet(text)}
                  style={styles.input}
                />
                <Text style={{ flex: 1, fontWeight: 'bold', marginTop: 20, top: -10 }}>Alamat</Text>
                <Text style={{ flex: 1, fontWeight: 'bold', top: -30, color: 'red', left: 50, fontSize: 20, marginTop: -1 }}>*</Text>
                <TextInput
                  placeholder="Alamat"
                  value={alamat}
                  onChangeText={text => setAlamat(text)}
                  style={styles.input}
                />
              </View>
              <Text style={{ flex: 1, fontWeight: 'bold', marginTop: 20, left: -150, top: -10 }}>FOTO</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', top: -30, color: 'red', left: -125, fontSize: 20 }}>*</Text>
              <View style={styles.camera}>
                <TouchableOpacity style={{backgroundColor: 'limegreen'}}
                  onPress={openCameraWithPermission} >
                  <Text style={styles.buttonText}>FOTO SAMPAH</Text>
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
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => buatLaporan()}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonOutlineText}>KIRIM LAPORAN</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default BuatLaporan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feed: {
    fontSize: 20,
    fontWeight: '100',
    left: 10,
    padding: -10,
  },
  logo: {
    justifyContent: 'flex-start',
  },
  inputContainer: {
    width: '95%',
  },
  input: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: -20,
    borderRadius: 10,
    borderColor: 'limegreen',
    borderWidth: 3,
    fontSize: 20,
    color: 'dimgrey',
    fontWeight: '600'
  },
  buttonContainer: {
    width: 340,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#29CC39',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'limegreen',
    top: -30,
    margin: 50,
    borderColor: '#29CC39',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
    marginTop: 10,
  },
  buttonOutlineText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  daf: {
    fontSize: 20,
    fontWeight: 'bold',
    top: -20,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '87%',
  },
  camera: {
    top: -20,
    borderWidth: 3,
    borderColor: 'limegreen',
    backgroundColor: '#eee',
    width: '95%',
    height: 190
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    textDecorationLine: 'underline',
  },
  lapor: {
    fontSize: 20,
    fontWeight: '100',
    top: -40,
    fontWeight: '100',
    color: 'white',
    marginLeft: 17,
    borderWidth: 2,
    borderColor: 'dimgray',
    backgroundColor: 'dodgerblue',
    left: -7,
    margin: 5,
    borderRadius: 5,
    padding: 10,
    margin: 5
  },
  detail: {
    width: 350,
    height: 200,
    borderWidth: 3,
    padding: 30,
    margin: 30,
    marginLeft: 5,
    borderColor: '#50C878',
    top: -60,
    borderRadius: 10
  },
  isi: {
    height: -50,
    marginLeft: 10,
    fontSize: 25,
    marginHorizontal: 20,
    fontWeight: '200',
    color: '#837D7D',
    marginTop: -19,
    borderColor: '#000000',
  },
  buat: {
    flex: 1,
    margin: 4,
    padding: 10,
    height: 200,
    backgroundColor: "#50C878",
    borderEndWidth: 4,
    borderRadius: 10,
    borderColor: 'gray',
    top: -30
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  line: {
    fontSize: 18,
    color: 'white'
  },
  garis: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    top: 5
  },
  scrollView: {
    backgroundColor: 'gainsboro',
  },
  maps: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#148ccc'
  }
})