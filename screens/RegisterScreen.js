import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Button,
  Alert,
  Linking
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, logoSrc, Countries } from '../constant';
import Gap from '../components/Gap';
import { SessionAction, AuthAction } from '../actions';
import { UserContext, CountryContext } from '../context';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import { hookstate, useHookstate } from '@hookstate/core';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';


const LoginScreen = ({ navigation }) => {
  //   const [email, setEmail] = useState('bagas.topati@gmail.com');
  //   const [password, setPassword] = useState('bagast');
  //   const [email, setEmail] = useState('subscribers@gmail.com');
  //   const [password, setPassword] = useState('subscribers');
  const [token, setToken] = useState('');
  const [isLoading, setLoading] = useState(false);
  const countryContext = CountryContext();
  const state = UserContext();

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const formState = useHookstate({
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    dob: null,
    password: null,
    password_confirmation: null,
    country: null,
    agreement: false
  });

  const openInAppBrowser = async url => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          dismissButtonStyle: 'cancel',
          animated: true,
          modalPresentationStyle: 'overFullScreen',
        });
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };



  const login = async () => {
    setLoading(true);
    try {
      formState.dob.set(moment(date).format('YYYY-MM-DD'))
      formState.country.set(countryContext.get())
      const response = await AuthAction.register(formState.get());
      state.set(response.user);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Registration Success',
      });

      formState.set({
        name: null,
        email: null,
        phone_number: null,
        dob: null,
        password: null,
        password_confirmation: null,
      });

      navigation.navigate('Home');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        if (error.response.status == 422) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
      <ImageBackground
        source={require('../assets/images/long-background.png')}
        resizeMode="cover"
        style={{ width: '100%', flex: 1, height: '100%' }}>
        <ScrollView style={{ flex: 1 }}>
          <Gap height={40} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            <Image
              source={require('../assets/images/logo-gold.png')}
              style={{ width: 92, height: 92 }}
              resizeMode="contain"
            />
            <Gap height={15} />
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                color: 'rgba(238, 238, 238, 1)',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Sign Up EDEN
            </Text>
            <Gap height={10} />
            <View
              style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text
                style={{
                  marginRight: 5,
                  fontWeight: '600',
                  color: '#A3A3A3',
                  letterSpacing: 0.8,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Already Have Account ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    color: 'rgba(250, 205, 133, 1)',
                    fontWeight: '600',
                    letterSpacing: 0.8,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Click Here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Gap height={40} />
          {!isLoading ? (
            <View style={{ width: '100%', paddingHorizontal: 40 }}>
              <Gap height={30} />
              <View style={{ width: '100%' }}>
              <Text
                  style={[styles.formControl, { textAlign: 'center', lineHeight: 50, overflow: 'hidden'}]}
                  placeholder={'Select Country'}
                  placeholderTextColor="#A3A3A3"
                  defaultValue={countryContext.get()}
                  editable={false}
                  onPress={() => {
                    navigation.navigate('Select Country')
                  }}>
                  {
                      countryContext.get() ? 
                      Countries.filter((country) => country.code == countryContext.get()).map((country) => country.name
                      ) : 
                    'Select Country'
                  }
                </Text>
              </View>
              <Gap height={26} />
              <View>
                <TextInput
                  style={styles.formControl}
                  placeholder={'First Name'}
                  placeholderTextColor="#A3A3A3"
                  onChangeText={text => formState.first_name.set(text)}
                />
              </View>
              <Gap height={26} />
              <View>
                <TextInput
                  style={styles.formControl}
                  placeholder={'Last Name'}
                  placeholderTextColor="#A3A3A3"
                  onChangeText={text => formState.last_name.set(text)}
                />
              </View>
              <Gap height={26} />
              <View>
                <TextInput
                  style={styles.formControl}
                  placeholder={'Email'}
                  placeholderTextColor="#A3A3A3"
                  onChangeText={text => formState.email.set(text)}
                />
              </View>
              <Gap height={26} />
              <View>
                <TextInput
                  style={styles.formControl}
                  placeholder={'Whatsapp Number'}
                  placeholderTextColor="#A3A3A3"
                  onChangeText={text => formState.phone_number.set(text)}
                />
              </View>
              <Gap height={26} />
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{ borderRadius: 15, backgroundColor: '#eee' }}>
                <Text style={{
                  borderRadius: 15, color: '#A3A3A3',
                  paddingHorizontal: 16,
                  height: 50, lineHeight: 50, fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                }}>Birthday <>{formState.dob.get() ? formState.dob.get() : ''}</></Text>
              </TouchableOpacity>
              <DatePicker
                modal
                date={date}
                onDateChange={setDate}
                open={open}
                onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                  formState.dob.set(moment(date).format('YYYY-MM-DD'))
                }}
                onCancel={() => {
                  setOpen(false)
                }}
                mode="date"
                fadeToColor="#eee"
                textColor="#A3A3A3"
                style={{ fontFamily: 'Montserrat-SemiBold', width: 300 }}
              />

              <Gap height={26} />
              <View>
                <TextInput
                  style={styles.formControl}
                  placeholder="Password"
                  placeholderTextColor="#A3A3A3"
                  secureTextEntry={true}
                  onChangeText={text => formState.password.set(text)}
                />
              </View>
              <Gap height={26} />
              <View>
                <TextInput
                  style={styles.formControl}
                  placeholder="Confirm Password"
                  placeholderTextColor="#A3A3A3"
                  secureTextEntry={true}
                  onChangeText={text =>
                    formState.password_confirmation.set(text)
                  }
                />
              </View>
              <Gap height={34} />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center'
                }}>
                <View style={{width: '10%'}}>
                  <Pressable onPress={()=> {
                    formState.agreement.set(!formState.get().agreement)
                  }}>
                  <CheckBox
                      tintColor="#fff"
                      tintColors={{
                        true: '#000',
                        false: '#fff',
                      }}
                      boxType='square'
                      value={formState.get().agreement}
                      style={{padding: 0}}
                      onTintColor='#fff'
                      onFillColor='#fff'
                      onCheckColor='#fff'
                    />
                    </Pressable>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '90%', paddingLeft: 10}}>
                  <Text
                    style={{
                      color: '#FFFFF0',
                      fontSize: 14,
                      letterSpacing: 0.8,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    I agree{' '}
                  </Text>
                  <Text
                    onPress={() => { openInAppBrowser('https://edenhookah.com/terms-conditions/') }}
                    style={{
                      color: '#FEC36C',
                      fontSize: 14,
                      letterSpacing: 0.8,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    terms and conditions
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFF0',
                      fontSize: 14,
                      letterSpacing: 0.8,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {' '}
                    and{' '}
                  </Text>
                  <Text
                    onPress={() => { openInAppBrowser('https://edenhookah.com/terms-conditions/') }}
                    style={{
                      color: '#FEC36C',
                      fontSize: 14,
                      letterSpacing: 0.8,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    privacy policy
                  </Text>
                </View>
              </View>

              <Gap height={35} />
              {isLoading ? (
                <Text style={styles.btnPrimary}>Loading</Text>
              ) : (
                <Pressable onPress={login} style={{
                  borderRadius: 15,
                  overflow: 'hidden'
                }}>
                  <Text style={styles.btnPrimary}>Sign Up</Text>
                </Pressable>
              )}

              <Gap height={46} />
            </View>
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  logo: {
    width: 110,
    height: 110,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  formLabel: {
    fontSize: 12,
    marginBottom: 4,
    color: '#222',
  },
  formControl: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    height: 50,
    fontSize: 16,
    paddingHorizontal: 16,
    color: Colors.dark,
    backgroundColor: '#eee',
    borderRadius: 15,
    fontFamily: 'Montserrat-SemiBold',
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
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
