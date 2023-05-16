import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
       <Image source={require('../../assets/Image/Header.png')}
          style={{ resizeMode: "center", height: 100, width: 365}} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
})