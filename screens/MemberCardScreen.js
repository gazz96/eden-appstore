import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, logoSrc, API_URL } from '../constant'
import Gap from '../components/Gap'

import { UserContext } from '../context';

import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient'
import WebView from 'react-native-webview';
const MemberCardScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('bagas.topati@gmail.com');
//   const [password, setPassword] = useState('bagast');
//   const [email, setEmail] = useState('subscribers@gmail.com');
//   const [password, setPassword] = useState('subscribers');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setLoading] = useState(false);

  const state = UserContext()

  const login = async(event) => {

    
  }

  useEffect(() => {
    console.log(API_URL + "/user/barcode/?user_id=" + state.get().id)
  })
  
  return (
    <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
        <ImageBackground source={require('../assets/images/long-background.png')} resizeMode="cover" style={{width: '100%', flex: 1, height: '100%'}}>
            <ScrollView style={{ flex: 1 }}>
                
            
                    <Gap height={80}/>
                    {/* <View style={{flexDirection:'row', justifyContent: 'center', flexWrap: 'wrap'}}>
                        <Image source={{
                            uri: API_URL + "/user/barcode/" + state.get().id
                        }} style={{ width: 92, height: 92}} resizeMode="contain"/>
                    </View>
                    <Gap height={40}/> */}
                    
                    <View style={{ width: '100%', paddingHorizontal: 40, justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Gap height={30}/>
                        <Text style={{fontFamily: 'Montserrat-SemiBold', color: '#fff', width: '100%', textAlign: 'center', marginBottom: 5, fontSize: 18}}>{state.get().first_name} {state.get().last_name}</Text>
                        <Text style={{fontFamily: 'Montserrat-SemiBold', color: '#fff', width: '100%', textAlign: 'center', marginBottom: 5, fontSize: 14}}>{state.get().email}</Text>
                        <Text style={{fontFamily: 'Montserrat-SemiBold', color: '#fff', width: '100%', textAlign: 'center', marginBottom: 5, fontSize: 14}}>{state.get().phone_number}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                            <Text style={{fontFamily: 'Montserrat-SemiBold', color: '#222', backgroundColor: '#fff', paddingHorizontal: 6, paddingVertical:  4, borderRadius: 3, overflow: 'hidden', textAlign: 'center', marginBottom: 4, fontSize: 14}}>{state.get().level}</Text>
                        </View>
                        <Gap height={20}/>
                        <View>
                            <View style={{width: 230, height: 230}}>
                                <WebView 
                                    scalesPageToFit={false}
                                    source={{ uri: API_URL + "/user/barcode/?user_id=" + state.get().id  }} />
                            </View>
                        </View>
                        <Gap height={20}/>
                        <Text style={{fontFamily: 'Montserrat-Regular', letterSpacing: .8, color: '#FFFFF0', textAlign: 'center'}}>Please show this QR to our staff{"\n"}for check-in.</Text>
                        <Gap height={56}/>
                        {
                            isLoading ? <Text style={styles.btnPrimary}>Loading</Text> : (
                            <Pressable onPress={() => navigation.goBack()} style={{width: '100%'}}>
                                <LinearGradient colors={['#FFDD9C', '#BC893C']} style={{borderRadius: 15}}>
                                    <Text style={styles.btnPrimary}>Done</Text>
                                </LinearGradient>
                            </Pressable>
                            )
                        }
                    </View>
                    
                    
                
            </ScrollView>
        </ImageBackground>
    </LinearGradient>
  )
}

export default MemberCardScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flex: 1,
        height: '100%'
        
    },
    logo: {
        width: 110,
        height: 110
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222'
    },
    formLabel: {
        fontSize: 12, 
        marginBottom: 4,
        color: '#222'
    },
    formControl: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 10,
        height: 50,
        fontSize: 16,
        paddingHorizontal: 16,
        color: Colors.dark,
        backgroundColor: '#eee'
    },
    btnPrimary: {
        borderRadius: 25,
        color: '#fff',
        width: '100%',
        height: 50,
        lineHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        textAlign: 'center',
        letterSpacing: 1,
        fontFamily: 'Montserrat-Bold',
    }
})