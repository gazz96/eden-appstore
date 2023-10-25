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
  import moment from 'moment'
import { SafeAreaView } from 'react-native-safe-area-context';
  
  const MyRedeemScreen = ({navigation}) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);
  
    const state = UserContext();
    const getMyOrders = async () => {
      try {
        const response = await UserAction.getRedeems({
          user_id: state.get().id,
        });
        console.log('response', response);
        setOrders(response);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };

    const getPoints = async () => {
      try {
        console.log('userid', state.get().id);
        const response = await UserAction.getPoints(state.get().id);
        console.log('response', response);
        setOrders(response);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };

  
    const uploadPath = (image = '') => {
      if (image) {
        return BASE_URL + '/uploads/' + image;
      }
      return '';
    };
  
    const onRefresh = React.useCallback(() => {
      getPoints();
    }, []);
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', async () => {
        //getMyOrders();
        getPoints();
      });
    }, []);
  
    const searchOrder = () => {
      return [];
    };
  
    return (
      <SafeAreaView style={{flex: 1}}>
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
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }>
              <Gap height={20} />
              <HeaderWithBackButton
                onPress={() => navigation.goBack()}
                title={'MY REDEEM'}
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
                        
                        <Text style={{
                          color: (order.action == 'increase') ? 'green': 'red' , 
                          fontFamily: "Montserrat-SemiBold",}}>
                            {
                              (order.action == 'increase') ? '+' : '-'
                            } {order.point} Point
                        </Text>
                        <Text style={{
                          fontFamily: 'Montserrat-SemiBold'
                        }}>{moment(order.created_at).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                    </View>
                  ))
                )}
              </View>
            </ScrollView>
          </ImageBackground>
        </LinearGradient>
      </SafeAreaView>
    );
  };
  
  export default MyRedeemScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });
  