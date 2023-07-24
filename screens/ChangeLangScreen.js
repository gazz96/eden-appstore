import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'

const ChangeLangScreen = ({navigation}) => {



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
          setTimeout(() => {
            navigation.navigate('Home');
          }, 3000)
        });
    }, []);

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default ChangeLangScreen

const styles = StyleSheet.create({})