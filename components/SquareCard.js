import { View, Text, TouchableOpacity, Image, } from 'react-native'
import React from 'react'
import Gap from './Gap'

const SquareCard = (props) => {
  return (
    <TouchableOpacity style={{justifyContent: 'center', marginRight: 16}} onPress={props.onPress}>
        <Image source={{
          uri: props.image
        }} style={{ width: 140, height: 140,  borderRadius: 10 }}/>
        <Gap height={6}/>
        <Text style={{ alignSelf: 'center', color: '#222'}}>{props.name}</Text>
    </TouchableOpacity>
  )
}

export default SquareCard;