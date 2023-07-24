import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState} from 'react'
import { PropertyAction } from '../actions';
import PropertiCardBlock from './PropertiCardBlock';
import { UPLOAD_URL, Rp } from '../constant';


const TipeBangunanProperty = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [properties, setProperties] = useState([]);

    const getProperties = async() => {
        try {
            const response = await PropertyAction.get({
                paginate: props.perPage ?? 2,
                tipe_bangunan: props.tipeBangunan ?? ''
            });
            setProperties(response.data);
        }catch(error) {
            console.error(error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(  () => {
        getProperties();
    }, [])

    const propertyThumbnail = (image) => {
        return {
            uri: UPLOAD_URL + '/' + image
        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>

        {
            isLoading ? <ActivityIndicator/> : properties.map((property, index) => {
                return (<PropertiCardBlock 
                    title={property.title} 
                    key={index} 
                    image={propertyThumbnail(property.thumbnail)} 
                    location={property.kota  ? property.kota.nama : ''}
                    price={Rp(property.harga)}
                    listrik={property.listrik}
                    luas_bangunan={property.luas_bangunan}
                    jumlah_kamar={property.kamar_tidur}
                    jumlah_kamar_mandi={property.kamar_mandi}
                    sertifikat={property.sertifikat}
                    tipe_listing={property.tipe_listing}
                    tipe_bangunan={property.tipe_bangunan}
                    onPress={() => props.navigation.navigate("Detail Property", {
                        property_id: property.id
                    })}
                   />)
            })
        }
            
    </View>
  )
}

export default TipeBangunanProperty

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
        fontSize: 16
    }
})