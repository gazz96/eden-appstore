import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {API_URL} from '../constant';

import {UserContext} from '../context';
import WebViewWeb from '../components/WebviewWeb';
import {WebView} from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';

const TopupSnapScreen = ({route, navigation}) => {
  const {topup} = route.params;

  let authUser = UserContext();
  //   let url = `${API_URL}/order/gateway?user_id=${
  //     authUser.get().id
  //   }&order_id=${orderId}`;
  //   console.log('url', url);
  const onMessage = event => {
    let data = event.nativeEvent.data;
    if (data == 'finish') {
      navigation.navigate('My Topup');
    }
  };

  useEffect(() => {});

  const INJECTED_JAVASCRIPT = `(function() {
       

    })();`;

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{
          uri: topup.token,
        }}
        style={{margin: 20}}
      />
      {/* <WebView
        injectedJavaScript={INJECTED_JAVASCRIPT}
      source={{
        html: `
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script type="text/javascript"
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key="SB-Mid-client-eSAUT6KP8gpZ2yi-"></script>
        </head>
        <body>
            <script type="text/javascript">
                let message = "";
                let token = "${topup.token}"
                let status = "";
                snap.pay(token, {
                onSuccess: function(result){
                    console.log('success');console.log(result); status = "finish"; snap.hide();
                },
                onPending: function(result){console.log('pending');console.log(result); status = "finish"; snap.hide();},
                onError: function(result){console.log('error');console.log(result); status = "finish"; snap.hide();},
                onClose: function(){console.log('customer closed the popup without finishing the payment'); status = "finish"; snap.hide();}
                })

                window.addEventListener("message", function(){
                    window.ReactNativeWebView.postMessage(status);
                });

                //window.ReactNativeWebView.postMessage(status);
               
            </script>
        </body>
        </html>
        `,
      }}
      onMessage={onMessage}
    /> */}
      <View style={{paddingHorizontal: 20}}>
        <TouchableOpacity
          onPress={() => navigation.push('My Topup')}
          style={{width: '100%'}}>
          <LinearGradient
            colors={['#FFDD9C', '#BC893C']}
            style={{borderRadius: 15}}>
            <Text style={styles.btnPrimary}>MY TOPUP</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TopupSnapScreen;

const styles = StyleSheet.create({
  btnPrimary: {
    borderRadius: 25,
    color: '#fff',
    width: '100%',
    height: 50,
    lineHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: 'Montserrat-Bold',
  },
});
