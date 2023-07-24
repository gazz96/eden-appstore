import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'


const DeliveryScreen = () => {
  return (
    <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
        <ImageBackground source={require('../assets/images/long-background.png')} resizeMode="cover" style={{width: '100%', flex: 1, height: '100%'}}>
            <ScrollView style={{ flex: 1 }}>
            </ScrollView>
        </ImageBackground>
    </LinearGradient>
  )
}

export default DeliveryScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flex: 1,
        height: '100%'
    },
})