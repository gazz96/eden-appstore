import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { Gap, HeaderWithBackButton } from '../components'
import { Colors } from '../constant'

// library
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';
import { useEffect } from 'react';
import { PropertyAction, UserAction } from '../actions';
import { UserContext } from '../context';
import { Rating } from 'react-native-ratings';

const MyReviewScreen = ({navigation}) => {

  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const userState = UserContext();
  const getReviews = async() => {
    try {
      setLoading(true);
      const response = await UserAction.reviews({
        role_id: userState.get().role_id,
        user_id: userState.get().id
      });
      console.log('getReviews response', response)
      setReviews(response.data);
    }catch(error) {
      console.log('getReviews error', error);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    getReviews()
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Gap height={20}/>
      <HeaderWithBackButton title="Ulasan" onPress={()=>navigation.goBack()}/>
      <Gap height={40}/>
      {
        isLoading ? <ActivityIndicator/> : reviews.map((review) => {
          return (
            <View style={{ borderBottom:  Colors.light, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 10, marginBottom: 20}} key={review.id}>
              {/* <View style={{flexDirection: 'row'}}>
                <Image source={{
                  uri: 'https://images.unsplash.com/photo-1448630360428-65456885c650'
                }} style={{ width: 100, height: 100, marginRight: 8, borderColor: Colors.light, borderWidth: 1, borderRadius: 10 }} resizeMode="cover"/>
                <View>
                  <Text style={styles.subtitle}>ORDER00002</Text>
                  <Gap height={2}/>
                  <Text style={styles.title}>Dijual Apartemen Kemang Village Residence Tipe 3+1 Kamar Tidur  Kondisi Fully Furnished</Text>
                </View>
              </View>
              <Gap height={20}/> */}
              {/* <View>
                <View style={{ flexDirection:'row', alignItems:'center'}}>
                  <Text style={styles.reviewTitle}>Review Properti</Text>
                  <View style={{marginLeft: 8, flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name={'star'} size={12} color={Colors.yellow} solid/>
                    <Text style={{fontWeight:'bold', color: Colors.dark, marginLeft: 2}}>4</Text>
                  </View>
                </View>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi gravida elit viverra in.</Text>
              </View> */}
              {/* <Gap height={20}/> */}
              <View>
                <View style={{ flexDirection:'row', alignItems:'center'}}>
                  <Text style={styles.reviewTitle}>{review.user.name}</Text>
                  <View style={{marginLeft: 8, flexDirection: 'row', alignItems: 'center'}}>
                    <Rating
                        type='star'
                        startingValue={review.review_agent_rate}
                        defaultRating={5}
                        imageSize={16}
                        showRating={false}
                    />
                  </View>
                </View>
                <Text style={{color: '#222'}}>{review.review_property_message}</Text>
              </View>
            </View>
          )
        })
      }
      
    </ScrollView>
  )
}

export default MyReviewScreen

const styles = StyleSheet.create({
    container: {  
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    title: {
      fontWeight: 'bold',
      color: Colors.dark
    },
    subtitle: {
      fontWeight: 'bold',
      color: '#828282'
    },  
    reviewTitle: {
      fontWeight: 'bold',
      color: Colors.dark,
      marginBottom: 4
    }
})