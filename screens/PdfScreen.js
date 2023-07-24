import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {Gap, HeaderWithBackButton} from '../components';
import Pdf from 'react-native-pdf';
import {BASE_URL} from '../constant';

const PdfScreen = ({navigation}) => {
  const source = {
    uri: BASE_URL + '/menu-2023.pdf',
    cache: true,
  };

  console.log(source);
  return (
    <LinearGradient colors={['#272727', '#13140D']} style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/long-background.png')}
        resizeMode="cover"
        style={{width: '100%', flex: 1, height: '100%'}}>
        {/* <ScrollView style={{flex: 1, height: '100%', paddingHorizontal: 16}}> */}
          <View style={{paddingHorizontal: 16}}>
            <HeaderWithBackButton
                title="MENU"
                onPress={() => navigation.goBack()}
            />
          </View>
          <Gap height={40} />

          <View
            style={{
              flex: 1,
            }}>
            <Pdf
              trustAllCerts={false}
              ref={pdf => {
                this.pdf = pdf;
              }}
              source={source}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
              onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            />
          </View>
        {/* </ScrollView> */}
      </ImageBackground>
    </LinearGradient>
  );
};

export default PdfScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
