import { StyleSheet, Text, View, ScrollView, TextInput, Button, Pressable, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderWithBackButton from '../components/HeaderWithBackButton'
import Gap from '../components/Gap'
import { Colors, TipeBangunan, Rp } from '../constant'

import { ShopContext } from '../context';

const SearchScreen = ({ navigation }) => {
  
  const shopSearchParams = ShopContext();

  useEffect(() => {

  })

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <ScrollView style={styles.container}>
        <Gap height={20}/>
        <HeaderWithBackButton onPress={() => navigation.goBack()} title={'Filter Properti'}/>
        <Gap height={45}/>
        <View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: Colors.dark}}>Properti</Text>
            <Gap height={8}/>
            <TextInput style={styles.formControl} placeholder={'Masukan Kata Kunci'} value={shopSearchParams.keyword.get()} onChangeText={(text) => shopSearchParams.keyword.set(text)}/>
          </View>
          
          <Gap height={20}/>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: Colors.dark}}>Kota</Text>
            <Gap height={8}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.badgeFilter]} 
                  onPress={()=> { navigation.navigate('Kota') }}>{shopSearchParams.kota.get() || 'Pilih'}</Text>
            </View>
          </View>
          <Gap height={20}/>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: Colors.dark}}>Jenis Penjualan</Text>
            <Gap height={8}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>    
                <Text style={[styles.badgeFilter, (shopSearchParams.tipe_listing.get() == '' ? styles.badgeActive : {})]} 
                  onPress={()=> {  shopSearchParams.tipe_listing.set('') }}>Semua</Text>
                <Text style={[styles.badgeFilter, (shopSearchParams.tipe_listing.get() == 'jual' ? styles.badgeActive : {})]} 
                  onPress={()=> {  shopSearchParams.tipe_listing.set('jual') }}>Dijual</Text>

                <Text style={[styles.badgeFilter, (shopSearchParams.tipe_listing.get() == 'sewa' ? styles.badgeActive : {})]}
                  onPress={()=> {shopSearchParams.tipe_listing.set('sewa')}}>Disewakan</Text>  
            </View>
          </View>
          <Gap height={20}/>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: Colors.dark}}>Tipe Bangunan</Text>
            <Gap height={8}/>
            <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>    
               <Text style={[styles.badgeFilter, (shopSearchParams.tipe_bangunan.get() == '' ? styles.badgeActive : {})]} 
                  onPress={()=>{ 
                    shopSearchParams.tipe_bangunan.set('')
                  }}>Semua</Text>
                {
                  TipeBangunan.map((tipeBangunan, index) => (<Text key={index} style={[styles.badgeFilter, (shopSearchParams.tipe_bangunan.get() == tipeBangunan ? styles.badgeActive : {})]} 
                  onPress={()=>{ 
                    shopSearchParams.tipe_bangunan.set(tipeBangunan)
                  }}>{tipeBangunan}</Text>))
                }
                
            </View>
          </View>
          <Gap height={20}/>
          <View style={{flex: 1}}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: Colors.dark}}>Rentang Harga</Text>
            <Gap height={8}/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>    
              <TextInput 
                style={[styles.formControl, styles.width50]} 
                placeholder={'Harga Terendah'} 
                onChangeText={(text)=>{shopSearchParams.harga_terendah.set(parseInt(text))}} 
                value={(shopSearchParams.harga_terendah.get())} 
                keyboardType={'numeric'}/>
              <TextInput 
                style={[styles.formControl, styles.width50]} 
                placeholder={'Harga Tertinggi'} 
                onChangeText={(text)=>{shopSearchParams.harga_tertinggi.set(parseInt(text))}} 
                value={(shopSearchParams.harga_tertinggi.get())} 
                keyboardType={'numeric'}/>
            </View>
          </View>
        </View>
        
      </ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', bottom: 0, paddingHorizontal: 20, paddingVertical: 10}}>
            <Text style={styles.btnSecondary} 
            onPress={()=>{
              shopSearchParams.setParams({
                keyword: '',
                tipe_listing: '',
                tipe_bangunan: '',
                harga_terendah: 100000,
                harga_tertinggi: 999999999999,
                kota: '',
              })
            }}>Batal</Text>
            <Text style={styles.btnPrimary} onPress={()=>navigation.goBack()}>Terapkan</Text>
      </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor :'#fff',
    position: 'relative',
    backgroundColor: '#fff'
  },
  formControl: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.muted,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    height: 40
  },
  badgeFilter:{
    borderRadius: 10, 
    backgroundColor: '#EDEDED', 
    paddingVertical: 8, 
    color: '#fff', 
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    color: '#828282'
  },
  width50: {
    width: '48%',
  },
  badgeActive: {
    backgroundColor: Colors.primary,
    color: Colors.white
  },
  btnSecondary: { 
    backgroundColor: Colors.light, 
    color: '#828282', 
    height: 40, 
    borderRadius: 10, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    lineHeight: 40, 
    width: '48%', 
    borderWidth: 1, 
    borderColor: Colors.muted 
  },
  btnPrimary: {
    backgroundColor: Colors.primary, 
    color: '#fff', 
    height: 40, 
    borderRadius: 10, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    lineHeight: 40, 
    width: '48%'
  }
})