import { View, Text } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={{ justifyContent: 'space-between' }}>
      <Text>Header Left</Text>
      <Text>Header Center</Text>
      <Text>Heder Right</Text>
    </View>
  )
}

export default Header