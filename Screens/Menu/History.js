import React, { useEffect,  useState } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList, Image, RefreshControl } from 'react-native'
import BackEnd from '../../Config/Firebase/BackEnd'


import moment from 'moment';
import localization from 'moment/locale/id';

moment.updateLocale('id', localization)

let tanggal = moment().locale('id')


const History = ({navigation}) => {
  const [formKey, setFormKey] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [proses, setProses] = useState('');
  const [update, setUpdate] = useState(false);
  const [namaUser, setNamaUser] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async(refresh = false) => {
    await BackEnd.database().ref('data_laporan/').once('value', async function (data) {
      setIsFetching(true);
      let data_array = [];
      data.forEach(async sampah => {
        let objdata = sampah.val();
        if(objdata.feedback !== '') {
          objdata.key = sampah.key;
          data_array.push(objdata);
          let asdf = [];
          await BackEnd.database().ref(`data_user/${objdata.userid}`).once('value', function (data) {
            asdf.push(data.val().nama);
          });
          setNamaUser(asdf);
        }
      });
      setIsFetching(false);
      setFormKey(data_array);
    });
    setIsLoading(false);
    console.log(namaUser);
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
          />
        }>
          
          <Text style={styles.title}>Riwayat Pelaporan Anda:</Text>
            {
              formKey.length > 0
              ?
                <FlatList
                  data={formKey}
                  renderItem={({ item, index}) => {
                    console.log(namaUser);
                    return (
                      <TouchableOpacity key={index} style={styles.container}>
                        <View style={styles.bulat}>
                        <Text style={styles.data} >Nama:</Text>
                        <Text style={styles.kets} >{ namaUser[index] }</Text>
                        <Text style={styles.data}>Alamat:</Text>
                        <Text style={styles.kets}>{item.alamat}</Text>
                        <Text style={styles.data} >Feedback:</Text>
                        <Text style={styles.kets} >({item.feedback}/5)</Text>
                        <Text style={styles.data} >Keterangan: </Text>
                        <Text style={styles.kets} >{item.keterangan}</Text>
                        <Text style={styles.data}>Status:</Text>
                          <Text style={styles.kets}>{newStatus === '' ? item.status : newStatus}</Text>
                          <Text style={{fontSize: 12,left: 0, fontWeight: 'bold', top: 1, color: 'black', backgroundColor: 'gainsboro', width: 185, borderRadius: 10}}>{tanggal.format('LLLL')}</Text>
                          <Image
                            source={{
                              uri: item.foto
                                ? `data:image/jpg;base64,${item.foto}`
                                : null,
                            }}
                            style={styles.thumbnail}
                          />
                        </View>
                      </TouchableOpacity>
                    )
                  }}
                />
                
              : <Text style={{fontSize: 20, color: '#858383', fontWeight: 'bold', top: 200, margin: 20, width: 350, height: 300, left: 20}}>TIDAK ADA RIWAYAT LAPORAN</Text>
            }
      </ScrollView>
    )
  }
};

export default History;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  thumbnail:{
    height: 230,
    width: 150,
    marginLeft: 205,
    top: -217,
    left: -18,
    borderColor: '#148ccc',
    borderWidth: 2,
    borderColor: "white"
  },
  bulat:{
    flex: 1,
    margin: 4,
    padding: 10,
    height: 250,
    backgroundColor: "lightseagreen",
    borderRadius: 10,
    top: 10
  },
  data:{
    fontSize:15,
    fontWeight: '700',
    color:"black",
  },
  kets:{
  },
  klik:{ 
    fontSize: 10,
    backgroundColor: 'lime'
  },
  terima:{
    left: 20,
    top: -90,
    backgroundColor: 'limegreen',
    width: 50,
    height: 20,
    borderRadius: 10
  },

})

