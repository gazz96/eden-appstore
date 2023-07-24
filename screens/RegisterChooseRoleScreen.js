import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, logoSrc } from '../constant'
import Gap from '../components/Gap'


const RegisterChooseRoleScreen = ({navigation }) => {

  

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
    
        <View style={styles.container}>
            <Gap height={40}/>
            <Image source={logoSrc} style={styles.logo} resizeMode="contain"/>
            <Gap height={40}/>
            <View style={{ width: '100%'}}>
                <Text style={styles.title}>Bergabung dengan sava</Text>
                <Gap height={20}/>
                <Pressable style={{ borderRadius: 10, borderColor: '#D9D9D9', borderWidth: 2, flexDirection: 'row', padding: 10, alignItems: 'center'}} onPress={()=>{
                    navigation.navigate('Register Screen', {
                        role_id: 1
                    })  
                }}>
                    <Image source={require('../assets/images/choose-role-owner.png')} resizeMode="cover" style={{width: 75, height: 80}}/>
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontWeight:'bold',color:Colors.dark}}>Saya Customer</Text>
                        <Text style={{fontSize: 10, color: Colors.dark}}>Temukan properti idaman dengan {'\n'}harga terbaik di sava properti</Text>
                    </View>
                </Pressable>
                <Gap height={20}/>
                
                <Pressable style={{ borderRadius: 10, borderColor: '#D9D9D9', borderWidth: 2, flexDirection: 'row', padding: 10, alignItems: 'center'}} onPress={()=>{
                    navigation.navigate('Register Screen', {
                        role_id: 5
                    })  
                }}>
                    <Image source={require('../assets/images/choose-role-agent.png')} resizeMode="cover" style={{width: 75, height: 80}}/>
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontWeight:'bold',color:Colors.dark}}>Saya agen</Text>
                        <Text style={{fontSize: 10, color: Colors.dark}}>Anda dapat memiliki properti {'\n'}idaman anda bersama sava</Text>
                    </View>
                </Pressable>

                <Gap height={20}/>
                <Text style={styles.btnSecondary} onPress={() => navigation.goBack()}>Kembali</Text>
                <Gap height={40}/>
             
            </View>
        </View>
        
    </ScrollView>
  )
}

export default RegisterChooseRoleScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    logo: {
        width: 110,
        height: 110
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222'
    },
    formLabel: {
        fontSize: 12, 
        marginBottom: 4,
        color: '#222'
    },
    formControl: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    btnPrimary: {
        borderRadius: 10,
        color: '#fff',
        backgroundColor: Colors.primary,
        height: 50,
        lineHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnSecondary: {
        width: '48%',
        borderRadius: 10,
        color: '#fff',
        backgroundColor: Colors.light,
        height: 40,
        lineHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.dark,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})