import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Colors, Rp, UPLOAD_URL } from '../constant'
import { Gap, PropertiInlineCard, HeaderWithBackButton } from '../components'
import { UserContext } from '../context'
import { UserAction } from '../actions'
import Toast from 'react-native-toast-message';
import { TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native';


const MyPropertiScreen = ({navigation}) => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const state = UserContext();
    const isFocused = useIsFocused();
    
    useEffect(() => {
        const getProperty = async() => {
            setLoading(true);
            try {
                const response = await UserAction.getProperty(state.get().id)
                setProperties(response.data);
                setLoading(false)
                return response.data;
            }catch(error){
                return false
            }
        }

        getProperty();
    }, [isFocused])
    
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
                <Gap height={20}/>
                <HeaderWithBackButton onPress={() => navigation.goBack(navigation)} title={'Properti Saya'}/>
                <Gap height={45}/>
                <View style={{flex: 1 }}>
                        {
                            isLoading ? <ActivityIndicator/> : properties.map((property,index) => (
                                <>
                                <View style={{width: '100%'}}>
                                    <PropertiInlineCard 
                                        key={index}
                                        image={{
                                            uri: UPLOAD_URL + '/' + property.thumbnail
                                        }} 
                                        badge={property.status}
                                        title={property.title} 
                                        price={Rp(property.harga)} 
                                        location={property.kota ? property.kota.nama : ''}
                                        review={property.property_reviews}
                                        listrik={property.listrik}
                                        luas_bangunan={property.luas_bangunan}
                                        jumlah_kamar={property.kamar_tidur}
                                        jumlah_kamar_mandi={property.kamar_mandi}
                                        sertifikat={property.sertifikat}
                                        tipe_listing={property.tipe_listing}
                                        tipe_bangunan={property.tipe_bangunan}
                                        onPress={() => {
                                            if(property.status == "Publish"){
                                                navigation.navigate("Detail Property",{
                                                    property_id: property.id
                                                })
                                            }else{
                                                Toast.show({
                                                    type: 'error',
                                                    text1: 'Peringatan',
                                                    text2: 'Properti anda belum di setujui'
                                                });
                                            }
                                        }}
                                        />
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('Edit Property',{
                                                property_id: property.id
                                            })
                                        }}>
                                            <Text style={styles.btnEdit}>EDIT</Text>
                                        </TouchableOpacity>
                                        <Gap height={20}/>
                                </View>
                                </>)
                            )
                        }     
                    
                </View>
            </ScrollView>
            {
                [4,5].includes(state.get().role_id) ?
                <View style={{paddingHorizontal: 20}}>
                    <Pressable>
                        <Text style={styles.btnPrimary} onPress={() => navigation.navigate('Add Property Group')}>
                            Tambah Properti
                        </Text>
                    </Pressable>
                    <Gap height={20}/>
                </View>
                : <></>
            }
             
        </View>
    )
}

export default MyPropertiScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor :'#fff'
    },
    btnPrimary: { 
        maxWidth: '100%', 
        height: 40, 
        paddingHorizontal: 20, 
        color: '#fff', 
        backgroundColor: Colors.primary, 
        borderRadius: 10, 
        lineHeight: 40, 
        textAlign: 'center', 
        fontWeight: 'bold'
    },
    btnEdit: { 
        maxWidth: 80, 
        height: 30, 
        paddingHorizontal: 20, 
        color: '#222', 
        backgroundColor: Colors.yellow, 
        borderRadius: 5, 
        fontSize: 10,
        lineHeight: 30, 
        textAlign: 'center', 
        fontWeight: 'bold',
        marginTop: -10
    }
})