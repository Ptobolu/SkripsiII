import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function About() {
  return (
    <ImageBackground
      source={require("../../Slider/Gambar/Bak.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <Text style={styles.hebat}>#Minut Hebat</Text>
      <Text style={styles.hebat}>#Minut Bersih</Text>
      <Text style={{ fontSize: 20, left: 80, fontWeight: 'bold', color: 'red' }}>#Minut Bebas Sampah</Text>
      <ScrollView style={styles.container}>
        <Image style={styles.logo} source={require('../../Slider/Gambar/Dinas.jpg')} />
        <View style={styles.melintangII} />
        <View style={styles.aboutContainer}>
          <Text
            style={styles.Header}>
            DINAS LINGKUNGAN HIDUP KABUPATEN MINAHASA UTARA
          </Text>
          <View style={styles.melintang} />
          <Text
            style={styles.instruksi}>
            Instruksi Bupati No. 44 Tahun 2021 tentang Gerakan JGKWL (GERAKAN JAGA KEBERSIHAN WILAYAH DAN LINGKUNGAN)
            Minut Bersih Minut Sehat Minut HEBAT
          </Text>
        </View>
        <Image style={styles.Kep} source={require('../../Slider/Gambar/Marten.jpg')} />
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 50, marginTop: -30 }}>KADIS Dinas Lingkungan Hidup</Text>
          <Text style={styles.nama}>Drs. Marthen S. Sumampouw, M.SI</Text>
        </View>
        <View>
          <Image style={styles.daur} source={require('../../Slider/Gambar/Bdaurulang.jpeg')} />
          <Text style={{ backgroundColor: '#0e70b7', color: 'white', borderRadius: 5, fontSize: 15, width: 340, marginLeft: 10, marginTop: -30 }}>Kabupaten Minahasa Utara menjadi salah satu di antara 5 daerah yang menerima bantuan fasilitas pengelolaan sampah dari Ditjen PSLB3 KLHK berupa rumah kompos dengan kapasitas 2 ton per hari.
            Artikel ini telah tayang di TribunManado.co.id dengan judul Minahasa Utara Dapat Bantuan dari KLHK, Joune Ganda: Pengelolaan Sampah Kewajiban Bersama,</Text>
        </View>
        <View style={styles.sosial}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', left: 100, color: 'white' }}>Media Sosial:</Text>
          <View style={{
            marginTop: 5,
            borderWidth: 1,
            borderColor: 'white',
          }} />
          <Text style={{ fontSize: 15, fontWeight: 'bold', left: 50, top: 10, color: 'white' }}>dlh_minut</Text>
          <Entypo name="instagram" size={20} color="white" style={{ top: -10, left: 20 }} />
          <View style={{
            marginTop: 5,
            borderWidth: 1,
            borderColor: 'white',
          }} />
          <Text style={{ fontSize: 15, fontWeight: 'bold', left: 50, top: 10, color: 'white'}}>DinasLingkunganHidupMinut</Text>
          <Ionicons name="ios-logo-facebook" size={20} color="white" style={{left: 16, top: -10}}/>
          <View style={{
            marginTop: 5,
            borderWidth: 1,
            borderColor: 'white',
          }} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

About.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white'
  },
  Header: {
    fontSize: 20,
    marginTop: -70,
    fontWeight: 'bold',
    width: 350,
    alignItems: 'center',
    justifyContent: 'center'
  },
  instruksi: {
    fontSize: 15,
    height: 100,
    width: 300
  },
  nama: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#0e70b7',
    borderRadius: 10,
    margin: 7,
    padding: 10,
    color: 'white'
  },
  aboutContainer: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 50,
    paddingBottom: 20,
    padding: 20,
    opacity: 0.9,
    marginTop: 40,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 390,
    height: 800,
    borderRadius: 20
  },
  melintang: {
    borderWidth: 3,
    borderColor: 'black',
  },
  melintangII: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  Kep: {
    width: 150,
    height: 150,
    borderRadius: 500,
    marginLeft: 100,
    top: -30,
    margin: 10
  },
  kepala: {
    fontSize: 20,
    paddingTop: 0.5,
    paddingLeft: 100,
    fontWeight: 'bold',
    opacity: 3.9,
    borderRadius: 20,
    color: 'black',
  },
  hebat: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 90,
    color: 'red'
  },
  sosial: {
    backgroundColor: '#0e70b7',
    marginTop: 30,
  },
  daur: {
    width: 340,
    height: 250,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 30,
    margin: 10
  },
});
