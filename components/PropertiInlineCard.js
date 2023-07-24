import { StyleSheet, Text, View, Pressable, Image, ImageBackground, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

// constant
import { Colors, UPLOAD_URL } from '../constant'

// components
import Gap from './Gap'

// library
import Icon from 'react-native-vector-icons/FontAwesome5';

const PropertiInlineCard = ( props ) => {

  const normalisasiNomorHP = (phone) => {
    phone = String(phone).trim();
    phone = (phone).replace('-', '');
    phone = (phone).replace(' ', '');
    if (phone.startsWith('08')) {
        phone = '628' + phone.slice(2);
    } else if (phone.startsWith('+62')) {
        phone = '628' + phone.slice(3);
    }
    return phone.replace(/[- .]/g, '');
  }

  const openWaUrl = (noHp, message) => {
    let url = 'https://wa.me/' + normalisasiNomorHP(noHp) + '?text=' + message;
    Linking.openURL(url);
  }

  return (
    <View>
      <Pressable onPress={props.onPress}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'relative'}}>
          <ImageBackground source={props.image} resizeMode="cover" style={{width: 120, height: 120, }} imageStyle={{ borderRadius: 10, backgroundColor: Colors.light }}>
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

                {
                  props.sertifikat ? <Text style={styles.tipeListingBadge}>{props.sertifikat}</Text> : <></>
                }
              </View>
              <Text style={{color: Colors.dark, fontWeight: 'bold', fontSize: 14, lineHeight: 18}} ellipsizeMode={'tail'} numberOfLines={2}>{props.title}</Text>
              <Gap height={2}/>
              {
                props.location ? (
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name={'map'} size={12} solid/>
                  <Text style={{ marginLeft: 6, fontSize: 12, color: Colors.dark}}>{props.location}</Text>
                </View>) : <></>
              }
              <Gap height={5}/>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {
                  props.luas_bangunan ? 
                  <View style={{ backgroundColor: Colors.primary,  flexDirection: 'row', borderRadius: 3, paddingVertical: 2, paddingHorizontal: 6, marginRight: 3, alignItems: 'center' }}>
                    <Text style={{color: Colors.white, fontSize: 10, marginLeft: 2}}>{props.luas_bangunan}m²</Text>
                  </View> : <></>
                }
                {
                  props.jumlah_kamar ? 
                  <View style={{ backgroundColor: Colors.primary,  flexDirection: 'row', borderRadius: 3, paddingVertical: 2, paddingHorizontal: 6, marginRight: 3, alignItems: 'center' }}>
                    <Icon name={'bed'} size={10} solid  color={Colors.white}/>
                    <Text style={{color: Colors.white, fontSize: 10, marginLeft: 2}}>{props.jumlah_kamar}</Text>
                  </View> : <></>
                }

                {
                  props.jumlah_kamar_mandi ? 
                  <View style={{ backgroundColor: Colors.primary,  flexDirection: 'row', borderRadius: 3, paddingVertical: 2, paddingHorizontal: 6, marginRight: 3, alignItems: 'center' }}>
                    <Icon name={'bath'} size={10} solid  color={Colors.white}/>
                    <Text style={{color: Colors.white, fontSize: 10, marginLeft: 2}}>{props.jumlah_kamar_mandi}</Text>
                  </View>: <></>
                }

                {
                  props.listrik ? 
                  <View style={{ backgroundColor: Colors.primary,  flexDirection: 'row', borderRadius: 3, paddingVertical: 2, paddingHorizontal: 6, marginRight: 3, alignItems: 'center' }}>
                    <Icon name={'bolt'} size={10} solid  color={Colors.white}/>
                    <Text style={{color: Colors.white, fontSize: 10, marginLeft: 2}}>{props.listrik}</Text>
                  </View>: <></>
                }
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center',  flexWrap: 'wrap', justifyContent: 'space-between'}}>
              <Text style={{ fontSize: 14, color: Colors.primary, fontWeight: 'bold'}} textBreakStrategy={'simple'}>{props.price}</Text>
              {
                props.review ? 
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name={'star'} color={Colors.yellow} size={14} solid/>
                  <Text style={{ marginLeft: 0, color: Colors.dark, fontWeight: 'bold'}} textBreakStrategy={'simple'}>{props.review}</Text>
                </View> : <></>
              }
              
            </View>
          </View>
        </View>
        
        {/* Contact */}
        {
          props.author ? 
          <>
            <Gap height={10}/>
            <View style={{flexDirection:'row',alignItems:'center', justifyContent: 'space-between', backgroundColor: Colors.light, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10}}>
            
              <View style={{alignItems:'center', flexDirection: 'row'}}>
                {
                  props.author.photo ? <Image source={{
                    uri: UPLOAD_URL +'/' + props.author.photo
                  }} style={{ width: 30, height: 30, borderRadius: 30, overflow:'hidden', marginRight: 10 }} resizeMode="cover"/> : <></>
                }
                <Text style={{fontSize: 12, color: Colors.dark}}>{props.author.name}</Text>
              </View>
              
              <View>
                  {
                      (props.author) ? <>
                          <View style={{flexDirection: 'row'}}>
                            {
                                (props.author) ? 
                                <View style={{ alignContent: 'center',justifyContent: 'center', textAlign: 'center'}}>
                                    <TouchableOpacity style={styles.btnContact(Colors.success)} onPress={() => openWaUrl(props.author.no_hp, `Saya ingin diskusi tentang properti '${props.id}-${props.title}'`)}>
                                        <Icon name={'whatsapp'} color={Colors.white} size={16} brand/>
                                    </TouchableOpacity>
                                </View> : <></>
                            }
                          </View>
                      </> : <></>
                  }
              </View>
            </View>
          </> : <></>
        }
        
        <Gap height={20}/>
      </Pressable>
    </View>
  )
}

export default PropertiInlineCard

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
      marginBottom: 4,
      marginRight: 4
  },
  btnContact: (color) =>  {
    return {
        flexDirection:'row',
        backgroundColor: color,
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    } 
  },
})