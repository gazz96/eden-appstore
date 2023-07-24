import { 
    StyleSheet, 
    Text,
    View, 
    ScrollView, 
    ImageBackground, 
    Pressable, 
    useWindowDimensions, 
    Image, 
    TouchableOpacity, 
    Linking,
    Share,
    ActivityIndicator,
    RefreshControl,
    Alert 
} from 'react-native'

import React, {useState, useEffect, useCallback} from 'react'
import { Colors, BASE_URL, Rp, SAVACONTACT, UPLOAD_URL } from '../constant'
import { Gap, BadgeItem, Loading } from '../components'
import { PropertyAction } from '../actions'

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker'
import Toast from 'react-native-toast-message';
import { UserContext } from '../context'
import RenderHtml from 'react-native-render-html';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import {PropertiCardBlock} from '../components'
import WebView from 'react-native-webview';
import {UserAction} from '../actions';
import { Rating } from 'react-native-ratings'


const renderers = {
  iframe: IframeRenderer
};

const customHTMLElementModels = {
  iframe: iframeModel
};

const PropertiDetailScreen = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [isLoadingRelatedProperties, setLoadingRelatedProperties] = useState(true);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReview, setReviewLoading] = useState(false);
  const userState = UserContext();
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const { height, width } = useWindowDimensions();
  const { property_id } = route.params;
  const savaWhaatsppUrl = 'https://wa.me/' +  '';

  const [property, setProperty] = useState({});

  const getProperty = async() => {
    setLoading(true)
    try {
        const response = await PropertyAction.find(property_id);
        await getRelatedProperties(response);
        setProperty(response);
    }
    catch(error) {
        Toast.show({
            type: 'error',
            text1: 'Peringatan',
            text2: 'Terjadi kesalahan'
        });
    }finally{
        setLoading(false);
    }
  }

  const getReviews = async() => {
    try {
        setReviewLoading(true);
        const response = await PropertyAction.reviews({
            property_id: property_id
        });
        
        setReviews(response);
    }
    catch(error) {
        Toast.show({
            type: 'error',
            text1: 'Peringatan',
            text2: 'Terjadi kesalahan'
        });
    }finally{
        setReviewLoading(false);
    }
  }

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

  const openShareUrl = async() => {
    try{
        const share = Share.share({
            message: `SAVA Properti | ${property.id}-${property.title} 
            https://sava.co.id/property/${property.slug}
            `,
        });
    }catch(error){}
  }

  const getRelatedProperties = async (property) => {
    setLoadingRelatedProperties(true);
    try {
        let params = {
            kota_id: property.kota_id,
            tipe_bangunan: property.tipe_bangunan,
            tipe_listing: property.tipe_listing
        }
        console.log(params);
        const response = await PropertyAction.relatedProperties(params);
        setRelatedProperties(response);
    }catch(error){
        Toast.show({
            type: 'error',
            text1: 'Peringatan',
            text2: 'Terjadi kesalahan 002'
        });
    }finally{
        setLoadingRelatedProperties(false)
    }
  }

    const createOrder = async(data) => {
        try {
            setLoading(true)
            const response = await UserAction.createOrder(data);
            Toast.show({
                type: 'info',
                text1: 'Berhasil dipesan',
                onHide: () => {       
                    navigation.navigate('My Order')
                }
            })
        }catch(error) {
            console.log(error.response.data);
        }finally {
            setLoading(false)
        }
    }
  
  let getImage = (image) => {
      return {uri: BASE_URL + '/uploads/' + image}
  }

  const openUrl = (url) => {
    Linking.openURL(url);
  }

  const onRefresh = useCallback(() => {
    getProperty()
    //getRelatedProperties()
    getReviews()
  }, []);

  useEffect(() => {
    getProperty()
    //getRelatedProperties()
    getReviews()
  }, [route])

  
  return (
    
    <View style={{flex: 1, backgroundColor: '#fff'}}>
        {
            isLoading ? <ActivityIndicator/> : 
            <>
                <ScrollView style={{flex: 1, backgroundColor: '#fff'}} contentContainerStyle={{flexGrow: 1}} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>}>
                    <ImageBackground source={getImage(property.thumbnail)} imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}} style={styles.hero}>
                        <Pressable style={{ paddingHorizontal:  20, paddingVertical: 20}} onPress={() => navigation.goBack()}>
                            <Text style={{ width: 40, height: 40, backgroundColor: '#fff', borderRadius: 40, justifyContent: 'center', textAlign: 'center', lineHeight: 40 }}>
                                <Icon name={'arrow-left'} color={Colors.dark} size={14} solid/>
                            </Text>
                        </Pressable>
                        
                        {
                            (property.gallery) ? <Text style={{
                                backgroundColor: '#fff',
                                color: Colors.dark,
                                position: 'absolute',
                                right: 10,
                                bottom: 10, 
                                borderRadius: 10,
                                paddingHorizontal: 16,
                                paddingVertical: 2,
                                fontSize: 12    
                            }} onPress={() => navigation.navigate('Property Gallery', {
                                media_ids: (property.gallery).split(",")
                            })}>{((property.gallery).split(",").length)} Gambar</Text> : <></>
                        }
                        
                        
                    </ImageBackground>
                    <View style={styles.container}>
                        <Gap height={16}/>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            
                            {
                                property.tipe_listing ? <Text style={styles.badge}>{'DI'+(property.tipe_listing || '').toUpperCase()}</Text> : <></>
                            }

                            {
                                property.tipe_bangunan ? <Text style={styles.badge}>{(property.tipe_bangunan || '').toUpperCase()}</Text> : <></>
                            }
                            
                            {
                                property.sertifikat ? <Text style={styles.badge}>{(property.sertifikat || '').toUpperCase()}</Text> : <></>
                            }
                            
                            {
                                ([4,5].includes(userState.get().role_id) && property.fee) ? 
                                <Text style={styles.badge}>Fee {property.fee}%</Text> : <></>
                            }
                            {
                                ([4,5].includes(userState.get().role_id) && property.closing_fee) ? 
                                <Text style={styles.badge}>Closing Fee {Rp(property.closing_fee)}</Text> : <></>
                            }
                        </ScrollView>
                        <Gap height={10}/>
                       
                        <Text style={styles.title}>{property.id}-{property.title}</Text>
                        <View style={{flexDirection: 'row'}}>
                            {
                                (property.kota) ? 
                                <View style={{color: Colors.secondary, flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 4, marginRight: 20}}>
                                    <Icon name={'map'} size={10} color={Colors.secondary} solid/>
                                    <Text style={{marginLeft: 4, fontSize: 12, color: Colors.secondary}}>{property.kota.nama}</Text>
                                </View> : <></>
                            }

                            <View style={{color: Colors.secondary, flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 4, marginRight: 20}}>
                                <Icon name={'calendar'} size={10} color={Colors.secondary} solid/>
                                <Text style={{marginLeft: 4, fontSize: 12, color: Colors.secondary}}>{property.publish_date}</Text>
                            </View>

                            <View style={{color: Colors.secondary, flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 4}}>
                                <Icon name={'eye'} size={10} color={Colors.secondary} solid/>
                                <Text style={{marginLeft: 4, fontSize: 12, color: Colors.secondary}}>{property.views}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {
                                property.luas_bangunan ? 
                                <View style={{ 
                                    backgroundColor: Colors.primary,  flexDirection: 'row', borderRadius: 3, paddingVertical: 4, paddingHorizontal: 12, alignItems: 'center', marginRight: 10
                                }}>
                                    <Icon name={'ruler-combined'} size={14} solid  color={Colors.white}/>
                                    <Text style={{color: Colors.white, fontSize: 16, marginLeft: 4}}>{property.luas_bangunan}m²</Text>
                                </View> : <></>
                            }
                            {
                                property.kamar_tidur ? 
                                <View style={{ backgroundColor: Colors.primary,  flexDirection: 'row', borderRadius: 3, paddingVertical: 4, paddingHorizontal: 12, alignItems: 'center', marginRight: 10  }}>
                                    <Icon name={'bed'} size={14} solid  color={Colors.white}/>
                                    <Text style={{color: Colors.white, fontSize: 16, marginLeft: 4}}>{property.kamar_tidur}</Text>
                                </View> : <></>
                            }

                            {
                                property.kamar_mandi ? 
                                <View style={{ backgroundColor: Colors.primary,  flexDirection: 'row', borderRadius: 3, paddingVertical: 4, paddingHorizontal: 12, alignItems: 'center', marginRight: 10 }}>
                                    <Icon name={'bath'} size={14} solid  color={Colors.white}/>
                                    <Text style={{color: Colors.white, fontSize: 16, marginLeft: 4}}>{property.kamar_mandi}</Text>
                                </View>: <></>
                            }

                            {
                            property.listrik ? 
                                <View style={{ backgroundColor: Colors.primary,  flexDirection: 'row', borderRadius: 3, paddingVertical: 4, paddingHorizontal: 12, alignItems: 'center', marginRight: 10 }}>
                                    <Icon name={'bolt'} size={14} solid  color={Colors.white}/>
                                    <Text style={{color: Colors.white, fontSize: 16, marginLeft: 4}}>{property.listrik}</Text>
                                </View>: <></>
                            }
                        </View>

                        <Gap height={15}/>
                        
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#E50021', fontWeight:'bold', fontSize: 18 }}>{Rp(property.harga)}</Text>
                            {
                                property.tipe_listing == 'sewa' && property.tipe_sewa ? <Text style={{marginLeft: 3,  fontSize: 12, fontWeight: 'bold'}}>/{(property.tipe_sewa).toUpperCase()}</Text> : <></>
                            }
                        </View>
                        <Gap height={20}/>
                    </View>
                    
                    <View style={[styles.contentContainer, { }]}>    
                        <Text style={{fontWeight: 'bold', color: Colors.dark, fontSize:  16}}>Deskripsi</Text>
                        <Gap height={4}/> 
                        {/* <HTMLView value={property.overview}/> */}
                        <RenderHtml
                            contentWidth={width}
                            source={{
                                html: property.overview
                            }}
                            enableExperimentalMarginCollapsing={true}
                            tagsStyles={{
                                p: {
                                    fontSize: 14,
                                    color: '#323232',
                                    marginBottom: 10
                                },
                                ul: {
                                    padding: 0,
                                    paddingLeft: 8,
                                    margin: 0, 
                                    color: '#323232',
                                },
                                ol: {
                                    padding: 0,
                                    paddingLeft: 8,
                                    margin: 0,
                                    color: '#323232',
                                },
                                h3: {
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: '#323232',
                                }
                            }}
                            renderersProps={{
                                img: { enableExperimentalPercentWidth: true }
                            }}/>
                    </View>
                    <Gap height={20}/>
                    {
                        property.fasilitas ? 
                        <View style={styles.container}>
                            <Text style={{fontWeight: 'bold', color: Colors.dark, fontSize: 16}}>Fasilitas</Text>
                            <Gap height={10}/>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                {property.fasilitas.split(',').map((fasilitas, index) => (
                                    <Text key={index} style={{ 
                                        backgroundColor: Colors.light, 
                                        borderRadius: 8, 
                                        marginBottom: 5, 
                                        paddingVertical: 4, 
                                        paddingHorizontal: 12, 
                                        marginRight: 8,
                                        color: Colors.dark
                                    }}>{fasilitas}</Text>
                                ))}
                            </View>
                            <Gap height={20}/>
                        </View> : <></>
                    }
                    
                    {
                        property.alamat ? <>
                        {
                            <View style={styles.container}>
                                <Text style={{fontWeight: 'bold', color: Colors.dark, fontSize: 16}}>Alamat</Text>
                                <Gap height={10}/>
                                <TouchableOpacity style={{borderRadius: 10, overflow:"hidden", backgroundColor: Colors.primary, padding: 0}} onPress={() => {
                                    openUrl('https://www.google.com/maps/search/' + property.alamat)                     
                                }}>
                                    <Image source={require('../assets/images/banner-map.png')} style={{ width: '100%', height: 250, borderRadius: 10, position: 'relative', backgroundColor: Colors.light}} resizeMode={'contain'}/>
                                </TouchableOpacity>
                                <Gap height={5}/>
                                <Text>{property.alamat}</Text>
                                <Gap height={20}/>
                            </View>
                        /* <View style={styles.container}>
                
                        <RenderHtml
                            renderers={renderers}
                            WebView={WebView}
                            source={{
                                html: `<iframe  referrerpolicy="no-referrer-when-downgrade" loading="lazy" class="lg-object" frameborder="0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAyiRm6kP8RChF_hQ8D2wEKPMuW1NuwQxE&q=${property.alamat}" allowfullscreen="true"></iframe>`
                            }}
                            customHTMLElementModels={customHTMLElementModels}
                            contentWidth={width}
                            
                            enableExperimentalMarginCollapsing={true}
                            renderersProps={{
                                img: { enableExperimentalPercentWidth: true },
                                iframe: {
                                    scalesPageToFit: true,
                                    webViewProps: {
                                    }
                                }
                            }}/>
                        </View>

                        <Gap Height={20}/> */}
                        </> : <></>
                    }

                    {/* Reviews */}
                    <View style={styles.container}>
                        <Text  style={{fontWeight: 'bold', color: Colors.dark, fontSize:  16}}>Reviews</Text>
                        <Gap height={10}/>
                        {
                            isLoadingReview ? <ActivityIndicator/> : (reviews.data.length > 0) ? reviews.data.map((review) => {
                                return(
                                    <View key={review.id} style={{marginBottom: 20, backgroundColor: '#fff', padding: 8, borderRadius: 5, borderColor: '#eee', borderWidth: 1}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{marginRight: 8, color: '#222', fontWeight: 'bold'}}>{review.user.name}</Text>
                                            <Rating
                                                type='star'
                                                startingValue={review.review_property_rate}
                                                defaultRating={5}
                                                imageSize={10}
                                                showRating={false}
                                            />
                                        </View>
                                        <View>
                                        <Text style={{color: Colors.dark}}>{review.review_property_message}</Text>
                                        </View>
                                    </View>
                                )
                            }) : <Text style={{color: Colors.dark}}>Belum memiliki review</Text>
                        }
                        
                    </View>
                    <Gap Height={20}/>
                    {/* Suggest Property */}
                    <View style={styles.container}>
                        <Text  style={{fontWeight: 'bold', color: Colors.dark, fontSize:  16}}>Suggest Properti</Text>
                        <Gap height={20}/>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} nestedScrollEnabled={true}>
                        {
                            isLoadingRelatedProperties ? <Loading/> : relatedProperties.map((related, index) => {
                                return (  
                                    <View style={{width: 280, marginRight: 10}} key={index} >
                                        <PropertiCardBlock 
                                            title={related.title} 
                                            image={getImage(related.thumbnail)} 
                                            location={related.kota?.nama}
                                            price={Rp(related.harga)}
                                            review={related.property_reviews}
                                            listrik={related.listrik}
                                            luas_bangunan={related.luas_bangunan}
                                            jumlah_kamar={related.kamar_tidur}
                                            jumlah_kamar_mandi={related.kamar_mandi}
                                            sertifikat={related.sertifikat}
                                            tipe_listing={related.tipe_listing}
                                            tipe_bangunan={related.tipe_bangunan}
                                            author={related.author}
                                            onPress={() => navigation.navigate("Detail Property", {
                                                property_id: related.id
                                            })}
                                        />
                                    </View>
                                )
                            })
                        }
                        </ScrollView>
                    </View>
                    <Gap height={20}/>
                </ScrollView>
                <View style={{bottom: 0}}>

                    <View style={{
                        minHeight: 50, 
                        flexDirection:'row',
                        alignItems:'center', 
                        padding: 15, 
                        paddingBottom: 25, 
                        justifyContent: 'space-between', 
                        backgroundColor: '#f7f7f7', 
                        borderTopLeftRadius: 15, 
                        borderTopRightRadius: 15,
                        shadowColor: "#000",
                        shadowOffset:{
                        width: 0,
                        height: 12,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.00,
                        elevation: 24,
                        }}> 
                        <View style={{alignItems:'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                        {
                            property.author ? <Image source={getImage(property.author.photo)} style={{ width: 40, height: 40, borderRadius: 50, overflow:'hidden', marginRight: 10 }} resizeMode="cover"/> : <></>
                        }
                        {
                            property.author ? <Text style={{fontSize: 10, marginTop: 5, textAlign: 'center', color: Colors.dark}}>{property.author.name}</Text> : <></>
                        }
                        
                        </View>
                        <View>
                            {
                                (property.author) ? <>
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            property.tipe_listing == 'jual' ? 
                                            <View style={{  flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                                                <TouchableOpacity style={styles.btnContact(Colors.primary)} onPress={ () => navigation.navigate("KPR Calculator",{
                                                        harga: property.harga
                                                    })}>
                                                    <Icon name={'calculator'} color={Colors.white} size={14} solid/>
                                                </TouchableOpacity>
                                                <Text style={{fontSize: 10, marginTop: 5, textAlign: 'center', color: Colors.dark, width: '100%'}}>KPR</Text>
                                            </View> : <></>
                                        }

                                        <View style={{  flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                                            <TouchableOpacity style={styles.btnContact(Colors.acsent)} onPress={()=>{
                                                setOpen(true)
                                            }}>
                                                <Icon name={'calendar'} color={Colors.white} size={14} solid/>
                                            </TouchableOpacity>
                                            <Text style={{fontSize: 10, marginTop: 5, textAlign: 'center', color: Colors.dark, width: '100%'}}>Visit</Text>
                                        </View>

                                        {
                                            (property.author) ? 
                                            <View style={{  flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                                                <TouchableOpacity style={styles.btnContact(Colors.success)} onPress={()=> openWaUrl(property.author.no_hp, `Saya ingin diskusi tentang properti '${property.id}-${property.title}'`)}>
                                                    <Icon name={'whatsapp'} color={Colors.white} size={16} brand/>
                                                </TouchableOpacity>
                                            <Text style={{fontSize: 10, marginTop: 5, textAlign: 'center', color: Colors.dark, width: '100%'}}>Whatsapp</Text>
                                            </View> : <></>
                                        }

                                    
                                        <View style={{  flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                                            <TouchableOpacity style={[styles.btnContact(Colors.yellow), { flexDirection: 'row', justifyContent: 'center', alignSelf: 'center'}]} onPress={()=> openShareUrl()}>
                                                <Icon name={'share'} color={Colors.white} size={16} brand/>
                                            </TouchableOpacity>

                                            <Text style={{fontSize: 10, marginTop: 5, textAlign: 'center', color: Colors.dark, width: '100%'}}>Share</Text>
                                        </View> 
                                        
                            
                                    </View>
                                </> : <></>
                            }
                        </View>
                    </View>

                    <View style={{marginTop: -10, flexDirection:'row',alignItems:'center', minHeight: 40, padding: 15, justifyContent: 'space-between',backgroundColor:'#fff', borderTopLeftRadius: 15, borderTopRightRadius: 10}}> 
                        {
                            userState.get().role_id == 1 ? <>
                            <Text style={{backgroundColor: Colors.acsent, height: 40, lineHeight: 40, textAlign: 'center', color: '#fff', borderRadius:10, width: '48%', fontWeight:'bold'}} onPress={()=>{
                                openWaUrl(property.author.no_hp, `Saya ingin diskusi tentang properti '${property.id}-${property.title}'`)
                            }}>Hubungi Kami</Text>

                            <Text style={{backgroundColor: Colors.primary, height: 40, lineHeight: 40, textAlign: 'center', color: '#fff', borderRadius:10, width: '48%', fontWeight:'bold'}} onPress={()=>{
                                 Alert.alert(
                                    "PERHATIAN!!!",
                                    "ingin memesan properti ini ? pemilik properti atau agen SAVA indonesia akan menghubungi anda.",
                                    [
                                        {
                                        text: "Cancel",
                                        style: "cancel"
                                        },
                                        { 
                                            text: "OK", onPress: () => {
                                                createOrder({
                                                    user_id: userState.get().id,
                                                    property_id: property.id
                                                });
                                            }
                                        }
                                    ]
                                    );
                                
                            }}>Pesan</Text>
                            </> : <><Text style={{backgroundColor: Colors.acsent, height: 40, lineHeight: 40, textAlign: 'center', color: '#fff', borderRadius:10, width: '48%', fontWeight:'bold'}} onPress={()=>{
                                openWaUrl(property.author.no_hp, `Saya ingin diskusi tentang properti '${property.id}-${property.title}'`)
                            }}>Hubungi Kami</Text>
                            <Text style={{backgroundColor: Colors.primary, height: 40, lineHeight: 40, textAlign: 'center', color: '#fff', borderRadius:10, width: '48%', fontWeight:'bold'}} onPress={()=>{
                                navigation.navigate('Login');
                            }}>Pesan</Text>
                            </>
                        }
                        
                        
                      
                    </View>

                </View>
                <DatePicker modal open={open}  date={date} 
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        openWaUrl( property.author.no_hp, `saya ingin melakukan visit pada properti '${property.id}-${property.title}' pada tanggal ${date}`)
                    }}
                    onCancel={() => { setOpen(false) }}/>
            </>
        }
        
    </View>
  )
}

export default PropertiDetailScreen

const styles = StyleSheet.create({
  hero: {
      height: 220
  },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.dark
  },
  container : {
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      width: '100%',
  },
  contentContainer: {
      backgroundColor: '#fafafa',
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: '100%',
  },
  btnContact: (color) =>  {
    return {
        flexDirection:'row',
        backgroundColor: color,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 30,
        borderRadius: 30,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }
  },
  badge: {
    fontSize: 10,
    marginRight: 5,
    backgroundColor: Colors.light,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: Colors.dark
  }
})