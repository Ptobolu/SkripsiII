import { WhiteBalance } from 'expo-camera';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { ambilDataUser, ambilLaporanAktif, simpanLaporanAktif, hapusLaporanAktif } from '../../Auth';
import BackEnd from '../../Config/Firebase/BackEnd';

import moment from 'moment';
import localization from 'moment/locale/id';

moment.updateLocale('id', localization)

let tanggal = moment().locale('id')

const Tracking = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [laporanAktif, setLaporanAktif] = useState({});
  const [feedback, setFeedback] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    loadDataUser();
  }, []);

  const loadDataUser = async() => {
    setIsFetching(true);
    const data = await ambilDataUser();
    checkLaporanAktif(data);
  }

  const checkLaporanAktif = async (dataUser) => {
    await BackEnd.database().ref('data_laporan/').once('value', function (data) {
      if(data.val() !== null) {
        data.forEach(laporan => {
          if (laporan.val().userid === dataUser.key && laporan.val().feedback === '') {
            console.log(laporan.val().feedback);
            const newdata = laporan.val();
            newdata.key = laporan.key;
            simpanLaporanAktif(newdata);
            setLaporanAktif(newdata);
          } else {
            hapusLaporanAktif();
            setLaporanAktif('');
          }
        });
      } else {
        hapusLaporanAktif();
      }
    });
    setIsFetching(false);
    setIsLoaded(false);
  }

  const kasihFeedback = (key) => {
    if(feedback !== '') {
      const newfeedback = parseInt(feedback);
      console.log(newfeedback);
      if(isNaN(newfeedback)) {
        alert('Feedback harus angka 1 - 5');
      } else if(newfeedback < 1 || newfeedback > 5) {
        alert('Feedback tidak bisa lebih kecil dari "1" atau lebih besar dari "5"');
        setFeedback('');
      } else {
        var adaNameRef = BackEnd.database().ref(`data_laporan/${key}/`);
        adaNameRef.update({ feedback: feedback})
        .then(async(data) => {
          loadDataUser();
          setFeedback('');
        })
        .catch((error) =>{
          alert(error);
        })
      }
    } else {
      alert('Feedback belum diisih');
    }
  }

  if(isLoaded) {
    return(
      <Text style={{ fontSize: 25, color: '#3ade3b', fontWeight: 'bold', top: 200, margin: 20, width: 350, height: 300, marginLeft: 80 }}>Tunggu sebentar...</Text>
    )
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => loadDataUser()}
        />
      }>

      {
        laporanAktif.feedback === ''
        ?
          <SafeAreaView style={styles.container}>
            <View>
            <Text style={styles.isi}>Proses Tracking Status Laporan</Text>
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
                laporanAktif.fotopetugas ?
                  <Image
                    source={{
                      uri: laporanAktif.fotopetugas
                        ? `data:image/jpg;base64,${laporanAktif.fotopetugas}`
                        : null,
                    }}
                    style={styles.thumbnail}
                  />
                : null
              }
              
              {
                laporanAktif.status === 'Sudah Diangkut' && laporanAktif.feedback === ''
                ?
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Berikan Penilaian 1 - 5"
                      value={feedback}      
                      onChangeText={text => setFeedback(text)}
                      style={styles.input}
                      keyboardType='number-pad'
                      maxLength={1}
                    />
             
              <Text style={{
                fontSize: 20,
                color: 'black',
                top: -300,
                left:-15
              }}>Data Foto Petugas:</Text> 
              <Text style={{fontSize: 18, top: -325, fontWeight: 'bold', color: 'black', left: 160 }}>{laporanAktif.status === '' ? 'Belum Diterima' : laporanAktif.status}</Text>
                    <TouchableOpacity
                      onPress={() => kasihFeedback(laporanAktif.key)}
                      style={styles.button}
                    >
                      <Text style={styles.buttonOutlineText}>Kirim Feedback</Text>
                    </TouchableOpacity>
                  </View>
                : null
              }
            </View>
          </SafeAreaView>
        : <Text style={{fontSize: 20, color: '#858383', fontWeight: 'bold', top: 200, margin: 20, width: 350, height: 300, left: 20}}>BELUM ADA LAPORAN, BUAT LAPORAN TERLEBIH DAHULU</Text>
      }
    </ScrollView>
  )
}

export default Tracking;

const styles = StyleSheet.create({
  thumbnail: {
    marginTop: 50,
    marginLeft: 5,
    width: 349,
    height: 190,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#50C878'
  },
  inputContainer: {
    width: "90%",
    margin: 10,
    padding: 10,
    top: -40
  },
  input: {
    backgroundColor: "white",
    borderColor: "limegreen",
    borderWidth: 3,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginTop: 40,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 'bold',
    left: 1
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: "limegreen",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    left: -19,
    top: -60

  },
  buttonOutline: {
    margin: 10,
    borderColor: '#29CC39',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOutlineText:{
  fontSize: 17,
  fontWeight: 'bold',
  color: 'white',
  justifyContent: 'center',
  alignItems: 'center'
  },
  buat: {
    flex: 1,
    margin: 4,
    padding: 10,
    height: 210,
    backgroundColor: "#50C878",
    borderEndWidth: 4,
    borderRadius: 10,
    borderColor: 'gray',
    top: 20,
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
  detail: {
    // marginTop: 30,
    // marginLeft: 5,
    // width: 349,
    // height: 190,
    // borderWidth: 3,
    // borderRadius: 5,
    // borderColor: '#50C878'
    position: 'absolute',
    height: 190,
    width: 150,
    left: 203,
    top: 63,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5
  },
  isi: {
    fontSize: 25,
    fontWeight: '200',
    color: '#837D7D',
    borderColor: '#000000',
  },
  garis: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    top: 5
  },
})