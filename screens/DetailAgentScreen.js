import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, RefreshControl } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Gap, HeaderWithBackButton, PropertiInlineCard } from '../components'
import { UserAction, PropertyAction } from '../actions';
import { UPLOAD_URL, Colors, Rp } from '../constant';

const DetailAgentScreen = ({ route, navigation }) => {

  const {agent_id} = route.params;
  const [agent, setAgent] = useState({});
  const [properties, setProperties] = useState([]);
  const [loadingAgent, setLoadingAgent] = useState(false);
  const [loadingProperties, setLoadingProperties] = useState(false);

  
  const getAgent = async() => {
    setLoadingAgent(true);
    try{
      const response = await UserAction.detailAgent(agent_id);
      setAgent(response);
    }catch(error) {

    }finally {
      setLoadingAgent(false);
    }
    
  }

  const getProperties = async () => {{
    setLoadingProperties(true);
    try{
      const response = await PropertyAction.get({
        pemilik_property: agent_id
      });
      setProperties(response.data);
    }catch(error) {

    }finally {
      setLoadingProperties(false);
    }
  }}


  useEffect(() => {
    getAgent()
    getProperties()
  }, [])

  const onRefresh = React.useCallback(() => {
    getAgent()
    getProperties();
  }, []);
  
  
  const propertyThumbnail = (image) => {
      return {
          uri: UPLOAD_URL + '/' + image
      }
  }

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={loadingAgent} onRefresh={onRefresh}/>}>
      <Gap height={20}/>
      <HeaderWithBackButton onPress={() => navigation.goBack()} title={'Detail Agent'}/>
      <Gap height={45}/>
      {
        loadingAgent ? <ActivityIndicator/> : 
          <View style={{width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: '#f7f7f7', borderRadius: 10, overflow: 'hidden' }}>
              <Image source={propertyThumbnail(agent.photo)} style={{height: 180, width: 120}} resizeMode="cover"/>
              <View style={{padding: 20}}>
                  <Text style={{color: Colors.dark, fontWeight: 'bold', fontSize: 18}}>{agent.name}</Text>
                  <Text style={{color: Colors.dark}}>{agent.no_hp}</Text>
                  <Gap height={20}/>
                  <View>
                      <Text style={{fontSize: 16, color: '#222', marginBottom: 2}}>Listing: {agent.properties_count}</Text>
                      <Text style={{fontSize: 16, color: '#222', marginBottom: 2}}>Sewa: {agent.properties_sewa_count}</Text>
                      <Text style={{fontSize: 16, color: '#222', marginBottom: 2}}>Jual: {agent.properties_jual_count}</Text>
                  </View>
              </View>
          </View>
      }
      <View> 
        <Gap height={20}/>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#222'}}>Properties</Text>
        <Gap height={5}/>
        <View style={{flex: 1 }}>
          {
              loadingProperties ? <ActivityIndicator/> : properties.map((property,index) => (
                <PropertiInlineCard 
                  id={property.id}
                  image={propertyThumbnail(property.thumbnail)}
                  title={property.title} 
                  price={Rp(property.harga)} 
                  location={(property.kota) ? property.kota.nama: ''}
                  review={property.property_reviews}
                  key={index}
                  badge={(property.tipe_bangunan || '').toUpperCase()}
                  tipe_listing={property.tipe_listing}
                  luas_bangunan={property.luas_bangunan}
                  jumlah_kamar={property.kamar_tidur}
                  jumlah_kamar_mandi={property.kamar_tidur}
                  listrik={property.listrik}
                  onPress={() => navigation.navigate('Detail Property', {
                    property_id: property.id
                  })}
                  sertifikat={property.sertifikat}
                  
                />
                )
              )
          }     
              
        </View>
      </View>
    </ScrollView>
  )
}

export default DetailAgentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor :'#fff'
  },
})