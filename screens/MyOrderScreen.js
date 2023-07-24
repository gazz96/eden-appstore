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

const MyOrderScreen = ({navigation}) => {
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

  const addToFavorite = async(order) => {
    setLoading(true)
    try {
      const response = await ProductAction.addToFavorite({
        order_id: order.id, 
        user_id: order.user_id
      })
      console.log('addtofav',response)
    }
    catch(error) {
      console.log('addtofav', error.response)    
    }
    finally {
      getMyOrders()
      setLoading(false)
    }
  }

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
            onPress={() => navigation.navigate('Dashboard')}
            title={' DELIVERY HISTORY'}
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
                    backgroundColor: "#fff",
                    borderRadius: 15,
                    padding: 20,
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "#222",
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: 16,
                      }}
                    >
                      {order.status}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        addToFavorite(order);
                      }}
                      style={{
                        color: "#222",
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: 18,
                        textAlign: "right",
                        flexDirection: "row",
                      }}
                    >
                      {order.is_favorite == 1 ? (
                        <Image
                          source={require("../assets/images/star-fill.png")}
                          style={{ width: 25, height: 25 }}
                          width={25}
                          height={25}
                          resizeMode="cover"
                        />
                      ) : (
                        <Image
                          source={require("../assets/images/star.png")}
                          style={{ width: 25, height: 25 }}
                          width={25}
                          height={25}
                          resizeMode="cover"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  
                  <Gap height={8} />
                  <Text
                    style={{
                      color: "#222",
                      fontFamily: "Montserrat-SemiBold",
                    }}
                  >
                    Package {order.package} - Bowl{" "}
                    {JSON.parse(order.details ?? "[]").length}
                  </Text>
                  <Text
                    style={{
                      color: "#222",
                      fontFamily: "Montserrat-SemiBold",
                    }}
                  >
                    {order.order_date}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 16
                      }}>
                      Rp {Rp(order.amount)}
                    </Text> */}
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={{ width: "100%", overflow: "hidden" }}
                      onPress={() =>
                        navigation.navigate("Order Detail", {
                          order: order,
                        })
                      }
                    >
                      <Text
                        style={{
                          backgroundColor: "#222",
                          borderRadius: 8,
                          color: "#fff",
                          padding: 15,
                          marginTop: 20,
                          textAlign: "center",
                          fontFamily: "Montserrat-SemiBold",
                          overflow: "hidden",
                        }}
                      >
                        Detail
                      </Text>
                    </TouchableOpacity>
                    {/* {
                      order.status == "Process" && order.token ? 
                      <TouchableOpacity
                        style={{width: '49%'}}
                        onPress={() => navigation.navigate("Gateway", {
                          orderId: order.id,
                          order: order
                        })}>
                        <Text style={{backgroundColor: '#222', borderRadius: 8, color: '#fff', padding: 15, marginTop: 20, textAlign: 'center', fontFamily: 'Montserrat-SemiBold', 'overflow': 'hidden'}}>Pay</Text>
                      </TouchableOpacity> : <></>
                    } */}

                    {/* {
                      order.status == "Success" && order.token ? 
                      <TouchableOpacity
                        style={{width: '49%'}}
                        onPress={() => navigation.navigate("Timeline", {
                          order: order,
                        })}>
                        <Text style={{backgroundColor: '#222', borderRadius: 8, color: '#fff', padding: 15, marginTop: 20, textAlign: 'center', fontFamily: 'Montserrat-SemiBold'}}>Tracking</Text>
                      </TouchableOpacity> : <></>
                    } */}
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

export default MyOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
