import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, Dimensions  } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Gap, HeaderWithBackButton } from '../components'
import { PropertyAction } from '../actions'



const windowWidth = Dimensions.get('window').width;
const PropertyGalleryScreen = ({route, navigation}) => {
    const { media_ids } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [galleries, setGalleries] = useState([]);

    const getGalleries = async() => {
        try {
            const response = await PropertyAction.getGallery(media_ids);
            setGalleries(response);
        }catch(error) {
            console.error(error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(  () => {
        getGalleries();
    }, [])


    return (
        <ScrollView style={styles.container}>
            <Gap height={20}/>
            <HeaderWithBackButton title="Gallery" onPress={() => {navigation.goBack()}}/>
            <Gap height={35}/>
            <View style={styles.row}>
            {
                isLoading ? <ActivityIndicator/> : galleries.map((gallery, index) => 
                    <View style={styles.imgWrapper} key={index}>
                    <Image source={{uri: gallery.url}} style={styles.img}/>
                    </View>
                )
            }
            </View>
            
        </ScrollView>
    )
}

export default PropertyGalleryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    imgWrapper: {},
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    img:{
        width: (windowWidth/2)-30,
        height: 160,
        borderRadius: 10,
        marginBottom: 15
    }
})