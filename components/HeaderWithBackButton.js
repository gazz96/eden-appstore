import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constant'

// library
import Icon from 'react-native-vector-icons/FontAwesome';
import Gap from './Gap';

const HeaderWithBackButton = (props) => {
  return (
    <View>
      <Gap height={0}/>
      <View style={styles.header}>
          <TouchableOpacity  style={styles.backButton} onPress={props.onPress}>
            <Image source={require('../assets/images/arrow-right.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 16, color:'#fff', fontFamily: 'Montserrat-Bold'}}>{props.title}</Text> 
      </View>
    </View>
  )
}

export default HeaderWithBackButton

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
      },
    backButton: { 
        width: 40, 
        height: 40, 
        borderWidth: 1, 
        borderRadius: 40,  
        borderColor: Colors.muted, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute', 
        left: 0 ,
        backgroundColor: '#fff'
    },
})