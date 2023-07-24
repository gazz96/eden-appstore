import { StyleSheet, Text, View, Pressable, Image, ImageBackground, Alert } from 'react-native'
import React from 'react'

// constant
import { Colors, Rp } from '../constant'

// components
import Gap from './Gap'

// library
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { UserContext, ShopContext } from '../context';
import { PropertyAction } from '../actions';
import Clipboard from '@react-native-clipboard/clipboard';
import { TouchableOpacity } from 'react-native';


const OrderInlineCard = ( props ) => {
  const state = UserContext();
  const navigation = useNavigation();

  const iconStatusColor = (type) => {
    type = type.toUpperCase();
    let color = Colors.secondary;

    if(type == "SUCCESS")
    {
      color = Colors.success;
    }

    if(type == "PENDING")
    {
      color = Colors.yellow;
    }

    return color;
  }

  return (
    <View>
      <Pressable onPress={props.onPress}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'relative'}}>

           <ImageBackground source={{
            uri: props.image
            }} resizeMode="cover" style={{width: 120, height: 120}} imageStyle={{ borderRadius: 10, backgroundColor: '#ccc' }}>
            {
                (props.badge) ? <Text style={styles.badge(props.badgeType)}>{props.badge}</Text> : <></>
            }
          </ImageBackground>
          
          <View style={{ paddingLeft: 14, flex: 1, justifyContent: 'space-between'}}>
            <View>
              <View style={{flexDirection:'row'}}>
                {
                  ((props.tipe_listing) ? <Text style={styles.tipeListingBadge}>DI{(props.tipe_listing).toUpperCase()}</Text> : <></>) 
                }
              </View>
              <Text style={{color: Colors.dark, fontWeight: 'bold', fontSize: 14, lineHeight: 18}} numberOfLines={2} onPress={() => {
                if(props.propertyId)
                {
                  navigation.navigate("Detail Property", {
                    property_id: props.propertyId
                  })
                }
                
              }}>{props.title}</Text>
              <Gap height={2}/>
               
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    {
                        props.date ? <Text style={{fontSize: 12}}>{props.date}</Text> : <></> 
                    }
                    {
                        props.status ? <View style={styles.status}>
                            <Icon name={'circle'} color={iconStatusColor(props.status)} size={8} solid/>
                            <Text style={styles.btnStatus(props.status)}>{props.status}</Text>
                        </View> : <></> 
                    }
                </View>

                {
                [4,5].includes(state.get().role_id) && props.user ? 
                    <>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {
                      Clipboard.setString(props.user.no_hp);
                      Alert.alert('Information', 'Nomor customer berhasil disalin')
                    }}>
                      <Text style={{ fontSize: 12, color: Colors.dark, fontWeight: 'bold', marginRight: 4}} textBreakStrategy={'simple'}>{props.user.name} {props.user.no_hp}</Text>
                      <Icon name={'copy'} color={'#222'} size={12} solid/>
                    </TouchableOpacity>
                    <Gap height={3}/>
                  </> : <></>
                }

                {
                [1].includes(state.get().role_id) && props.agent ? 
                    <>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}  onPress={() => {
                      Clipboard.setString(props.agent.no_hp);
                      Alert.alert('Information', 'Nomor agent berhasil disalin')
                    }}>

                      <Text style={{ fontSize: 12, color: Colors.dark, fontWeight: 'bold'}} textBreakStrategy={'simple'} >{props.agent.name} {props.agent.no_hp}</Text>
                    </TouchableOpacity>
                    <Gap height={3}/>
                  </> : <></>
                }
              
            </View>
            <Gap height={4}/>
            
            <View style={{ flexDirection: 'row', alignItems: 'center',  flexWrap: 'wrap', justifyContent: 'space-between'}}>
              {
                [4,5].includes(state.get().role_id) && props.closingFee ? 
                <>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', color: Colors.secondary, fontSize: 10, marginRight: 3}}>Closing Fee</Text>
                    <Text style={{ fontSize: 12, color: Colors.dark, fontWeight: 'bold'}} textBreakStrategy={'simple'}>{props.closingFee}</Text>
                  </View>
                  <Gap height={3}/>
                </>
              : <></>
              }
              {
                [4,5].includes(state.get().role_id) ? 
                <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold', color: Colors.secondary, fontSize: 10, marginRight: 3}}>Komisi(Gross)</Text>
                  <Text style={{ fontSize: 12, color: Colors.dark, fontWeight: 'bold'}} textBreakStrategy={'simple'}>{props.grossKomisi ? Rp(props.grossKomisi) : 'Belum diajukan'}</Text>
                </View>
                <Gap height={3}/>
                </> : <></>
              }
              
              <Text style={{ fontSize: 14, color: Colors.primary, fontWeight: 'bold'}} textBreakStrategy={'simple'}>{props.price}</Text>
            </View>
          </View>
        </View>
        <Gap height={10}/>
        {
          [4,5].includes(state.get().role_id) ?
        
          <View style={{flexDirection:'row'}}>
              <Text style={[styles.btnTimeline, {marginRight: 8}]} onPress={() => {
                navigation.navigate('Order Timeline', {
                  order_id: props.orderId,
                  order_status: props.status
                })
              }}>Timeline</Text>
              {
                props.grossKomisi ? <></>  : <Text style={styles.btnTimeline} onPress={() => {
                navigation.navigate('Request Comission', {
                  orderId: props.orderId
                })
              }}>Ajukan Komisi</Text>  
              }
              
          </View>
          : <></>
        }
        <View style={{flexDirection:'row'}}>
          {
              [1].includes(state.get().role_id)  && props.status == 'SUCCESS' ?  <Text style={styles.btnTimeline} onPress={() => {
              navigation.navigate('Add Review', {
                orderId: props.orderId,
              })
            }}>Review</Text> : <></>  
          }
        </View>
        
        <Gap height={20}/>
      </Pressable>
    </View>
  )
}

export default OrderInlineCard

const styles = StyleSheet.create({
  badge: (type) => {
    return {
      paddingHorizontal: 12,
      paddingVertical: 4,
      fontSize: 8,
      borderRadius: 5,
      backgroundColor: Colors.primary,
      color: Colors.white,
      position: 'absolute',
      left: 5,
      top: 7
    }
  },
  tipeListingBadge: {
    paddingHorizontal: 12,
      paddingVertical: 4,
      fontSize: 8,
      borderRadius: 5,
      backgroundColor: Colors.light,
      color: Colors.dark,
      display: 'flex',
      marginBottom: 4
  },
  status: {
    color: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  colorStatus: (type) => {
    type = type.toUpperCase();
    let color = Colors.secondary;
    if(type == "SUCCESS")
    {
      color = Colors.success;
    }

    if(type == "PENDING")
    {
      color = Colors.yellow;
    }


    return  {
        color: color
    }
  },
  btnStatus: (type) => {
    let color = Colors.secondary;
    if(type == "SUCCESS")
    {
      color = Colors.success;
    }

    if(type == "PENDING")
    {
      color = Colors.yellow;
    }
    return {
      color: color,
      marginLeft: 2, 
      fontSize: 12
    }
  },
  btnTimeline: {
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    color: Colors.white,
    backgroundColor: Colors.primary,
    fontWeight: 'bold',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 12
  }

})