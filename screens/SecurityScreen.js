import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderWithBackButton, Gap, Loading } from '../components'
import { Colors } from '../constant'
import { useHookstate } from '@hookstate/core'
import { UserContext } from '../context'
import { UserAction } from '../actions'

import Toast from 'react-native-toast-message';

const SecurityScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const userContext = UserContext();
  const passwordState = useHookstate({
    user_id: '',
    current_password:  '',
    new_password: '',
    new_repassword: ''
  })

  const setValue = async(key, value) => {
    passwordState[key].set(value);
  }

  useEffect(() => {
    passwordState.user_id.set(userContext.get().id)
  })

  const updatePassword = async() => {
    setLoading(true)
    try {
      const request = await UserAction.changePassword(passwordState.get())
      Toast.show({
        type: 'success',
        text1: 'Information',
        text2: 'Berhasil memperbaharui'
      });
    }
    catch(error){
      let errors = error.response.data.errors;
      for(let err in errors)
      {
        let messages = errors[err];
        console.log(messages)
        messages.map((message, index) => {
          Toast.show({
            type: 'error',
            text1: 'Peringatan',
            text2: message
          });
        })
      }
      
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      
      <Gap height={20}/>
      <HeaderWithBackButton title="Keamanan" onPress={() => navigation.goBack()}/>
      <Gap height={40}/>
      {
        isLoading ? <Loading/> : 
        <View>
          <View>
            <Text style={styles.formLabel}>Password Sekarang</Text>
            <TextInput style={styles.formControl} onChangeText={text => setValue('current_password', text)}/>
          </View>
          <Gap height={20}/>
          <View>
            <Text style={styles.formLabel}>Password Baru</Text>
            <TextInput style={styles.formControl} onChangeText={text => setValue('new_password', text)}/>
          </View>
          <Gap height={20}/>
          <View>
            <Text style={styles.formLabel}>Konfirmasi Password Baru</Text>
            <TextInput style={styles.formControl} onChangeText={text => setValue('new_repassword', text)}/>
          </View>
          <Gap height={20}/>
          <Text style={styles.btnPrimary} onPress={()=> updatePassword()}>Update Kata Sandi</Text>
        </View>
      }
      
    </ScrollView>
  )
}

export default SecurityScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontWeight: '500',
    fontSize: 18, 
    color: Colors.dark
  },
  separator: {
    borderBottomWidth: 1, borderBottomColor: Colors.muted
  },
  formLabel: {
    fontSize: 12,
    color: Colors.dark,
    fontWeight: 'bold',
    marginBottom: 5
  },
  formControl: {
    borderColor: Colors.muted,
    borderRadius: 10,
    backgroundColor: Colors.light,
    paddingHorizontal: 16,
    height: 40,
    color: Colors.dark
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    color: '#fff',
    borderRadius: 10,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})