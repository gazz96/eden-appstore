import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {BASE_URL, Colors} from '../constant';
import {ArticleAction} from '../actions';
import Gap from '../components/Gap';
//import HTMLView from 'react-native-htmlview'

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';
import RenderHtml from 'react-native-render-html';
import LinearGradient from 'react-native-linear-gradient';

import { ProductAction } from '../actions';
import {ActivityIndicator} from 'react-native';
import { Rp } from '../constant';
import { useHookstate } from '@hookstate/core';
import { UserContext } from '../context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import GiftAction from '../actions/GiftAction';
import { HeaderWithBackButton } from '../components';
const DetailGiftScreen = ({route, navigation}) => {

  const userState = UserContext();

  const {giftId} = route.params;
  const [product, setProduct] = useState({});
  const [isLoading, setisLoading] = useState(true);

  const thumbnail = image => {
    return {
      uri: BASE_URL + '/' + image,
    };
  };

  const getProduct = async () => {
    setisLoading(true);
    try {
      const response = await GiftAction.row(giftId);
      console.log('response', response)
      console.log('response', response.data)
      setProduct(response);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const formState = useHookstate({
    user_id: userState.get().id,
    gift_id: giftId
  })


  const orderProduct = async() => {
    try {
        const response = await GiftAction.redeem(formState.get());
        console.log(response)
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Order Success',
        });

        navigation.navigate("My Redeem")
    }
    catch(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
    
            if (error.response.status == 422 )  {
              let errors = error.response.data.errors;
              for (let err in errors) {
                console.log(err);
                for (let message in errors[err]) {
                  console.log('messagees', errors[err][message]);
                  Toast.show({
                    type: 'error',
                    text1: 'Warning',
                    text2: errors[err][message],
                });
                }
              }
            }

            if (error.response.status == 404 )  {
                let errors = error.response.data.errors;
                for (let err in errors) {
                  Toast.show({
                    type: 'error',
                    text1: 'Warning',
                    text2: errors[err],
                  });
                }
              }

          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log('error request', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: error.message,
            });
          }
    }
    finally {
        setisLoading(false)
    }
  }

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      fontSize: 18,
      fontFamily: 'Montserrat-Regular',
      color: '#fff'
    },
    p: {
        fontFamily: 'Montserrat-Regular'
    },
    h3: {
        fontFamily: 'Montserrat-SemiBold'
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const {width} = useWindowDimensions();
  return (
    <LinearGradient colors={['#272727', '#13140D']} style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/long-background.png')}
        resizeMode="cover"
        style={{width: '100%', flex: 1, height: '100%'}}>
        <ScrollView style={{flex: 1, height: '100%'}}>
          {!isLoading ? (
            <>
            <View style={{paddingHorizontal: 20}}>
             <HeaderWithBackButton onPress={() => {
              navigation.goBack()
             }} title=""/>
            </View>
            <Gap height={20}/>
              <ImageBackground
                source={thumbnail(product.thumbnail)}
                imageStyle={{}}
                style={styles.hero}>
                {/* <Pressable
                  style={{paddingHorizontal: 20, paddingVertical: 20}}
                  onPress={() => navigation.goBack()}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#fff',
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      lineHeight: 40,
                      marginTop: 30
                    }}>
                    <Image
                      source={require('../assets/images/arrow-right.png')}
                    />
                  </View>
                </Pressable> */}
              </ImageBackground>
              <View style={styles.container}>
                <Text style={styles.title}>{product.name}</Text>
                <Gap height={20} />
                <Text style={styles.title}>{Rp(product.point)}</Text>
                <Gap height={34} />
                {/* <Text style={{color: '#838282', lineHeight: 32, fontSize: 14, fontFamily: 'Montserrat-Regular'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue sollicitudin volutpat pellentesque urna a, accumsan. Turpis turpis nec odio hendrerit quam gravida ac semper.</Text> */}
                {/* <HTMLView value={ article.post_content}/> */}
                <RenderHtml
                    contentWidth={width}
                    source={{
                        html: product.detail
                    }}
                    enableExperimentalMarginCollapsing={true}
                    renderersProps={{
                        img: {
                            enableExperimentalPercentWidth: true
                        }
                    }}
                    tagsStyles={tagsStyles}
                    />
              </View>
            </>
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
        <View
          style={{
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{width: '100%'}} onPress={() => {
            orderProduct();
          }}>
            <LinearGradient
              colors={['#FFDD9C', '#BC893C']}
              style={{borderRadius: 15}}>
              <Text style={styles.btnPrimary}>Redeem Now</Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              backgroundColor: '#30312D',
              width: '18%',
              borderRadius: 8,
              textAlign: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#FFDD9C',
              borderWidth: 1,
            }}>
            <Icon name="heart" size={24} />
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

export default DetailGiftScreen;

const styles = StyleSheet.create({
  hero: {
    height: 400,
  },
  title: {
    fontSize: 20,
    color: '#FFFFF0',
    letterSpacing: 0.8,
    fontFamily: 'Montserrat-Bold',
  },
  container: {
    padding: 30,
    width: '100%',
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
