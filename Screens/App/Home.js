import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, Dimensions, View, SafeAreaView, Text, TouchableOpacity, Alert, Image, ScrollView} from 'react-native';
import { ambilDataUser, hapusDataUser, simpanLaporanAktif, hapusLaporanAktif } from '../../Auth';
import SliderLayer from '../../Slider/SlideLayar';
import Header from '../../Slider/layar/Header';
import { VideoExportPreset } from 'expo-image-picker';


const width = Dimensions.get('window').width;

const Home = ({ navigation, route }) => {
  const [dataUser, setDataUser] = useState(Object);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const status = await ambilDataUser();
      setDataUser(route.params ?? status);
      setIsLoaded(false);
    }
    loadData();
  }, []);

  const logOut = () => {
    if (hapusDataUser()) {
      navigation.navigate('Login');
    } else {
      Alert.alert('Oops', 'Gagal logout, silahkan coba lagi.')
    }
  }

  const newDataUser = (JSON.stringify(route.params) !== JSON.stringify(dataUser) && route.params) ? route.params : dataUser;
  if(isLoaded) {
    return(
      <Text style={{ fontSize: 25, color: '#3ade3b', fontWeight: 'bold', top: 200, margin: 20, width: 350, height: 300, marginLeft: 80 }}>Tunggu sebentar...</Text>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <SliderLayer />
      </View>
      <View style={{backgroundColor: '#0e70b7', width: 600, height: 150, top: 220, borderWidth: 1, borderColor: '#50C878'}}> 
      <View style={{top: 300, left: -10}}>
      </View>
      <Text style={{top: 10, fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>APLIKASI PELAPORAN SAMPAH</Text>
      <Text style={{top: 10, fontSize: 28, fontWeight: 'bold', color: 'white',textAlign: 'center'}}>LAYANAN E-GOVERNMENT</Text>
      <Text style={{top: 10, fontSize: 25, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>DINAS LINGKUNGAN HIDUP</Text>
      <Text style={{top: 10, fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>KABUPATEN MINAHASA UTARA</Text>
      
      </View>
      <ScrollView>
      <View style={{marginTop: 240, marginLeft: 2}}>
        {newDataUser.level === 'Masyarakat'
          ?
          <TouchableOpacity style={styles.tombol} onPress={() => navigation.navigate('BuatLaporan')}>
            <Image
              source={require('../../Slider/Gambar/Form.png')}
              style={styles.ImageIconStyle}/>
            <View style={styles.SeparatorLine}/>
            <Text style={styles.textTombol}>FORM BUAT LAPORAN</Text>
          </TouchableOpacity>
          : null
        }

        {newDataUser.level === 'Kadis'
          ?
          <TouchableOpacity style={styles.tombol} onPress={() => navigation.navigate('Feedback')}>
            <Image
              source={require('../../Slider/Gambar/feedback.png')}
              style={styles.ImageIconStyle}
            />
            <View style={styles.SeparatorLine} />
            <Text style={styles.textTombol}>FEEDBACK MASYARAKAT</Text>
          </TouchableOpacity>
          : null
        }

        {newDataUser.level === 'Petugas'
          ?
          <TouchableOpacity style={styles.tombol} onPress={() => navigation.navigate('Notifikasi')}>
            <Image
              source={require('../../Slider/Gambar/notif.png')}
              style={styles.ImageIconStyle}
            />
            <View style={styles.SeparatorLine} />
            <Text style={styles.textTombol}>DAFTAR LAPORAN MASUK</Text>
          </TouchableOpacity>
          : null
        }

        {newDataUser.level === 'Masyarakat'
          ?
          <TouchableOpacity style={styles.tombol} onPress={() => navigation.navigate('Tracking')}>
            <Image
              source={require('../../Slider/Gambar/track.png')}
              style={styles.ImageIconStyle}
            />
            <View style={styles.SeparatorLine} />
            <Text style={styles.textTombol}>TRACKING LAPORAN</Text>
          </TouchableOpacity>
          : null
        }

        {newDataUser.level === 'Masyarakat'
          ?
          <TouchableOpacity style={styles.tombol} onPress={() => navigation.navigate('History')}>
            <Image
              source={require('../../Slider/Gambar/History.png')}
              style={styles.ImageIconStyle}/>
            <View style={styles.SeparatorLine}/>
            <Text style={styles.textTombol}>RIWAYAT LAPORAN</Text>
          </TouchableOpacity>
          : null
        }

        <TouchableOpacity style={styles.tombol} onPress={() => navigation.navigate('About')}>
          <Image
            source={require('../../Slider/Gambar/Aboutus.png')}
            style={styles.ImageIconStyle}
          />
          <View style={styles.SeparatorLine} />
          <Text style={styles.textTombol}>DINAS LINGKUNGAN HIDUP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout} onPress={() => logOut()}>
          <Entypo name="log-out" size={30} color="#0cb067" />
          <Text style={styles.textLog}>Keluar</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <View style={{backgroundColor: '#0e70b7', width: 400, height: 20}}>
        <Text style={{fontSize: 14, left: 160, color: 'white'}}>Testing Version</Text>
      </View>
    </SafeAreaView>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 200
  },
  banner:{
    position: 'absolute',
    top: 20,
  },
  logout: {
    top: 20,
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: 'bold',
    left: 100
  },
  textLog: {
    top: -30,
    textDecorationLine: 'underline',
    fontSize: 17,
    fontWeight: 'bold',
    left: 56
  },
  tombol: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#50C878',
    borderWidth: .5,
    borderColor: '#fff',
    height: 60,
    width: width - 20,
    borderRadius: 5,
    margin: 5,
  },
  textTombol: {
    color: "white",
    marginBottom: 4,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 17,
  },
  din: {
    flex: 1,
    fontSize: 24,
    position: 'absolute',
    top: 320,
    fontWeight: 'bold',
    color: 'dodgerblue',
    left: 112
  },
  paten: {
    fontSize: 20,
    position: 'absolute',
    top: 400,
    color: 'black',
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    fontSize: 25,
    position: 'absolute',
    top: 240,
    fontWeight: 'bold',
    color: '#148ccc',
    left: 112
  },
  sampah: {
    flex: 1,
    fontSize: 57,
    position: 'absolute',
    top: 255,
    fontWeight: 'bold',
    color: 'dodgerblue',
    left: 112
  },
  ImageIconStyle: {
    padding: 25,
    margin: 10,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    tintColor: 'white'
  },
  SeparatorLine: {
    backgroundColor: 'white',
    width: 6,
    height: 58
  }
});


//Kode warna hijau emerald
// dan fern green
