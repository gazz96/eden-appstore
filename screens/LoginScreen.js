import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, logoSrc } from '../constant'
import Gap from '../components/Gap'
import { SessionAction, AuthAction } from '../actions'

import { UserContext } from '../context';

import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('bagas.topati@gmail.com');
//   const [password, setPassword] = useState('bagast');
//   const [email, setEmail] = useState('subscribers@gmail.com');
//   const [password, setPassword] = useState('subscribers');
//   const [email, setEmail] = useState('Aww@gmail.com');
//   const [password, setPassword] = useState('Aww');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setLoading] = useState(false);

  const state = UserContext()

  const login = async(event) => {
    event.preventDefault();
    setLoading(true)
    try {
        const response = await AuthAction.attempt(email,password);
        console.log('LOGIN', response);
        if( response.token && response.user ) {
            state.set(response.user)
            setEmail('')
            setPassword('')

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Login Success',
                onHide: () => {
                }
            });
            
            navigation.navigate("Home");
            
            
        }
    }
    catch(error) 
    {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            // if(error.response.status == 404) {
            //     AsyncStorage.removeItem()
            // }
    
            if (error.response.status == 422 )  {
              let errors = error.response.data.errors;
              for (let err in errors) {
                console.log(err);
                for (let message in errors[err]) {
                  console.log('messagees', errors[err][message]);
                  Toast.show({
                    type: 'error',
                    text1: 'Warning',
                    text2: errors[err][message],
                });
                }
              }
            }

            if (error.response.status == 404 )  {
                let errors = error.response.data.errors;
                for (let err in errors) {
                  Toast.show({
                    type: 'error',
                    text1: 'Warning',
                    text2: errors[err],
                  });
                }
              }

              if (error.response.status == 400 )  {
                let errors = error.response.data.errors;
                for (let err in errors) {
                  Toast.show({
                    type: 'error',
                    text1: 'Warning',
                    text2: errors[err],
                  });
                }
              }

            

          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: error.message,
            });
          }

    }finally {
        setLoading(false)
    }

    
  }

 

 
  
  return (
    <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
        <ImageBackground source={require('../assets/images/long-background.png')} resizeMode="cover" style={{width: '100%', flex: 1, height: '100%'}}>
            <ScrollView style={{ flex: 1 }}>
                
            
                    <Gap height={80}/>
                    <View style={{flexDirection:'row', justifyContent: 'center', flexWrap: 'wrap'}}>
                        <Image source={require('../assets/images/logo-gold.png')} style={{ width: 92, height: 92}} resizeMode="contain"/>
                        <Gap height={15}/>
                        <Text style={{width: '100%', textAlign: 'center', fontSize: 20, color: 'rgba(238, 238, 238, 1)', fontFamily: 'Montserrat-SemiBold'}}>Enter EDEN</Text>
                        <Gap height={10}/>
                        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                            <Text style={{marginRight: 5, fontWeight: '600', color: '#A3A3A3', letterSpacing: 1, fontFamily: 'Montserrat-SemiBold'}}>Don’t have account?</Text>
                            <TouchableOpacity onPress={()=> navigation.navigate('Register Screen')}>
                                <Text style={{color: 'rgba(250, 205, 133, 1)', fontWeight: '600', letterSpacing: 1, fontFamily: 'Montserrat-SemiBold'}}>Register here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Gap height={40}/>
                    {!isLoading ? (
                    <View style={{ width: '100%', paddingHorizontal: 40}}>
                        <Gap height={30}/>
                        <View>
                            <TextInput style={styles.formControl} onChangeText={newEmail => setEmail(newEmail)} value={email} placeholder="Email" placeholderTextColor="#A3A3A3" autoCapitalize='none'/>
                        </View>
                        <Gap height={20}/>
                        <View>
                            <TextInput style={styles.formControl} secureTextEntry={true} onChangeText={newPassword => setPassword(newPassword)}  value={password} placeholder="Password" placeholderTextColor="#A3A3A3" autoCapitalize='none'/>
                        </View>
                        <Gap height={34}/>
                        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                        {/* <Text style={[styles.formLabel, {color: '#FFFFF0', fontSize: 14, letterSpacing: .8, fontFamily: 'Montserrat-SemiBold'}]} secureTextEntry={true} onPress={() => navigation.navigate('Reset Password')}>Remember me</Text> */}
                            <Text style={[styles.formLabel, {color: '#FFFFF0', fontSize: 14, letterSpacing: .8, fontFamily: 'Montserrat-SemiBold'}]} secureTextEntry={true} onPress={() => navigation.navigate('Reset Password')}>Forgot password?</Text>
                        </View>

                        <Gap height={39}/>
                        {
                            isLoading ? <Text style={styles.btnPrimary}>Loading</Text> : (
                            <TouchableOpacity style={styles.btnPrimary} onPress={login}>
                                <Text style={styles.btnPrimary}>Log In</Text>
                            </TouchableOpacity>
                            )
                        }
                        
                
                        <Gap height={46}/>
                    </View>
                    ) : <ActivityIndicator/>
                    }
                    
                
            </ScrollView>
        </ImageBackground>
    </LinearGradient>
  )
}

export default LoginScreen

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
        borderRadius: 15,
        height: 50,
        fontSize: 16,
        paddingHorizontal: 16,
        color: Colors.dark,
        backgroundColor: '#eee',
        fontFamily: 'Montserrat-SemiBold'
    },
    btnPrimary: {
        borderRadius: 15,
        color: '#515151',
        backgroundColor: '#EEEEEE',
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