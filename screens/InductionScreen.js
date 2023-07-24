import { StyleSheet, Text, ScrollView, ImageBackground, View, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Gap, HeaderWithBackButton, Loading } from '../components'
import { Colors, UPLOAD_URL } from '../constant';
import { InductionAction } from '../actions';

const InductionScreen = ({ navigation }) => {

  const [isLoading, setLoading] = useState(true);
  const [inductions, setInductions] = useState([]);
  const [keyword, setKeyword] = useState('');
  const getInductions = async() => {    
    setLoading(true)
    try {
        const response = await  InductionAction.get({
            keyword: keyword
        })
        console.log(response)
        setInductions(response);
    }
    catch(error){
        console.log('inductions', error);
    }
    finally{
        setLoading(false)
    }
    
  } 

  useEffect(() => {
    getInductions();
  }, [])

  return (
    <ScrollView style={styles.container}>
        <Gap height={25}/>
        <HeaderWithBackButton title="SAVA INDUCTION" onPress={() => navigation.goBack()}/>
        <Gap height={55}/>

        <TextInput style={styles.formControl} onChangeText={text => setKeyword(text)} value={keyword} placeholder={'Cari Program'} onSubmitEditing={()=>{
            getInductions()
        }}/>
        <Gap height={20}/>
        <Text style={{ fontWeight: 'bold', color: Colors.dark }}>Seluruh Program</Text>
        <Gap height={20}/>
        {
            isLoading ? <Loading/> : inductions.map(induction => (
                <TouchableOpacity key={induction.id} onPress={() => navigation.navigate('Induction Detail', {
                    id: induction.id,
                    name: induction.name
                })}>
                    <View style={{ flexDirection: 'row'}}>
                        <ImageBackground source={{
                            uri: UPLOAD_URL + '/' + induction.thumbnail,
                        }} style={{ width: 80, height: 80, backgroundColor: Colors.light, borderRadius: 10 }} imageStyle={{ borderRadius: 10}}></ImageBackground>
                        <View style={{ paddingLeft: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: Colors.dark }}>{induction.name}</Text>
                            <Text>{induction.itemsCount} Content</Text>
                        </View>
                    </View>
                </TouchableOpacity>   
            ))
        }

    </ScrollView>
  )
}

export default InductionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    formControl: {
        height: 40,
        borderColor: Colors.light,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16 
    }
})