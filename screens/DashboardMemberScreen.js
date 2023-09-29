import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { Gap, HeaderWithBackButton } from '../components';
import { UserContext } from '../context';
import { BASE_URL, Rp } from '../constant';
import { AuthAction, UserAction } from '../actions';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardMemberScreen = () => {
  const navigation = useNavigation()
  const state = UserContext();
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMyProfile = async () => {
    setLoading(true)
    try {
      const response = await UserAction.me(state.get().id);
      console.log('user', response);

      setUser(response);
      setLoading(false);
    } catch (error) {
      console.log('error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getMyProfile();
    });
  }, []);

  const userState = UserContext();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
        <ImageBackground
          source={require('../assets/images/long-background.png')}
          resizeMode="cover"
          style={{ width: '100%', flex: 1, height: '100%' }}>
          <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
            <Gap height={25} />
            <HeaderWithBackButton title="MEMBER DASHBOARD" onPress={() => navigation.navigate('Home', {
              screen: 'HOME'
            })} />
            <Gap height={25} />
            {/* <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 20,
                  color: '#FFFFF0',
                }}>
                
              </Text>
              <Gap height={20} /> */}
            {
              isLoading ? <ActivityIndicator /> : <>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 90, height: 90, backgroundColor: '#FFF', borderRadius: 90 }}>
                    <Image source={{
                      uri: BASE_URL + '/' + user.photo
                    }} style={{ width: 90, height: 90, borderRadius: 90 }} resizeMode="cover" />
                  </View>
                  <View
                    style={{ padding: 15, borderRadius: 4, height: 125 }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 20,
                        color: '#fff',
                        marginBottom: 8
                      }}>
                      {user.first_name}
                    </Text>
                    {
                      (user.level == 'STANDARD') ?
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 16,
                            marginBottom: 10,
                            color: '#fff',
                            backgroundColor: '#transparent',
                            borderColor: '#fff',
                            borderWidth: 1,
                            borderRadius: 3,
                            textAlign: 'center'
                          }}>
                          {user.level}
                        </Text>
                        : <></>
                    }

                    {
                      (user.level == 'SILVER') ?
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 16,
                            marginBottom: 10,
                            color: '#C0C0C0',
                            backgroundColor: 'transparent',
                            borderColor: '#C0C0C0',
                            borderWidth: 1,
                            borderRadius: 3,
                            textAlign: 'center'
                          }}>
                          {user.level}
                        </Text>
                        : <></>
                    }

                    {
                      (user.level == 'GOLD') ?
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 16,
                            marginBottom: 10,
                            color: '#FFDD9C',
                            backgroundColor: 'transparent',
                            borderWidth: 1,
                            borderColor: '#FFDD9C',
                            borderRadius: 3,
                            textAlign: 'center'
                          }}>
                          {user.level}
                        </Text>
                        : <></>
                    }

{
                      (user.level == 'PLATINUM') ?
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 16,
                            marginBottom: 10,
                            color: '#E5E4E2',
                            backgroundColor: 'transparent',
                            borderWidth: 1,
                            borderColor: '#E5E4E2',
                            borderRadius: 3,
                            textAlign: 'center'
                          }}>
                          {user.level}
                        </Text>
                        : <></>
                    }

                    {/* <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 20, marginBottom: 6}}>
                      123 0000 1234 1234
                  </Text> */}
                    <TouchableOpacity onPress={() => {
                      navigation.navigate("Personal Info")
                    }}>
                      <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 15, color: '#fff' }}>Change profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Gap height={20} />
                <View style={{
                  flexDirection: 'row', justifyContent: 'space-between',
                  borderColor: 'rgba(255, 221, 156, 1)',
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRadius: 5,
                  padding: 10
                }}>
                  {/* <View
                  style={{
                    width: '50%',
                    paddingRight: 10,
                    height: 85,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Montserrat-SemiBold',
                      color: '#fff',
                      marginBottom: 10,
                    }}>
                    Balance
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Montserrat-SemiBold',
                      color: '#fff',
                    }}>
                    Rp. {Rp(user.balance)}
                  </Text>
                </View> */}
                  <View
                    style={{
                      borderColor: 'rgba(255, 221, 156, 1)',
                      // borderLeftWidth: 1,
                      width: '100%',
                      // paddingLeft: 10,
                      height: 85,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#fff',
                        marginBottom: 10,
                      }}>
                      EDC
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#fff',
                      }}>
                      {Rp(user.point)}
                    </Text>
                  </View>
                </View>
                <Gap height={30} />
                <View style={{}}>
                  <Text style={{
                    marginBottom: 30,
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#fff'
                  }} onPress={() => {
                    navigation.navigate("Favorite")
                  }}>Favorites</Text>

                  <Text style={{
                    marginBottom: 30,
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#fff'
                  }} onPress={() => {
                    navigation.navigate("Personal Info")
                  }}>Account details</Text>

                  <Text style={{
                    marginBottom: 30,
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#fff'
                  }} onPress={() => {
                    navigation.navigate("My Reservation")
                  }}>Reservations</Text>

                  <Text style={{
                    marginBottom: 30,
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#fff'
                  }} onPress={() => {
                    navigation.navigate("My Shisha Order")
                  }}>Orders</Text>

                  <Text style={{
                    marginBottom: 30,
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#fff'
                  }} onPress={() => navigation.navigate('My Order')}>Delivery history</Text>

                  <Text style={{
                    marginBottom: 30,
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#fff'
                  }} onPress={() => navigation.navigate('My Redeem')}>Redeems</Text>


                  <Text style={{
                    marginBottom: 30,
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#fff'
                  }} onPress={() => {
                    state.set({})
                    AuthAction.clearSess()
                    navigation.popToTop()
                  }}>Log-out</Text>
                </View>

              </>
            }

            <Gap height={30} />

          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DashboardMemberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
