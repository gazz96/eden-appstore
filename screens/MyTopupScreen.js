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
  
  const MyTopupScreen = ({navigation}) => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const state = UserContext();

    const getMyOrders = async () => {
      setLoading(true)
      try {
        const response = await UserAction.getTopups({
          user_id: state.get().id,
        });

        setOrders(response.data);
        setLoading(false)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    };

  
    const onRefresh = React.useCallback(() => {
      getMyOrders()
    }, []);
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', async () => {
        getMyOrders()
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
              onPress={() => navigation.navigate('Wallet')}
              title={''}
            />
            <Gap height={25} />
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 20,
                color: '#fffff0',
              }}>
              TOPUPS
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
                    {
                      order.status == "Pending" && order.token ? <TouchableOpacity
                        onPress={() => navigation.navigate("Topup", {
                          topup: order
                      })}>
                        <Text style={{backgroundColor: '#222', borderRadius: 8, color: '#fff', padding: 15, marginTop: 20, textAlign: 'center', fontFamily: 'Montserrat-SemiBold'}}>Pay</Text>
                      </TouchableOpacity> : <></>
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
  
  export default MyTopupScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });
  