import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import {Colors} from '../constant';
import { TouchableOpacity } from 'react-native';

const OnBoardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <ImageBackground source={{
            uri: 'https://sava.co.id/uploads/media/QfoZw4WB0ZECYpYLLM2k9GZ4JMybPWelQvkKzNeh.jpg'
        }} style={{ 
            width: '100%', 
            height: 300 
        }} resizeMode={'cover'}>
            <Text onPress={() => navigation.navigate('Home')} style={{
                position: 'absolute', 
                right: 10, 
                top: 10, 
                backgroundColor: Colors.primary, 
                color: Colors.white, 
                paddingVertical: 3, 
                paddingHorizontal: 10,  
                borderRadius: 3,
                fontSize: 14, }}>Skip</Text>
        </ImageBackground>
        <View style={{ padding: 20, justifyContent: 'space-between', flex: 1, borderRadius: 30, marginTop: -30, backgroundColor: Colors.white, overflow: 'hidden' }}>
            <View>
                <Text style={styles.title}>Hi Sobat Sava!</Text>
                <Text style={styles.description}>Jutaan Properti Terbaik Ada Di sini</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('OnBoardingSecondScreen')}>
                <Text style={styles.btnPrimary}>Selanjutnya</Text>
            </TouchableOpacity>
        </View>
    
    </View>
  )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    btnPrimary: {
        backgroundColor: Colors.primary,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.white,
        height: 40
    },
    title: {
        textAlign: 'center',
        color: Colors.dark,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        textAlign: 'center',
        color: Colors.dark,
        fontSize: 16
    }
})