import { StyleSheet, Text, View, ScrollView, ImageBackground, useWindowDimensions,Image } from 'react-native'
import React, { useEffect, useState  } from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { BASE_URL, Colors } from '../constant'
import { ArticleAction } from '../actions'
import Gap from '../components/Gap'
//import HTMLView from 'react-native-htmlview'

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';
import RenderHtml from 'react-native-render-html';
import LinearGradient from 'react-native-linear-gradient'
import { HeaderWithBackButton } from '../components'
import WebView from 'react-native-webview'
const AboutScreen = ({route, navigation}) => {
    //const { article } = route.params;
    let getImage = (image) => {
        return {
            uri: BASE_URL + '/uploads/' + image
        }
    }

    const { width } = useWindowDimensions();
    return (
        <LinearGradient colors={['#272727', '#13140D']} style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/images/long-background.png')} resizeMode="cover" style={{width: '100%', flex: 1, height: '100%'}}>
                {/* <ScrollView style={{  height: '100%', paddingHorizontal: 20 }}> */}
                    <Gap height={20}/>
                    <View style={{paddingHorizontal: 20}}>
                        <HeaderWithBackButton onPress={() => navigation.goBack() } />
                    </View>
                    <Gap height={20}/>
                    <WebView source={{
                        uri: 'https://edenhookah.com'
                    }}/>
                {/* </ScrollView> */}
            </ImageBackground>
        </LinearGradient>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    hero: {
        height: 400
    },
    title: {
        fontSize: 20,
        color: '#FFFFF0',
        letterSpacing: .8,
        fontFamily: 'Montserrat-Bold'
    },
    container : {
        padding: 30,
        width: '100%',
    },
 
})