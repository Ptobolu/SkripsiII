import React, { useEffect,  useState } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList, Image, RefreshControl, Alert } from 'react-native'
import BackEnd from '../../Config/Firebase/BackEnd'

import moment from 'moment';
import localization from 'moment/locale/id';

moment.updateLocale('id', localization)

let tanggal = moment().locale('id')

const Notifikasi = ({navigation}) => {
  const [formKey, setFormKey] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [proses, setProses] = useState('');
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async(refresh = false) => {
    await BackEnd.database().ref('data_laporan/').once('value', function (data) {
      setIsFetching(true);
      let data_array = [];
      data.forEach(sampah => {
        let objdata = sampah.val();
        if(objdata.status !== 'Sudah Diangkut') {
          objdata.key = sampah.key;
          data_array.push(objdata);
        }
      });
      setIsFetching(false);
      setFormKey(data_array);
    });
    setIsLoading(false);
  }

  const confirmasi = async(data, newstatus = null) => {
    await cekLaporan(data.key, newstatus);
  }

  const cekLaporan = async (key, newstatus = null) => {
    await BackEnd.database().ref(`data_laporan/${key}`).once('value', (data) => {
      const newdata = data.val();
      if(newdata.status === 'Sudah Diangkut') {
        alert('Sampah sudah diangkut');
        loadData();
      } else {
        let status = '';
        // newstatus = (newstatus === '') ? data.status : newstatus;
        if(newstatus === 'Ditolak') {
          status = newstatus;
        } else if(newdata.status === '') {
          status = 'Terima';
        } else if(newdata.status === 'Terima') {
          status = 'Dalam Perjalanan';
        } else if(newdata.status === 'Dalam Perjalanan') {
          status = 'Sudah Diangkut';
        }

        if(status !== '') {
          var adaNameRef = BackEnd.database().ref(`data_laporan/${data.key}/`);
          adaNameRef.update({ status: status})
          .then(async(data) => {
            if(status === 'Sudah Diangkut') {
              loadData();
            }
            setNewStatus(status);
            const ns = await setStatus(status);
            setProses(ns);
          })
          .catch((error) =>{
            console.log(error);
          });
        }
        setUpdate(true);
      }
    });
  }

  const setStatus = (status) => {
    if(status === '') {
      return 'Terima Laporan';
    } else if(status === 'Terima') {
      return 'Dalam Perjalanan';
    } else if(status === 'Dalam Perjalanan') {
      return 'kirim';
    }
  }

  if(isLoading) {
    return (
      <Text style={{ fontSize: 25, color: '#3ade3b', fontWeight: 'bold', top: 200, margin: 20, width: 350, height: 300, marginLeft: 80 }}>Tunggu sebentar...</Text>
    )
  } else {
    return (
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => loadData(true)}
          />}>
            {
              formKey.length > 0
              ?
                <FlatList
                  data={formKey}
                  renderItem={({ item, index}) => {
                    console.log(item.status);
                    return(
                      <TouchableOpacity key={index} style={styles.container}
                        onPress={() => navigation.navigate('DetailNotif', item)}>
                        <View style={styles.bulat}>
                        <Text style={styles.data} >Keterangan:</Text>
                        <Text style={styles.kets} >{item.keterangan}</Text>
                        <Text style={styles.data}>Alamat :</Text>
                        <Text style={styles.kets}>{item.alamat}</Text>
                        <Text style={{fontSize: 12,left: 70, fontWeight: 'bold', top: 1, color: 'black', backgroundColor: 'gainsboro', width: 185, borderRadius: 10}}>{tanggal.format('LLLL')}</Text>
                        
                          <Text style={styles.stat}>{newStatus === '' ? item.status : newStatus}</Text>
                          <Image
                            source={{
                              uri: item.foto
                                ? `data:image/jpg;base64,${item.foto}`
                                : null,
                            }}
                            style={styles.thumbnail}
                          />
                        </View>
                        
                        {
                          item.status === 'Ditolak' ? null :
                          ((newStatus === '' ? item.status : newStatus) === 'Dalam Perjalanan' ? null
                          :
                          <View>
                          <TouchableOpacity style={styles.klik} onPress={() => confirmasi(item, newStatus)}>
                            <Text style={styles.terima}>{proses === '' ? setStatus(item.status) : proses}</Text>
                          </TouchableOpacity>
                        <TouchableOpacity style={styles.tamb} onPress={() => confirmasi(item, 'Ditolak')}>
                          <Text style={styles.tolak2}>Tolak Laporan {item.status}</Text>
                        </TouchableOpacity>
                        </View>)
                        }
                      </TouchableOpacity>
                    )
                  }}
                />
              : <Text style={{fontSize: 20, color: '#858383', fontWeight: 'bold', top: 200, margin: 20, width: 350, height: 300, left: 20}}>TIDAK ADA LAPORAN MASUK</Text>
            }
      </ScrollView>
    )
  }
};



export default Notifikasi;

const styles = StyleSheet.create({
  container:{
    top: 60,
    marginTop: -55,

  },
  thumbnail:{
    position: 'absolute',
    height: 135,
    width: 60,
    top: 7,
    left: 5,
    borderColor: 'white',
    borderWidth: 2,
  },
  bulat:{
    width: 350,
    left: 5,
    height: 150,
    backgroundColor:"#50C878",
    borderRadius: 10,
  },
  data:{
    fontSize: 15,
    fontWeight: '700',
    color:"white",
    left: 70,
    top: 1
  },
  kets:{
    fontSize: 15,
    color: 'white',
    left: 70,
  },
  klik:{ 
    top: -35,
    backgroundColor: 'dodgerblue',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 30,
    borderRadius: 10,
    left: 220,
  },
  terima:{
    position: 'absolute',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    justifyContent: 'center',
    color: 'white',
  },
  tolak2:{
    position: 'absolute',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    justifyContent: 'center',
    color: 'white',
  },
  tamb:{
    top: -65,
    backgroundColor: 'red',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 30,
    borderRadius: 10,
    left: 75,
  }
})

