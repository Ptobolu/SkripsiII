import React from 'react'
import { View, Text } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'

export default function SlideLayar() {
  const images =[
    require('../assets/Image/Slider/21.png'),
    require('../assets/Image/Slider/20.jpg'),
    require('../assets/Image/Slider/19.jpg'),
    require('../assets/Image/Slider/18.jpg'),
    require('../assets/Image/Slider/17.jpg'),
    require('../assets/Image/Slider/16.jpg'),
    require('../assets/Image/Slider/15.jpg'),
    require('../assets/Image/Slider/14.jpg'),
    require('../assets/Image/Slider/13.jpg'),
    require('../assets/Image/Slider/12.jpg'),
    require('../assets/Image/Slider/9.jpg'),
    require('../assets/Image/Slider/8.jpg'),
    require('../assets/Image/Slider/5.jpg'),
    require('../assets/Image/Slider/4.jpg'),
  ];
  return (
    <View style={{borderRadius: 30}}>
      <SliderBox 
      images = {images} 
      dotColor='limegreen' 
      inactiveColor='black' 
      dotStyle={{heigth: 40, width: 10,borderRadius: 10}} 
      imageLoading='limegreen' 
      autoplay={true} 
      autoplayInterval={2000} 
      circleLoop={true}
      onCurrentImagePressed={(index) => alert(index+1)}
      firstItem={1}
      paginationBoxVerticalPadding={5}
      />
    </View>
  )
}








// import React, { Component } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   Image,
//   View,
//   ScrollView,
//   Dimensions
// } from 'react-native';

