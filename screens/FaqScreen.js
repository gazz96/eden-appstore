import { StyleSheet, Text, View, ScrollView, ImageBackground, useWindowDimensions,Image, Linking } from 'react-native'
import React, { useEffect, useState  } from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { BASE_URL, Colors } from '../constant'
import { ArticleAction } from '../actions'
import Gap from '../components/Gap'
//import HTMLView from 'react-native-htmlview'

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';
import RenderHtml from 'react-native-render-html';
import LinearGradient from 'react-native-linear-gradient'
import { HeaderWithBackButton } from '../components'
import WebView from 'react-native-webview'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { SafeAreaView } from 'react-native-safe-area-context'

const FaqScreen = ({route, navigation}) => {
    //const { article } = route.params;
    let getImage = (image) => {
        return {
            uri: BASE_URL + '/uploads/' + image
        }
    }

    const openInAppBrowser = async url => {
        try {
          if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.open(url, {
              dismissButtonStyle: 'cancel',
              animated: true,
              modalPresentationStyle: 'overFullScreen',
            });
          } else {
            Linking.openURL(url);
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };

    const { width } = useWindowDimensions();
    return (
        <SafeAreaView style={{flex: 1}}>
        <LinearGradient colors={['#272727', '#13140D']} style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/images/long-background.png')} resizeMode="cover" style={{width: '100%', flex: 1, height: '100%'}}>
                <ScrollView style={{  height: '100%', paddingHorizontal: 10 }} scrollIndicatorInsets={{ right: 1 }}>
                    <Gap height={20}/>
                    <View style={{paddingHorizontal: 20}}>
                        <HeaderWithBackButton onPress={() => navigation.goBack() } title="FAQ" />
                    </View>
                    <Gap height={30}/>
                     <View style={{paddingHorizontal: 20}}>
                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'} What is the benefits of membership? </Text>
                            <Text style={[styles.description, {marginBottom: 10}]}>As a member of our loyalty program you earn EDC (EDEN COINS).</Text>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'} What are the EDEN COINS (EDC)?</Text>
                            <Text style={[styles.description, {marginBottom: 10}]}>EDC are points which you collect as a member of the EDEN Hookah Club loyalty program. {"\n"}
                            EDC can be used as a currency in EDEN and affiliates only.{"\n"}
                            EDC can be used to redeem bills or to purchase products specifically for EDEN members.</Text>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'}Which levels of membership are available?   </Text>
                            <Text style={[styles.description, {marginBottom: 10}]}>
                                The starter level is the "standard" membership: {"\n"}
                                The equivalent of collecting EDC is 5 % cash back from your bills. {"\n"}{"\n"}

                                The second level is the "silver" membership: {"\n"}
                                The equivalent of collecting EDC is 10 % cash back from your bills. {"\n"}{"\n"}

                                The second level is the "gold" membership: {"\n"}
                                The equivalent of collecting EDC is 15 % cash back from your bills.
                            </Text>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'} How to become a "silver" member?</Text>
                            <Text style={[styles.description, {marginBottom: 10}]}>To reach the "silver" status you need to spend 5.000.000 IDR in one of the Eden venues. "silver" status is equivalent to 500 EDC.
</Text>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'} How to become a "gold" member?</Text>
                            <Text style={[styles.description, {marginBottom: 10}]}>To reach the "gold" status you need to spend 15.000.000 IDR in one of the Eden venues. "gold" status is equivalent to 1.000 EDC.
</Text>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'} How can I use EDC?</Text>
                            <Text style={[styles.description, {marginBottom: 10}]}>EDC can be used to redeem your bill at EDENs venues. </Text>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'} What is the value of EDC?</Text>
                            <Text style={[styles.description, {marginBottom: 10}]}>1 EDC are equivalent to 10.000 IDR. </Text>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'} How much EDC I can spend per one time to pay my bill?</Text>
                            <Text style={[styles.description, {marginBottom: 10}]}>You can pay up to 100% of your bill with EDC.</Text>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'} Can I collect and spend EDC in MyShisha?</Text>
                            <Text style={[styles.description, {marginBottom: 10}]}>In the future we will offer the possibility to use EDC also in MyShisha.</Text>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'} What is MyShisha?</Text>
                            <Text style={[styles.description]} onPress={() => {
                                openInAppBrowser('https://myshisha.id')
                            }}>
                                MyShisha is an affiliated shisha store, which provides the full portfolio of shisha tobacco, devices and and accessories (www.myshisha.id).{"\n"}{"\n"}
                            It is located in
                            </Text>    
                            <Text style={[styles.description, {marginBottom: 10}]} onPress={() => {
                                openInAppBrowser('https://maps.app.goo.gl/KebWrsrFurgeyeej9')
                            }}>
                                JI. Raya Kerobokan No.66, {"\n"}
                                Kerobokan Kelod, {"\n"}
                                Kec. Kuta Utara, {"\n"}
                                Kabupaten Badung, {"\n"}
                                Bali 80361{"\n"}
                            </Text>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'} Where can I see my redeems?</Text>
                            <Text style={[styles.description, {marginBottom: 10}]}>You can find all your redeems in your account dashboard. You can find it on the top of your application by the right side.</Text>
                        </View>
                    

                        <View style={{marginBottom: 20}}>
                            <Text style={styles.title}>{'\u2022'} Our House Rules</Text>
                            {
                                [
                                    'PLEASE DON T ENTER EDEN WITHOUT CLOTHES (MEANS HALF-NAKED)!',
                                    'WEARING SHOES IS MANDATORY (DON T ENTER BAREFOOT)!',
                                    'PLEASE DON T PUT YOUR FEET ON THE SOFA OR CHAIRS.',
                                    'BRINGING FOOD OR BEVERAGES FROM OUTSIDE IS NOT ALLOWED.',
                                    'CIGARETTES CAN BE SMOKED IN DEFINED AREAS OR OUTSIDE.',
                                    'OUR TEAM HAS THE RIGHT TO REJECT GUESTS IF THEY ARE DRUNKEN.',
                                    'WE HAVE THE RIGHT TO CHARGE PROPERTIES, WHICH ARE BROKEN BY GUESTS.'
                                ].map((value, index) => (
                                    <Text key={index} style={[styles.description, { marginBottom: 10, fontFamily: 'Montserrat-Regular' }]}>{value}</Text>
                                ))
                            }
                            
                        </View>

                     </View>
                     <Image 
                                source={require('../assets/images/footer-faq.png')} 
                                style={{width: '100%', height: 200}} 
                                resizeMode='contain'/>

                   
                </ScrollView>
            </ImageBackground>
        </LinearGradient>
        </SafeAreaView>
    )
}

export default FaqScreen

const styles = StyleSheet.create({
    hero: {
        height: 400
    },
    title: {
        fontSize: 20,
        color: '#FFFFF0',
        letterSpacing: .8,
        fontFamily: 'Montserrat-Bold'
    },
    container : {
        padding: 30,
        width: '100%',
    },
    title: {
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 16, 
        color: '#fff', 
        marginBottom: 5
    },
    description: {
        fontFamily: 'Montserrat-Regular', 
        fontSize: 16, 
        color: '#fff'
    }
})