import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import {logoSrc} from '../constant';
import Gap from '../components/Gap';
import {AuthAction} from '../actions';
import { UserContext } from '../context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {

  const state = UserContext()
  const checkUserLoggedIn = async () => {
    try {
      const user = await AuthAction.isUserloggedIn();
      if (user) {
        console.log('test')
        const response = await AuthAction.attempt(user.email, user.password);
        if (response.token && response.user) {
          state.set(response.user);

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Login Success',
            onHide: () => {},
          });

          navigation.navigate('Home');
        }
      }
      else {

        console.log('testa')
      
          //setTimeout(() => {
            //console.log('goto login')
            navigation.navigate('Login');
          //}, 3000);
        //});
      }
    }
    catch(error) {
      await AsyncStorage.removeItem('@SESS_USER')
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', async () => {
      checkUserLoggedIn();
    });
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/splash.png')}
      resizeMode="cover"
      style={styles.container}></ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#13140D',
  },
});

export default SplashScreen;
