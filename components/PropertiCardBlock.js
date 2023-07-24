import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, UPLOAD_URL } from '../constant';
import Gap from './Gap';
const PropertiCardBlock = (props) => {

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
        <TouchableOpacity style={{ marginBottom: 25 }} onPress={props.onPress}>
            <ImageBackground source={props.image} resizeMode="cover" 
                imageStyle={{borderRadius: 10, flexDirection: 'row'}} 
                style={{ 
                    width: '100%', 
                    height: 160,
                    marginBottom: 8,
                    backgroundColor: Colors.light,
                    borderRadius: 10
                }}>

            {
                (props.location) ? 
                <View style={{color: '#828282', flexDirection: 'row', alignItems: 'center', marginBottom: 6, backgroundColor: Colors.primary, paddingVertical: 4, paddingHorizontal: 8, position: 'absolute', bottom: 5, left: 10, borderRadius: 3}}>
                    <Icon name={'map'} size={12} color={Colors.white} solid/>
                    <Text style={{marginLeft: 6, fontSize: 12, color: Colors.white}}>{props.location}</Text>
                </View> : <></>
            }
            

            </ImageBackground>
            <View style={{flexDirection: 'row', marginBottom: 5}}>
                {
                    props.tipe_listing ? <Text style={{backgroundColor: Colors.light, color: Colors.dark, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 3, fontSize: 12, marginRight: 8}}>Di{props.tipe_listing}</Text> : <></> 
                }
                {
                    props.tipe_bangunan ? <Text style={{backgroundColor: Colors.light, color: Colors.dark, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 3, fontSize: 12, marginRight: 8}}>{props.tipe_bangunan}</Text> : <></>
                }
                {
                    props.sertifikat ? <Text style={{backgroundColor: Colors.light, color: Colors.dark, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 3, fontSize: 12}}>{props.sertifikat}</Text> : <></> 
                }
            </View>
            <Text style={{ fontWeight: 'bold', color: Colors.dark, marginBottom: 2, fontSize: 14, height: 48}} numberOfLines={2}>{props.title}</Text>
            <View style={{flexDirection:'row'}}>
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
                    </View> : <></>
                }
                
                {
                    props.listrik ? 
                    <View style={{ backgroundColor: Colors.primary,  flexDirection: 'row', borderRadius: 3, paddingVertical: 2, paddingHorizontal: 6, marginRight: 3, alignItems: 'center' }}>
                        <Icon name={'bolt'} size={10} solid  color={Colors.white}/>
                        <Text style={{color: Colors.white, fontSize: 10, marginLeft: 2}}>{props.listrik}</Text>
                    </View> : <></>
                }
                
            </View>  
            <Gap height={5}/>
            <Text style={{color: '#E50021', fontWeight:'bold', fontSize: 14 }}>{props.price}</Text>
            <Gap height={5}/>
            {
                props.author ? 
                <View style={{flexDirection:'row',alignItems:'center', justifyContent: 'space-between', backgroundColor: Colors.light, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 8}}>

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
                </View>: <></>
            }
            
        </TouchableOpacity>
    )
}


export default PropertiCardBlock;

const styles = StyleSheet.create({
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