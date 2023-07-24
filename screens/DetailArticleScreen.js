import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {BASE_URL, Colors} from '../constant';
import {ArticleAction} from '../actions';
import Gap from '../components/Gap';
//import HTMLView from 'react-native-htmlview'

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';
import RenderHtml from 'react-native-render-html';
import LinearGradient from 'react-native-linear-gradient';
import {LangContext} from '../context';
import { HeaderWithBackButton } from '../components';
const DetailArticleScreen = ({route, navigation}) => {
  const {postId} = route.params;
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const currentLang = LangContext();
  let getImage = image => {
    return {
      uri: BASE_URL + '/uploads/' + image,
    };
  };

  const getArticle = async () => {
    setLoading(true);
    try {
      const response = await ArticleAction.find(postId);
      setArticle(response);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  const {width} = useWindowDimensions();
  const tagsStyles = {
    body: {
      color: '#fff',
    },
    h3: {
      color: '#fff',
    },
    p: {
      color: '#fff',
      fontFamily: 'Montserrat-Regular',
    },
    figcaption: {
      display: 'none'
    },
  
  };
  return (
    <LinearGradient colors={['#272727', '#13140D']} style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/long-background.png')}
        resizeMode="cover"
        style={{width: '100%', flex: 1, height: '100%'}}>
        <ScrollView style={{flex: 1, height: '100%'}}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
             <View style={{paddingHorizontal: 16}}>
              <Gap height={20}/>
              <HeaderWithBackButton title="NEWS & PROMOTION" onPress={() => {
                navigation.goBack()
              }}/>
              <Gap height={30}/>
             </View>
              <ImageBackground
                source={{
                  uri: BASE_URL + '/' + article.thumbnail,
                }}
                resizeMode='contain'
                imageStyle={{}}
                style={styles.hero}>
                
              </ImageBackground>
              <View style={styles.container}>
                <Text style={styles.title}>{article.name}</Text>
                <Gap height={20} />
                {/* <HTMLView value={ article.post_content}/> */}
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: article.content,
                  }}
                  tagsStyles={tagsStyles}
                  enableExperimentalMarginCollapsing={true}
                  renderersProps={{
                    img: {
                      enableExperimentalPercentWidth: true,
                    },
                  }}
                />
              </View>
            </>
          )}
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default DetailArticleScreen;

const styles = StyleSheet.create({
  hero: {
    height: 250,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    color: '#FFFFF0',
    letterSpacing: 0.8,
    fontFamily: 'Montserrat-Bold',
  },
  container: {
    padding: 30,
    width: '100%',
  },
});
