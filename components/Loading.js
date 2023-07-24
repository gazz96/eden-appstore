import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}><ActivityIndicator/></View>
  )
}

export default Loading

const styles = StyleSheet.create({})