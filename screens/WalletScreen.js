import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Gap, HeaderWithBackButton} from '../components';
import {UserContext} from '../context';
import {Rp} from '../constant';
import {UserAction} from '../actions';

import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const WalletScreen = ({navigation}) => {
  const state = UserContext();
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(-1);
  const [amount, setAmount] = useState(0);
  const [topuploading, setTopupLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    getMyProfile();
    setAmount(0);
    setShow(-1);
  }, []);

  const getMyProfile = async () => {
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

  const doTopup = async () => {
    setTopupLoading(true);
    try {
      const response = await UserAction.topup({
        user_id: state.get().id,
        amount: amount,
      });

      setAmount(0);
      setShow(-1);

      console.log('response', response)

      navigation.navigate('Topup', {
        topup: response,
      });
      
    } catch (error) {
      console.log('error');
      console.log(error.response.data);
    } finally {
      setTopupLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getMyProfile();
      setAmount(0);
      setShow(-1);
    });
  }, []);

  const bottomSheetRef = useRef();

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setShow(index);
  }, []);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
        <ImageBackground
          source={require('../assets/images/long-background.png')}
          resizeMode="cover"
          style={{width: '100%', flex: 1, height: '100%'}}>
          <ScrollView
            style={{flex: 1, paddingHorizontal: 20}}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }>
            <Gap height={25} />
            <HeaderWithBackButton
              title=""
              onPress={() => navigation.navigate('Home', {
                screen: 'HOME'
              })}
            />
            <Gap height={25} />
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 20,
                color: '#FFFFF0',
              }}>
              WALLET
            </Text>
            <Gap height={40} />
            <LinearGradient
              colors={['rgba(255, 221, 156, 1)', 'rgba(188, 137, 60, 1)']}
              style={{padding: 15, borderRadius: 4, height: 125}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 20,
                  marginBottom: 10,
                  color: '#fff'
                }}>
                {user.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 20,
                  color: '#fff'
                }}>
                ID {user.id}
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 20,
                  marginBottom: 10,
                  color: '#fff'
                }}>
                {user.level}
              </Text>
              {/* <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 20}}>
                123 0000 1234 1234
              </Text> */}
            </LinearGradient>
            <Gap height={20} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  backgroundColor: '#30312D',
                  borderColor: 'rgba(255, 221, 156, 1)',
                  borderWidth: 1,
                  borderRadius: 5,
                  width: '49%',
                  padding: 10,
                  height: 85,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#fff',
                    marginBottom: 10,
                  }}>
                  BALANCE
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#fff',
                  }}>
                  Rp. {Rp(user.balance)}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#30312D',
                  borderColor: 'rgba(255, 221, 156, 1)',
                  borderWidth: 1,
                  borderRadius: 5,
                  width: '49%',
                  padding: 10,
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

            <Gap height={20} />
            <TouchableOpacity
              onPress={() => {
                setShow(1);
              }}>
              <LinearGradient
                colors={['#FFDD9C', '#BC893C']}
                style={{borderRadius: 15}}>
                <Text style={styles.btnPrimary}>TOP UP</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Gap height={20} />

            
          </ScrollView>
        </ImageBackground>
        {isLoading ? <ActivityIndicator/> :<BottomSheet
          ref={bottomSheetRef}
          index={show}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}>
          {topuploading ? <ActivityIndicator/> : 
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                textAlign: 'center',
                color: '#222',
              }}>
              TOPUP BALANCE
            </Text>
            <Gap height={20} />
            <View
              style={{
                marginBottom: 20,
              }}>
              <TextInput
                keyboardType="number-pad"
                style={{
                  backgroundColor: '#eee',
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: '#eee',
                  paddingHorizontal: 16,
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#222',
                  height: 50
                }}
                placeholder="Amount of balance"
                placeholderTextColor={'#222'}
                onChangeText={text => setAmount(text)}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                doTopup();
              }}>
              <LinearGradient
                colors={['#FFDD9C', '#BC893C']}
                style={{borderRadius: 15}}>
                  <Text style={styles.btnPrimary}>TOP UP</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          }
        </BottomSheet> }
        
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

export default WalletScreen;

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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: 'relative',
  },
});
