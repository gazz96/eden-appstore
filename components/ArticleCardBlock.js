import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import Gap from './Gap'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../constant';
const ArticleCardBlock = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
        <ImageBackground source={props.image} resizeMode="cover" imageStyle={{borderRadius: 10}} 
        style={{ 
            width: '100%', 
            height: 160,
            marginBottom: 8
        }}/>
        <View style={{marginBottom: 3, flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
            <Icon name={'user'} size={10} solid/>
            <Text style={{marginLeft: 3, fontSize: 12}}>{props.author.name}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={'calendar'} size={10} solid/>
            <Text style={{marginLeft: 3, fontSize: 12}}>{props.published_date}</Text>
          </View>

        </View>
        <Text style={{ fontWeight: 'bold', color: '#000', marginBottom: 2, fontSize: 14}}>{props.title}</Text>
        <Gap height={20}/>
    </TouchableOpacity>
  )
}

export default ArticleCardBlock

const styles = StyleSheet.create({})