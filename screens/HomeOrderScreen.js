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
  
  const HomeOrderScreen = ({navigation}) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);
  
    const state = UserContext();
    const getMyOrders = async () => {
      try {
        const response = await UserAction.getOrders({
          user_id: state.get().id,
        });
        setOrders(response.data);
      } catch (error) {
        console.log(error);
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
      getMyOrders();
    }, []);
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', async () => {
        getMyOrders();
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
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }>
            <Gap height={20} />
            <HeaderWithBackButton
              onPress={() => navigation.goBack()}
              title={''}
            />
            <Gap height={25} />
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 20,
                color: '#fffff0',
              }}>
              MY ORDER
            </Text>
            <Gap height={31} />
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
                      }}>
                      {order.name}
                    </Text>
                    
                    <Gap height={5} />
                    <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                      }} > 
                      {order.code} 
                    </Text>
                    <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {order.order_date}
  
                    </Text>
  
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
                        Rp {Rp(order.amount)}
                      </Text>
                      <Text
                        style={{
                          color: '#222',
                          fontFamily: 'Montserrat-SemiBold',
                          fontSize: 16
                        }}>
                        {order.status}
                      </Text>
                    </View>
  
                    <View style={{flexDirection: 'row', 'justifyContent': 'space-between'}}>
                      <TouchableOpacity
                          style={{width: '49%'}}
                          onPress={() => navigation.navigate("Order Detail", {
                            order: order
                          })}>
                          <Text style={{backgroundColor: '#222', borderRadius: 8, color: '#fff', padding: 15, marginTop: 20, textAlign: 'center', fontFamily: 'Montserrat-SemiBold'}}>Detail</Text>
                      </TouchableOpacity>
                      {
                        order.status == "Process" && order.token ? 
                        <TouchableOpacity
                          style={{width: '49%'}}
                          onPress={() => navigation.navigate("Gateway", {
                            orderId: order.id,
                            order: order
                          })}>
                          <Text style={{backgroundColor: '#222', borderRadius: 8, color: '#fff', padding: 15, marginTop: 20, textAlign: 'center', fontFamily: 'Montserrat-SemiBold'}}>Pay</Text>
                        </TouchableOpacity> : <></>
                      }
  
                      {
                        order.status == "Success" && order.token ? 
                        <TouchableOpacity
                          style={{width: '49%'}}
                          onPress={() => navigation.navigate("Timeline", {
                            order: order,
                          })}>
                          <Text style={{backgroundColor: '#222', borderRadius: 8, color: '#fff', padding: 15, marginTop: 20, textAlign: 'center', fontFamily: 'Montserrat-SemiBold'}}>Tracking</Text>
                        </TouchableOpacity> : <></>
                      }
                    </View>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    );
  };
  
  export default HomeOrderScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });
  