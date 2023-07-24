import { StyleSheet, Text, ScrollView, ImageBackground, View, TextInput, Pressable, TouchableOpacity,useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Gap, HeaderWithBackButton, Loading } from '../components'
import { Colors, UPLOAD_URL } from '../constant';
import { InductionAction } from '../actions';

import RenderHtml   from 'react-native-render-html';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';




const InductionDetailScreen = ({ route, navigation }) => {

  const renderers = {
    iframe: IframeRenderer
  };
  
  const customHTMLElementModels = {
    iframe: iframeModel
  };
  
  const {id, name} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [itemLoading, setItemLoading] = useState(true);
  const [inductions, setInductions] = useState([]);
  const [induction, setInduction] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [itemId, setItemId] = useState('');
  
  const getItem  = async(item) => {    
    setItemLoading(true)
    try {
        const response = await InductionAction.item(item)
        console.log(response)
        setInduction(response);

    }
    catch(error){
      console.log('item', error);
    }
    finally{
      setItemLoading(false)
    }
  } 

  const getItems = async() => {    
    setLoading(true)
    try {
        const response = await  InductionAction.items(id)
        setInductions(response);
    }
    catch(error){

    }
    finally{
        setLoading(false)
    }
    
  } 

  useEffect(() => {
    getItems();
  }, [])
  
  const { width } = useWindowDimensions();
  return (
    <ScrollView style={styles.container}>
        <Gap height={25}/>
        <HeaderWithBackButton title={name} onPress={() => navigation.goBack()}/>
        <Gap height={55}/>
        {
          itemLoading ? <></>: 
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: Colors.dark}}>{induction.name}</Text>
            <RenderHtml 
              staticContentMaxWidth={width}
              renderers={renderers}
              WebView={WebView}
              source={{
                  html: induction.content
              }}
              customHTMLElementModels={customHTMLElementModels}
              contentWidth={width}
              
              enableExperimentalMarginCollapsing={true}
              renderersProps={{
                  img: { enableExperimentalPercentWidth: true },
                  iframe: {
                    scalesPageToFit: true,
                    webViewProps: {
                      /* Any prop you want to pass to iframe WebViews */
                    }
                  }
              }}/>
              
              <Gap height={20}/>
            </View>
        }
        
  
        
        <Text style={{ fontWeight: 'bold', color: Colors.dark }}>Seluruh Materi</Text>
        <Gap height={10}/>
        {
            isLoading ? <Loading/> : inductions.map(induction => (
                <TouchableOpacity key={induction.id} onPress={() => getItem(induction.id)}>
                      <Text style={{ fontSize: 14, borderBottomColor: Colors.light, paddingVertical: 10, borderBottomWidth: 1 }}>{induction.name}</Text>
                </TouchableOpacity>   
            ))
        }

    </ScrollView>
  )
}

export default InductionDetailScreen

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