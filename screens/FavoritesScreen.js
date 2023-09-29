import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  ImageBackground,
  Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Gap, HeaderWithBackButton, Loading } from '../components';
import OrderInlineCard from '../components/OrderInlineCard';
import { BASE_URL, Colors, Rp } from '../constant';
import { ProductAction, UserAction } from '../actions';
import { UserContext } from '../context';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyOrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [tab, setTab] = useState(1)
  const state = UserContext();

  const getMyShisha = async () => {
    setLoading(true)
    try {
      const response = await UserAction.getShishaOrders({
        user_id: state.get().id,
        per_page: 9999999,
        is_favorite: 1
      });
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getMyOrders = async () => {
    setLoading(true)
    try {
      const response = await UserAction.getOrders({
        user_id: state.get().id,
        is_favorite: 1
      });
      console.log('response data', response)
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
    setTab(1)
    tab == 1 ? getMyOrders() : getMyShisha();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setTab(1)
      tab == 1 ? getMyOrders() : getMyShisha();
    });
  }, []);

  const searchOrder = () => {
    return [];
  };

  const addToFavorite = async (order) => {
    setLoading(true)
    try {
      const response = await ProductAction.addToFavorite({
        order_id: order.id,
        user_id: order.user_id
      })
      console.log('addtofav', response)
    }
    catch (error) {
      console.log('addtofav', error.response)
    }
    finally {
      setTab(1)
      getMyOrders()
    }
  }

  const addWaitingToFavorite = async (order) => {
    setLoading(true)
    try {
      const response = await ProductAction.addWaitingToFavorite({
        waiting_id: order.id,
        user_id: order.user_id
      })
      console.log('addtofav', response)
    }
    catch (error) {
      console.log('addtofav', error.response)
    }
    finally {
      setTab(2)
      getMyShisha()
    }
  }

  const extractIngredents = (ingredients) => {
    if(!ingredients) {
      return [];
    }
    let renderHTML = [];
    ingredients.map((value, index) => {
      renderHTML.push(
        <View key={index}>
          <Text style={{color: '#222'}}>{value}</Text>
        </View>
      )
    })
    return renderHTML;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
        <ImageBackground
          source={require('../assets/images/long-background.png')}
          resizeMode="cover"
          style={{ width: '100%', flex: 1, height: '100%' }}>
          <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <Gap height={20} />
              <HeaderWithBackButton
                onPress={() => navigation.goBack()}
                title={' FAVORITES'}
              />
            </View>
            <Gap height={30} />
            <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
              <Text style={{
                width: '50%',
                color: (tab == 1 ? '#fff' : '#ccc'),
                textAlign: 'center',
                fontFamily: 'Montserrat-SemiBold'
              }} onPress={() => {
                setTab(1)
                getMyOrders()
              }}>Delivery</Text>
              <Text style={{
                width: '50%',
                color: tab == 2 ? '#fff' : '#ccc',
                textAlign: 'center',
                fontFamily: 'Montserrat-SemiBold'
              }} onPress={() => {
                setTab(2)
                getMyShisha()
              }}>Orders</Text>
            </View>
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
              {
                tab == 1 ?

                  <View>
                    {isLoading ? (
                      <ActivityIndicator style={{ color: '#fff' }} />
                    ) : (
                      orders.map((order, index) => (
                        <View
                          key={order.id}
                          style={{
                            backgroundColor: '#fff',
                            borderRadius: 15,
                            padding: 20,
                            marginBottom: 30
                          }}>

                          <TouchableOpacity
                            onPress={() => {
                              addToFavorite(order)
                            }}
                            style={{
                              color: '#222',
                              fontFamily: 'Montserrat-SemiBold',
                              fontSize: 18,
                              textAlign: 'right',
                              width: '100%',
                              flexDirection: 'row',
                              justifyContent: 'flex-end'
                            }}>
                            {
                              order.is_favorite ? <Image source={require('../assets/images/star-fill.png')} style={{ width: 25, height: 25 }} width={25} height={25} resizeMode='cover' />
                                : <Image source={require('../assets/images/star.png')} style={{ width: 25, height: 25 }} width={25} height={25} resizeMode='cover' />
                            }

                          </TouchableOpacity>

                          <Gap height={5} />
                          <Text
                            style={{
                              color: '#222',
                              fontFamily: 'Montserrat-SemiBold',
                            }} >
                            Package {order.package} -  Bowl {JSON.parse(order.details ?? "[]").length}
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

                          <View style={{ flexDirection: 'row', 'justifyContent': 'space-between' }}>
                            <TouchableOpacity
                              style={{ width: '100%', overflow: 'hidden' }}
                              onPress={() => navigation.navigate("Order Detail", {
                                order: order
                              })}>
                              <Text style={{ backgroundColor: '#222', overFlow: 'hidden', borderRadius: 8, color: '#fff', padding: 15, marginTop: 20, textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}>Detail</Text>
                            </TouchableOpacity>


                          </View>
                        </View>
                      ))
                    )}
                  </View>

                  : <></>
              }


              {
                tab == 2 ?
                  <View>
                    {isLoading ? (
                      <ActivityIndicator />
                    ) : (
                      orders.map((order, index) => (
                        <View
                          key={order.id}
                          style={{
                            backgroundColor: '#fff',
                            borderRadius: 15,
                            padding: 20,
                            marginBottom: 30
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              addWaitingToFavorite(order)
                            }}
                            style={{
                              color: '#222',
                              fontFamily: 'Montserrat-SemiBold',
                              fontSize: 18,
                              textAlign: 'right',
                              width: '100%',
                              flexDirection: 'row',
                              justifyContent: 'flex-end'
                            }}>
                            {
                              order.is_favorite ? <Image source={require('../assets/images/star-fill.png')} style={{ width: 25, height: 25 }} width={25} height={25} resizeMode='cover' />
                                : <Image source={require('../assets/images/star.png')} style={{ width: 25, height: 25 }} width={25} height={25} resizeMode='cover' />
                            }

                          </TouchableOpacity>

                          <Gap height={5} />

                          <Gap height={5} />
                          <Text
                            style={{
                              color: '#222',
                              fontFamily: 'Montserrat-SemiBold',
                            }} >
                            {order.branch.name || '-'}
                          </Text>
                          <Text
                            style={{
                              color: '#222',
                              fontFamily: 'Montserrat-SemiBold',
                              marginBottom: 10
                            }} >
                            {order.table.name ?? '-'}
                          </Text>

                          <View>
                        <Text style={{
                          color: '#222',
                          fontFamily: 'Montserrat-SemiBold',
                        }}>ITEMS</Text>
                        <Gap height={10}/>
                        {
                          (order.items).map((item, index) => (
                            <View key={index} style={{marginBottom: 10}}>
                              <Text style={{
                                color: '#222',
                                fontFamily: 'Montserrat-SemiBold',
                                width: '100%'
                                }}>{item.product.name} x{item.qty}</Text>
                                {extractIngredents(item.formatted_ingredients ?? null)}
                            </View>
                          ))
                        }
                      </View>
                      {
                        order.status == 'Paid' ? <Text style={{color: '#222', fontFamily: 'Montserrat-SemiBold'}}>+ {Rp(order.edc_collected)} EDC</Text> : <></>
                      }
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
                              Rp {Rp(order.total_product_price)}
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

                        </View>
                      ))
                    )}
                  </View> : <></>
              }

            </ScrollView>
          </View>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
