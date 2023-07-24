import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, HeaderWithBackButton, Loading} from '../components';
import OrderInlineCard from '../components/OrderInlineCard';
import {BASE_URL, Colors, Rp} from '../constant';
import {UserAction} from '../actions';
import {UserContext} from '../context';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';

const MyReservationScreen = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const state = UserContext();
  const getMyReservation = async () => {
    try {
      const response = await UserAction.reservations({
        user_id: state.get().id,
      });
      setOrders(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async(reservation_id) => {
    setLoading(true)
    try {
      const response = await UserAction.cancelReservation({
        user_id: state.get().id, 
        id: reservation_id
      });

      console.log('cancel reservation', response);
    }
    catch(error){
      console.log('cancel reservation', error.response.data);

    }
    finally {
      getMyReservation()
      setLoading(false)
    }
  }

  const uploadPath = (image = '') => {
    if (image) {
      return BASE_URL + '/uploads/' + image;
    }
    return '';
  };

  const onRefresh = React.useCallback(() => {
    getMyReservation();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getMyReservation();
    });
  }, []);

  const searchOrder = () => {
    return [];
  };

  return (
    <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
      <ImageBackground
        source={require('../assets/images/long-background.png')}
        resizeMode="cover"
        style={{width: '100%', flex: 1, height: '100%'}}>
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 20,
          }}
          scrollIndicatorInsets={{ right: 1}}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }>
          <Gap height={20} />
          <HeaderWithBackButton
            onPress={() => navigation.goBack()}
            title={' MY RESERVATIONS'}
          />
          <Gap height={25} />

          {/* <TextInput placeholder='Cari pesanan' style={{
            color: '#222',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingVertical: 10
          }} onChangeText={newText => setKeyword(newText)} onEndEditing={() => {
            getMyOrders();
          }}/> */}
          <Gap height={20} />
          <View>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              orders.map((order, index) => (
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    padding: 20,
                    marginBottom: 30
                  }} key={order.id}>
                  <Text
                    style={{
                      color: '#222',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 18,
                    }}>{order.first_name} {order.last_name}
                  </Text>
                  
                  <Gap height={5} />
                  <Text
                    style={{
                      color: '#222',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    In {order.branch.name}
                  </Text>
                  <Gap height={5} />
                  <Text
                    style={{
                      color: '#222',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {order.phone}
                  </Text>
                  <Gap height={5} />
                  <Text
                    style={{
                      color: '#222',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    Note: {order.desecription ?? '-'}

                  </Text>
                  <Gap height={5} />
                  <Text
                    style={{
                      color: '#222',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {order.status}
                  </Text>
                  <Gap height={5} />

                  <Gap height={20} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 16
                      }}>
                      Guest {order.number_of_guest}
                    </Text>
                    <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 16
                      }}>
                      {order.reservation_date + ' ' + order.reservation_time}                        
                    </Text>
                    
                  </View>
                  <Gap height={20}/>
                  {
                    order.status == 'Process' ? 
                    <TouchableOpacity style={{width: '100%', overflow: 'hidden'}} onPress={() => {
                      cancelReservation(order.id)
                    }}>
                    <Text style={{
                      overflow: 'hidden',
                      fontFamily: 'Montserrat-SemiBold',
                      width: '100%', 'backgroundColor' : 'red', color: '#fff', borderRadius: 15, height: 50, lineHeight: 50, textAlign: 'center'}}>Cancel</Text>
                    </TouchableOpacity>
                    : <></>
                  }
                 
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default MyReservationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
