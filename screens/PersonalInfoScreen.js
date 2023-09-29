import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';

// library
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Gap, HeaderWithBackButton, Loading} from '../components';
import {BASE_URL, Colors, UPLOAD_URL, Countries} from '../constant';
import {CountryContext, UserContext} from '../context';
import {UserAction, AuthAction} from '../actions';
import * as ImagePicker from 'react-native-image-picker';

import {useHookstate} from '@hookstate/core';

import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

const PersonalInfoScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [previewThumbnail, setPreviewThumbnail] = useState('');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const userState = UserContext();
  const countryContext = CountryContext();
  const personalInfoState = useHookstate({
    id: '',
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    dob: null,
    address: null,
    photo: null,
    country: null
  });

 

  const updateProfile = async () => {
    setLoading(true);
    personalInfoState.dob.set(moment(date).format('YYYY-MM-DD'))
    let fd = new FormData();
    const keys = personalInfoState.keys;
    for (let key in keys) {
      //console.log(key);
      if(keys[key] == "country") {
        fd.append(keys[key], countryContext.get());
      }else {
        fd.append(keys[key], personalInfoState[keys[key]].get());
      }
    }

    try {
      const response = await UserAction.update(fd);
      Toast.show({
        type: 'success',
        text1: 'Information',
        text2: 'Changes Saved',
      });
    } catch (error) {
      if(error.response) {
        console.log('reponse')
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      else if(error.request) {
        //console.log('request')
        //console.log(error.request)
      }
      else {
        //console.log('Error', error)
      }
      console.log('update profile error.response', error)
      console.log('update profile', error.response);
      Toast.show({
        type: 'error',
        text1: 'Peringatan',
        text2: error.response.data.message,
      });

    } finally {
      setLoading(false)
      getMyPersonalInfo()
    }
  };

  const deactiveAccount = async () => {
    setLoading(true)
    try {
      const response = await UserAction.dectiveAccount(personalInfoState.get().id);
      Toast.show({
        type: 'success',
        text1: 'Information',
        text2: 'Success to deactive account',
      });

      userState.set({})
      AuthAction.clearSess()
      navigation.popToTop()
    } catch (error) {
      if(error.response) {
        console.log('reponse')
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      else if(error.request) {
        console.log('request')
        console.log(error.request)
      }
      else {
        console.log('Error', error)
      }
      console.log('update profile error.response', error)
      console.log('update profile', error.response.data);
      Toast.show({
        type: 'error',
        text1: 'Peringatan',
        text2: error.response.data.message,
      });

    } finally {
      setLoading(false)
      getMyPersonalInfo()
    }
  };

  const confirmDeactivation = async() => {
    Alert.alert(
      'ALERT!!!',
      'You can\'t undo this action',
      [
        {
          text: 'Deactiive',
          onPress: () => deactiveAccount(),
          style: 'destructive'
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );
  };

  const setValue = async (key, value) => {
    personalInfoState[key].set(value);
  };

  const getMyPersonalInfo = async () => {
    setLoading(true);
    try {
      const response = await UserAction.me(userState.get().id);
      //const response = await UserAction.me(108);

      personalInfoState.id.set(response.id)
      personalInfoState.first_name.set(response.first_name)
      personalInfoState.last_name.set(response.last_name)
      personalInfoState.email.set(response.emmail)
      personalInfoState.phone_number.set(response.phone_number)
      personalInfoState.address.set(response.address)
      personalInfoState.country.set(response.country)
      countryContext.set(response.country)
      if(response.dob) {
        setDate(new Date(response.dob))
      }
      console.log('response.photo', BASE_URL + '/' + response.photo)
      setPreviewThumbnail(BASE_URL + '/' + response.photo);
      
      
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const includeExtra = true;
  const launchImageLibrary = () => {
    let options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra,
    };

    ImagePicker.launchImageLibrary(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('usr selected image', JSON.stringify(response));
        
        let assets = response.assets;
        
        setPreviewThumbnail(assets[0].uri);
        personalInfoState.photo.set({
          uri: assets[0].uri,
          type: assets[0].type,
          name: assets[0].fileName,
        });

      }
    });
  };

  useEffect(() => {
    getMyPersonalInfo();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
      <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
        <ImageBackground
          source={require('../assets/images/long-background.png')}
          resizeMode="cover"
          style={{width: '100%', flex: 1, height: '100%'}}>
          <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
            <Gap height={20} />
            <HeaderWithBackButton title="PROFILE" onPress={() => navigation.goBack()} />
            <Gap height={25} />
      
            {isLoading ? (
              <Loading />
            ) : (
              <View>
                <View>
                  <Text style={styles.formLabel}>FIRST NAME</Text>
                  <TextInput
                    style={styles.formControl}
                    onChangeText={text => setValue('first_name', text)}
                    value={personalInfoState.first_name.get()}
                  />
                </View>
                <Gap height={20} />

                <View>
                  <Text style={styles.formLabel}>LAST NAME</Text>
                  <TextInput
                    style={styles.formControl}
                    onChangeText={text => setValue('last_name', text)}
                    value={personalInfoState.last_name.get()}
                  />
                </View>
                <Gap height={20} />

                <View>
                  <Text style={styles.formLabel}>EMAIL</Text>
                  <TextInput
                    style={styles.formControl}
                    value={userState.get().email}
                  />
                </View>
                <Gap height={20} />

                <View>
                  <Text style={styles.formLabel}>PHONE NUMBER</Text>
                  <TextInput
                    style={styles.formControl}
                    onChangeText={text => setValue('phone_number', text)}
                    value={personalInfoState.phone_number.get()}
                  />
                </View>
                <Gap height={20} />

                <View>
                  <Text style={styles.formLabel}>DATE OF BIRTH</Text>
                  <TouchableOpacity style={{
                    borderRadius: 15,
                    backgroundColor: '#eee'
                  }} onPress={() => {
                    setOpen(true)
                  }}>
                    <Text style={{
                      borderWidth: 1,
                      borderColor: '#D9D9D9',
                      borderRadius: 15,
                      height: 50,
                      fontSize: 16,
                      paddingHorizontal: 16,
                      color: Colors.dark,
                      fontFamily: 'Montserrat-SemiBold',
                      overflow: 'hidden',
                      lineHeight: 50,
                    }}>{moment(date).format('YYYY-MM-DD')}</Text>
                  </TouchableOpacity>
                </View>
                <Gap height={20} />

                <DatePicker
                      modal
                      date={date}
                      onDateChange={setDate}
                      open={open}
                      onConfirm={(date) => {
                          setOpen(false)
                          setDate(date)
                      }}
                      onCancel={() => {
                          setOpen(false)
                      }}
                                  mode="date"
                      fadeToColor="#eee"
                      textColor="#A3A3A3"
                      style={{fontFamily: 'Montserrat-SemiBold', width: 300, borderRadius: 15}}
                  />

                <View>
                  <Text style={styles.formLabel}>ADDRESS DETAILS (Optional)</Text>
                  <TextInput
                    style={styles.formControl}
                    onChangeText={text => setValue('address', text)}
                    value={personalInfoState.address.get()}
                  />
                  <Text style={{color: '#ddd', marginTop: 2, fontFamily: 'Montserrat-SemiBold', fontSize: 12}}>This address will be used for delivery</Text>
                </View>
                <Gap height={20} />
                <View style={{width: '100%'}}>
                  <Text style={styles.formLabel}>Country</Text>
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
                      (countryContext.get()) ? 
                        Countries
                          .filter((country) => country.code == countryContext.get())
                          .map((country) => country.name
                        ) : 
                      'Select Country'
                    }
                  </Text>
                </View>
                <Gap height={20} />
                <View>
                  <Text style={styles.formLabel}>Profile</Text>

                  {previewThumbnail.length ? (
                    <TouchableOpacity
                      onPress={() => {
                        launchImageLibrary();
                      }}>
                      <Image
                        source={{uri: previewThumbnail}}
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: 10,
                          backgroundColor: '#eee',
                        }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : (
                    <Text
                      style={styles.formInputFile}
                      onPress={() => {
                        launchImageLibrary();
                      }}>
                      <Icon name={'plus'} size={16} color={Colors.dark} solid />
                    </Text>
                  )}
                </View>

                <Gap height={25}/>

                <TouchableOpacity
                  onPress={() => {
                    updateProfile();
                  }}>
                  <LinearGradient
                    colors={['#FFDD9C', '#BC893C']}
                    style={{borderRadius: 15}}>
                    <Text style={styles.btnPrimary}>Save Changes</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <Gap height={20}/>
                <TouchableOpacity
                  onPress={() => {
                    confirmDeactivation()
                  }}>
                  <LinearGradient
                    colors={['red', 'red']}
                    style={{borderRadius: 15}}>
                    <Text style={styles.btnPrimary}>Deactive Account</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <Gap height={40} />
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    color: Colors.dark,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.muted,
  },
  formLabel: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 8,
    fontFamily: 'Montserrat-SemiBold'
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
    fontFamily: 'Montserrat-SemiBold',
  },
  formInputFile: {
    width: 150,
    height: 150,
    backgroundColor: Colors.light,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 150,
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
  },
});
