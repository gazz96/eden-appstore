import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, logoSrc } from '../constant'
import Gap from '../components/Gap'
import { SessionAction, AuthAction } from '../actions'

import { UserContext } from '../context';

import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient'

const ResetPasswordScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('bagas.topati@gmail.com');
//   const [password, setPassword] = useState('bagast');
//   const [email, setEmail] = useState('subscribers@gmail.com');
//   const [password, setPassword] = useState('subscribers');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const state = UserContext()


  const forgotPassword = async() => {
    setLoading(true)
    try {
        const response = await AuthAction.forgetPassword(email);
        console.log('ForgotPassword', response);
        if( response.token) {
            setSending(true)
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Token sended to your email',
                onHide: () => {
                }
            });
        }
    }
    catch(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
    
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

  const createNewPassword = async() => {
    setLoading(true)

    console.log(
      'new password', {
        email: email,
        token: token, 
        password: password,
        new_password: newPassword
      }
    )
    try {
        const response = await AuthAction.newPassword({
          email: email,
          token: token, 
          password: password,
          new_password: newPassword
        });

        console.log('CreateNewPassword', response);
        
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Reset Password Success',
            onHide: () => {
            }
        });

        setToken(null)
        setPassword(null)
        setNewPassword(null)
        setEmail(null)

        navigation.navigate('Login')
       
    }
    catch(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
    
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
                            <Text style={{marginRight: 5, fontWeight: '600', color: '#A3A3A3', letterSpacing: 1, fontFamily: 'Montserrat-SemiBold'}}>Already have account?</Text>
                            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                                <Text style={{color: 'rgba(250, 205, 133, 1)', fontWeight: '600', letterSpacing: 1, fontFamily: 'Montserrat-SemiBold'}}>Click here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Gap height={40}/>
                    {!isLoading ? (
                    <View style={{ width: '100%', paddingHorizontal: 40}}>
                        <Gap height={30}/>

                        <View>
                            <TextInput style={styles.formControl} onChangeText={newEmail => setEmail(newEmail)} value={email} placeholder="Email" placeholderTextColor="#A3A3A3"/>
                        </View>

                        {
                          sending ? (
                            <>
                              <Gap height={20}/>
                              <View>
                                  <TextInput autoCapitalize='none' maxLength={5} style={styles.formControl} onChangeText={text => setToken(text)} value={token} placeholder="Input Token" placeholderTextColor="#A3A3A3"/>
                              </View>
                              

                              <Gap height={20}/>
                              <View>
                                  <TextInput autoCapitalize='none' secureTextEntry={true} style={styles.formControl} onChangeText={text => setPassword(text)} value={password} placeholder="Input New Password" placeholderTextColor="#A3A3A3"/>
                              </View>
                              
                              <Gap height={20}/>
                              <View>
                                  <TextInput autoCapitalize='none' secureTextEntry={true} style={styles.formControl} onChangeText={text => setNewPassword(text)} value={newPassword} placeholder="Re-Input New Password" placeholderTextColor="#A3A3A3"/>
                              </View>
                            </>
                          ) : <></>
                        }
                        


                        <Gap height={20}/>
                        {
                            isLoading ? <Text style={styles.btnPrimary}>Loading</Text> : (
                            <TouchableOpacity style={styles.btnPrimary} onPress={() => {
                              if(!sending) {
                                forgotPassword()
                              }else {
                                createNewPassword()
                              }
                            }}>
                                <Text style={styles.btnPrimary}>Reset Password</Text>
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

export default ResetPasswordScreen

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