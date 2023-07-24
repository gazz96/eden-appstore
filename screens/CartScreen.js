import { StyleSheet, Text, View, ScrollView, Pressable, Image, ActivityIndicator, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BASE_URL, Colors, Rp, UPLOAD_URL } from '../constant';
import { CartAction, ProductAction } from '../actions';

//Components
import { BadgeItem, Gap, HeaderWithBackButton, PropertiInlineCard } from '../components';

import { UserContext } from '../context';
import LinearGradient from 'react-native-linear-gradient';


const CartScreen = ({route, navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [carts, setCarts] = useState([]);
    const auth = UserContext();
    const getCarts = async(params = {}) => {
       
        setLoading(true)
        setCarts([])
        try {
            const response = await CartAction.list({
                user_id: auth.get().id
            })
            console.log('response', response)
            setCarts(response);
        }catch(error) {
            console.log('error', error)
        }finally{
            setLoading(false)
        }
    }

    const removeQty = async(product_id) => {
        setLoading(true)
        setCarts([])
        try {
            const response = await CartAction.remove({
                user_id: auth.get().id,
                product_id: product_id
            })
            console.log('response', response)
            setCarts(response);
        }catch(error) {
            console.log('error', error)
        }finally{
            setLoading(false)
        }
    }

    const addQty = async(product_id) => {
        setLoading(true)
        setCarts([])
        try {
            const response = await CartAction.add({
                user_id: auth.get().id,
                product_id: product_id
            })
            console.log('response', response)
            setCarts(response);
        }catch(error) {
            console.log('error', error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
      
        const unsubscribe = navigation.addListener('focus', () => {
          getCarts();
        
      }, [navigation]);
    }, [])

    const productThumbnail = (image) => {
        return {
            uri: BASE_URL + '/' + image
        }
    }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  


  return (
    <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
      <ImageBackground source={require('../assets/images/long-background.png')} resizeMode="cover" style={{width: '100%', flex: 1, height: '100%'}}>
        <ScrollView style={styles.container} onScroll={({nativeEvent}) => {
        }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Gap height={20}/>
            <HeaderWithBackButton onPress={() => goBack(navigation)} title={''}/>
            <Gap height={25}/>
            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20, color: '#fffff0'}}>CART</Text>
            <Gap height={31}/>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {
              isLoading ? <ActivityIndicator/> : carts.map((cart, index) => {
                return (
                
                <TouchableOpacity key={cart.product.id} style={{ width: '50%', marginBottom: 20, paddingRight: 8 }} onPress={() => {
                  navigation.navigate('Detail Product', {
                    productId: cart.product.id
                  })
                }}>
                  <View style={{ borderColor: 'rgba(255, 221, 156, 1)', borderWidth: 2, borderRadius: 5 }}>
                    <Image source={productThumbnail(cart.product.thumbnail)} style={{width: '100%', height: 115}} resizeMode="cover"/>
                    <View style={{backgroundColor: '#30312D', padding: 11, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                      <Text style={{fontSize: 12, fontFamily: 'Montserrat-Bold', marginBottom: 5, color: '#fff'}}>{cart.product.name} x{Rp(cart.qty)}</Text>
                      <Text style={{fontSize: 12, fontFamily: 'Montserrat-Bold', marginBottom: 10, color: '#fff'}}>Rp {Rp(cart.product.price)}</Text>
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 24, fontFamily: 'Montserrat-Bold', marginBottom: 5, color: '#fff', marginRight: 8}} onPress={() => {
                            removeQty(cart.product_id)
                        }}>
                            -
                        </Text>
                        <Text style={{fontSize: 24, fontFamily: 'Montserrat-Bold', marginBottom: 5, color: '#fff', paddingHorizontal: 8}} onPress={() => {
                            addQty(cart.product_id)
                        }}>
                            +
                        </Text>
                      </View>
                      {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="star"/>
                        <Text style={{marginLeft: 5}}>4.9</Text>
                      </View> */}
                    </View>
                  </View>
                </TouchableOpacity>
                    
                )
              })
            }
            </View>
          </View>
          <Gap height={20}/>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => {
                setPage(page => page - 1)
                getProperties({
                  page: page,
                });
              }} style={styles.btnLoadMore}>
              <Icon name={'chevron-left'} size={12} solid color={'#fff'}/>
              <Text style={{color: Colors.white, marginLeft: 10}}>Sebelumnya</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                setPage(page => page + 1)
                getProperties({
                  page: page,
                });
              }} style={styles.btnLoadMore}>
              <Text style={{color: Colors.white, marginRight: 10}}>Selanjutnya</Text>
              <Icon name={'chevron-right'} size={12} solid color={'#fff'}/>
            </TouchableOpacity>
          </View> */}

        </ScrollView>
        {
            (carts.length > 0) ?
            <View
                style={{
                    padding: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                    style={{width: '100%'}}
                    onPress={() => {
                    //orderProduct();
                        navigation.navigate('Checkout')
                    }}>
                    <LinearGradient
                    colors={['#FFDD9C', '#BC893C']}
                    style={{borderRadius: 15}}>
                    <Text style={styles.btnPrimary}>CHECKOUT</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            :  <></>
        }
        
      </ImageBackground>
    </LinearGradient>
    
  )
}

export default CartScreen

const goBack = (navigation) => {
  navigation.goBack()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnLoadMore: {
    backgroundColor: Colors.primary, 
    color: '#fff', 
    height: 30, 
    borderRadius: 10, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    lineHeight: 30, 
    width: 120,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
})