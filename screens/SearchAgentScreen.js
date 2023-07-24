import { StyleSheet, Text, View, ScrollView, Pressable, Image, ActivityIndicator, FlatList, TouchableOpacity, TextInput, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react'

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Rp, UPLOAD_URL } from '../constant';
import { PropertyAction, UserAction } from '../actions';

//Components
import { BadgeItem, Gap, HeaderWithBackButton, PropertiInlineCard } from '../components';


import { ShopContext } from '../context';

const SearchAgentScreen = ({route, navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [agents, setAgents] = useState([]);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    
    const getAgents = async(params = {}) => {
       
        setLoading(true)
        setAgents([])
   
        try {
            const response = await UserAction.agents(params)
            setAgents(response.data);
            return response.data;
        }catch(error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getAgents({
              paginate: 20,
              page: page,
              keyword: keyword
          });
      }, [navigation]);
    }, [])

    const propertyThumbnail = (image) => {
        return {
            uri: UPLOAD_URL + '/' + image
        }
    }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  
  const onRefresh = React.useCallback(() => {
    getAgents({
      paginate: 20,
      page: page,
      keyword: keyword
  });
  }, []);


  return (
    <ScrollView style={styles.container}  refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>}>
      <Gap height={20}/>
      <HeaderWithBackButton onPress={() => navigation.goBack()} title={'Cari Agent'}/>
      <Gap height={45}/>
      <View>
        <TextInput style={styles.formControl} placeholder={'Cari Agent'} onChangeText={text => setKeyword(text)} onSubmitEditing={() => {
          getAgents({
            s: keyword
          });
        }}/>
      </View>
      <Gap height={20}/>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {
        isLoading ? <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 20}}><ActivityIndicator/></View> : agents.map((agent, index) => {
          return (
            <View key={agent.id} style={{width: '100%'}}>
                <TouchableOpacity  onPress={() => navigation.navigate('Detail Agent', {
                    agent_id: agent.id
                })} style={{width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: '#f7f7f7', borderRadius: 10, overflow: 'hidden' }}>
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
                </TouchableOpacity>
                <Gap Height={20}/>
            </View>
          )
        })
      }
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    
        <TouchableOpacity onPress={() => {
            if(page > 1) {
                setPage(page => page - 1)
                getAgents({
                page: page,
                keyword: keyword
                });
            }
        }} style={styles.btnLoadMore}>
        <Icon name={'chevron-left'} size={12} solid color={'#fff'}/>
        <Text style={{color: Colors.white, marginLeft: 10}}>Sebelumnya</Text>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={() => {
            setPage(page => page + 1)
            getAgents({
              page: page,
              keyword: keyword
            });
          }} style={styles.btnLoadMore}>
          <Text style={{color: Colors.white, marginRight: 10}}>Selanjutnya</Text>
          <Icon name={'chevron-right'} size={12} solid color={'#fff'}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SearchAgentScreen

const goBack = (navigation) => {
  navigation.goBack()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor :'#fff'
  },
  btnLoadMore: {
    backgroundColor: Colors.primary, 
    color: '#fff', 
    height: 30, 
    borderRadius: 10, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    lineHeight: 30, 
    width: 120,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formControl: {
    borderColor: Colors.light,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 10,
    color: Colors.dark
  },
})