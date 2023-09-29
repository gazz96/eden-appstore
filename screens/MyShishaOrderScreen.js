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
  import React, {useEffect, useState} from 'react';
  import {Gap, HeaderWithBackButton, Loading} from '../components';
  import OrderInlineCard from '../components/OrderInlineCard';
  import {BASE_URL, Colors, Rp} from '../constant';
  import {ProductAction, UserAction} from '../actions';
  import {UserContext} from '../context';
  import LinearGradient from 'react-native-linear-gradient';
  import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
  
  const MyShishaOrderScreen = ({navigation}) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);
  
    const state = UserContext();
    const getMyOrders = async () => {
      try {
        const response = await UserAction.getShishaOrders({
          user_id: state.get().id,
          per_page: 9999999
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
  
    const addToFavorite = async(order) => {
      setLoading(true)
      try {
        const response = await ProductAction.addWaitingToFavorite({
          waiting_id: order.id, 
          user_id: order.user_id
        })
        console.log('addtofav',response)
      }
      catch(error) {
        console.log('addtofav', error.response)    
      }
      finally {
        getMyOrders()
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
              onPress={() => navigation.navigate('Dashboard')}
              title={'MY ORDERS'}
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
                        order.is_favorite  == 1?  <Image source={require('../assets/images/star-fill.png')} style={{width: 25, height: 25}} width={25} height={25} resizeMode='cover'/>
                        :  <Image source={require('../assets/images/star.png')} style={{width: 25, height: 25}} width={25} height={25} resizeMode='cover'/>
                      }
                        
                       
                    </TouchableOpacity>
                    
                    <Gap height={5} />
                    {
                      order.branch ? <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                      }} > 
                      {order.branch.name ?? '-'}
                    </Text> : <></>
                    }
                    
                    {
                      order.table ? 
                      <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                        marginBottom: 10
                      }} > 
                      Table {order.table.name ?? '-'}
                    </Text> : <></>
                    }
                    
                    
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
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
      </SafeAreaView>
    );
  };
  
  export default MyShishaOrderScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });
  