// const images = [
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t1.6435-9/179909450_127815369387069_21456722594003181_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=19026a&_nc_eui2=AeGGVEzPpHCLWRHZNfZkZhQHaPbEbAilTjxo9sRsCKVOPN-_w98YhBcJRRawKHahZQBrSSDwQZor38wceR3hH5YJ&_nc_ohc=f3CQnCeruEwAX87fcsP&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfAvAP9SxC-Hf5-pbDdiDCkqJzGVbXIHjIU4N_rm6XHlLQ&oe=638E0B6E',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/283745657_377001897801747_229680073829630842_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeG0-47Pgj3stwwkgOM5FkvepyUVXug6C3WnJRVe6DoLdfKYgUPlWXUgZsze2Ypx21Jc4Cfbw3GIJ0OWLyEKNoLE&_nc_ohc=apulV3ma6S8AX8xF-Sq&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfDdrWoyU1DdvS7Z6Kb40DFjl3lNgRs66i4RfmkGv5oRjQ&oe=636ADC0D',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/278115709_349330897235514_8231477295736001937_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeERw__5dFZmpW0F7k2891soOBHF_P1H4Hc4EcX8_UfgdycYPkcNDP27VvkK2eGC83z1FbcCMguZ3C3FyyYQK4PI&_nc_ohc=lMnwbuKIrTMAX_S_orI&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfAzbQcNQfQQPqdryEpaVTN--NmaX97Dv9S-EBMaJ3X86g&oe=636AEA20',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/278163881_349330783902192_5238893630519238241_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeF7VjD2MbuLzgN029CLR6V6h63eQx1S7w-Hrd5DHVLvDwlzO9fOIBZeSuMXSV7IxY77ecCgqHsdkYF-ghC2sxGp&_nc_ohc=BjRa5Jzr4cUAX9veb1N&tn=TK6bROU9boEQGIyL&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfBcIKh9ZUQP88pNKYGhoZUBAzcAOiMQqDW6mgJp3MHmsg&oe=636ADA40',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/278384818_349330757235528_6564426343782583727_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEcxPiIBhSizmk_oxfr_W74bLA3zqDQl9hssDfOoNCX2J246LvQXPN2TfwqMxhbym2KD7pAlJ43be4I0O5DrBTe&_nc_ohc=RELxV9lBKQgAX9xJX0L&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfDJFKrT5KdyXl6XPKHJbyeLR6iyp-UctUlHcZ3-iMn1kQ&oe=636AAA73',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/276157694_349330723902198_6654307395046640322_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGpjpm7pQPB7GsG46SvqajG_t_912524j_-3_3XbnbiP6rD2BNG0yEC_wvs8bShg3yxfSVN70EHNTtNTQG7iQxc&_nc_ohc=09Ck1tx6qzsAX9Mt2JB&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfBmUTDExgRix9htk8a2_FNmSWix7xZhsvpQLT5_iYJkuw&oe=636B7799',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/278430510_349326747235929_392275814822967880_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEIdHKy46WaZuT72drSGl-IXnxt98UEx3pefG33xQTHesFl-ps3-9Hmk7Yva_IYYYAlXC6-10eYa2NFOyFxGQoe&_nc_ohc=Ohj_TGYK8JUAX8rJTNM&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfBs_epMhRZpsuugjfgAmPVhl0UWz6X80WEZZSAdiVZzDA&oe=636C1BAD',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/278181202_349326673902603_4520270644906361300_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFKJBsWVPzv79FDkPczHaY2i4W_MRy22SyLhb8xHLbZLMz9y1JSssMLmmgskDi8WLAP7DCGvx6wofxQpH3wnLCi&_nc_ohc=buj6EUuOnssAX83uZXo&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfC2MPBPrtgzp3n_u2TfCFQzpTCJUTDewgu9lhEZfRhrQw&oe=636BAB37',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/278394691_348092717359332_1291222253296237063_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGE_jxemshjgyDNNVNj0JYMliZZM3j810-WJlkzePzXT_H2eTP1NtQ3a8076kycBFNRUtv8w3XpXSJtlkXIu42W&_nc_ohc=_svnbwAa2gsAX9OfZdT&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfDigaG3FxouDJFMMIC9E-f7mAAn5ZmJJmozXt8hwDhiDA&oe=636AD61E',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/277815347_348095017359102_435244791546907265_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeF2uRCFs2owC6uCvGdstKg5a459qY9z5_Brjn2pj3Pn8LF9tdzF2WHQIHUK_M-189x9UFQ8fwGt_zd2vaMNwetG&_nc_ohc=yyXuM5QUaTYAX_1Zgk0&tn=TK6bROU9boEQGIyL&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfAA-x-MpMe3AWGfTPnFWz_0jMZhwzG5sSHtagOU5aR2rg&oe=636C6E4A',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/277727301_344854971016440_4328122718921220001_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeH3nDFvE0mlRmVMT9bBLxSWL6hiz80R3mUvqGLPzRHeZb7r5VzKPMNd8qRvueH4EILfIfni61wkAWuO-Sf5A3zG&_nc_ohc=mTkd8VBCnCYAX-Ddte_&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfD_HAUNEuuEFQiIY5_BORBwhrF-pTHaFFTLPX0TicHUlQ&oe=636C6795',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/277762627_344854941016443_7957523490712808257_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEFqsW_jPghgRuRRqEwWlklrMa-Z6ZZRqmsxr5npllGqXfxozbuVyFe-DR9Fwy22yOE4FRVSyc6AAlDxUK8yTkn&_nc_ohc=Oo9D8ESqjLAAX_9Gzl5&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfALpy8E0NATn5TwHKP1hNA4j9t_n5B_6v4Gphgox1Pfjw&oe=636B8D57',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/277734488_344854887683115_5044254549760848448_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEUB5qIUuTUFGC-XZ-CiEUZB8DNTbqtAxcHwM1Nuq0DF2L4esKIVJxzT7p891KDXXoSG7VJCw8YcWQU4FDAlPXi&_nc_ohc=PSx6LgD2V-MAX_BhiKA&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfAQJbvCLfatDYNL0Lz3WbDKLn-6iZbrzBI_xdx8h89KjQ&oe=636C26AE',
//     'https://scontent.fmdc1-1.fna.fbcdn.net/v/t39.30808-6/277745908_344854854349785_1085013572035421775_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeETnmP7vztNjjFSfI6aTXOrdhsgrwnDjvV2GyCvCcOO9b4R9Gm3Mz8L2k49fDnlPqlE9n9fiQizpSnN0JO4rbu_&_nc_ohc=3CtROmK36NgAX_zftIP&_nc_zt=23&_nc_ht=scontent.fmdc1-1.fna&oh=00_AfCIYTyH-P8Ph86t1CNaH9yja6LT7THmYox1aCFG_4ayBw&oe=636B2D25',
// ]

// class Coba extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       active: 0
//     }
//   }

//   change(nativeEvent) {
//     if(nativeEvent) {
//       const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
//       if (slide !== this.state.active) {
//       this.setState({
//         active:slide
//       })
//       }
//     }
//   }

//   render() {
//     const { active } = this.state;
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.wrap}>
//           <ScrollView
//             onScroll={({ nativeEvent })=>this.change(nativeEvent)}
//             showsHorizontalScrollIndicator={false}
//             pagingEnabled
//             horizontal
//             style={styles.wrap}
//           >
//             {
//               images.map((e, index) =>
//                 <Image
//                   key={e}
//                   resizeMode="stretch"
//                   style={styles.wrap}
//                   source={{ uri: e }}
//                 />
//               )
//             }
//           </ScrollView>
//           <View style={styles.wrapDot}>
//             {
//               images.map((e, index) =>
//                 <Text
//                   key={e}
//                   style={active === index ? styles.dotActive : styles.dot}>●</Text>)
//             }
//           </View>
//         </View>

//       </SafeAreaView>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     top: -170,
//   },
//   wrap: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height * 0.3,
//   },
//   wrapDot: {
//     position: 'absolute',
//     bottom: 0,
//     flexDirection: 'row',
//     alignSelf: 'center',
    
//   },
//   dot: {
//     margin: 4,
//     color: 'white'
//   },
//   dotActive: {
//     margin: 4,
//     color: 'limegreen'
//   }

// });

// export default Coba;


