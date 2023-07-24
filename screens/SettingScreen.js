import { View, Text, Pressable, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'


// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';

import HeaderWithBackButton from '../components/HeaderWithBackButton';
import { Colors, UPLOAD_URL } from '../constant';
import Gap from '../components/Gap';
import { UserContext } from '../context';
import { AuthAction } from '../actions';

const SettingScreen = ({ navigation }) => {

  const doLogout = async() => {
    await AuthAction.clearSess()
    state.setUser({});
    setTimeout(() => {
      navigation.navigate('Home')
    }, 3000)
    
  }

  const state = UserContext();
  return (
    <ScrollView style={styles.container}>
      <Gap height={25}/>
      <HeaderWithBackButton title="Settings" onPress={() => navigation.goBack()}/>
      <Gap height={55}/>
      
        
          <View style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
            {
              state.get().id && state.get().photo ? 
                <Image source={{
                  uri: UPLOAD_URL + '/' + state.get().photo
                }} style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: Colors.light}} resizeMode="cover"/>
                : 
                <View style={{ width: 80, height: 80, backgroundColor: Colors.light }}></View>
            }
            {
              state.get().id ? (
              <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Gap height={8}/>
                <Text style={{ fontWeight: 'bold', color: Colors.dark, fontSize: 14 }}>{state.get().name}</Text>
                <Text style={{color: Colors.primary}}>{state.get().email}</Text>
              </View>
              )
              : <></>
            }
            
          </View> 
      

      <Gap height={40}/>
      <Pressable style={styles.flatList} onPress={() => {navigation.navigate("Personal Info")}}>
        <Text style={{color: Colors.dark, fontWeight:'bold'}}>Informasi Personal</Text>
        <Icon name={'chevron-right'} color={Colors.dark} size={14}/>
      </Pressable>
      <Gap height={14}/>
      {
        [4,5].includes(state.get().role_id) ? 
        <>
          <Pressable style={styles.flatList} onPress={() => {navigation.navigate("My Property")}}>
            <Text style={{color: Colors.dark, fontWeight:'bold'}}>Properti Saya</Text>
            <Icon name={'chevron-right'} color={Colors.dark} size={14}/>
          </Pressable>
          <Gap height={14}/>
        </>: <></>
      }


      
      
      {/* {
        [4,5].includes(state.get().role_id) ? 
        <>
        <Pressable style={styles.flatList} onPress={() => {navigation.navigate("My Income")}}>
          <Text style={{color: Colors.dark, fontWeight:'bold'}}>Penghasilan</Text>
          <Icon name={'chevron-right'} color={Colors.dark} size={14}/>
        </Pressable>
        <Gap heigh={14}/>
        <Pressable style={styles.flatList} onPress={() => {navigation.navigate("My Withdraw")}}>
          <Text style={{color: Colors.dark, fontWeight:'bold'}}>Tarik Uang</Text>
          <Icon name={'chevron-right'} color={Colors.dark} size={14}/>
        </Pressable>
        <Gap height={14}/>
        </>
      : <></>
      } */}
      
      {
        [4,5].includes(state.get().role_id) ? 
        <>
        <Pressable style={styles.flatList} onPress={() => {navigation.navigate("My Review")}}>
          <Text style={{color: Colors.dark, fontWeight:'bold'}}>Ulasan</Text>
          <Icon name={'chevron-right'} color={Colors.dark} size={14}/>
        </Pressable>
        <Gap height={14}/>
        </>: <></>
      }
      <Pressable style={styles.flatList} onPress={() => {navigation.navigate("My Order")}}>
        <Text style={{color: Colors.dark, fontWeight:'bold'}}>Pesanan</Text>
        <Icon name={'chevron-right'} color={Colors.dark} size={14}/>
      </Pressable>
      <Gap height={14}/>
      <Pressable style={styles.flatList} onPress={() => {navigation.navigate("Account Security")}}>
        <Text style={{color: Colors.dark, fontWeight:'bold'}}>Keamanan</Text>
        <Icon name={'chevron-right'} color={Colors.dark} size={14}/>
      </Pressable>
      <Gap height={14}/>
      {
        [4,5].includes(state.get().role_id) ? 
        <Pressable style={styles.flatList} onPress={() => {navigation.navigate("Induction Program")}}>
          <Text style={{color: Colors.dark, fontWeight:'bold'}}>Sava Induction Program</Text>
          <Icon name={'chevron-right'} color={Colors.dark} size={14}/>
        </Pressable>
        :
        <></>
      }
      
      <Gap height={50}/>
      <Pressable style={{ justifyContent: 'center',  flexDirection:'row'}} onPress={()=> { 
        doLogout()
      }}>
        <Text style={{ backgroundColor: Colors.primary, height: 40, width: 150, color: '#fff', textAlign: 'center', lineHeight: 40, borderRadius: 10, fontWeight:'bold'}}>Logout</Text>
      </Pressable>
      <Gap height={50}/>
    </ScrollView>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  flatList: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: Colors.light, 
    paddingVertical: 12, 
    paddingHorizontal: 18, 
    borderRadius: 10
  }
})