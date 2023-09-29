import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, useWindowDimensions  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Gap, HeaderWithBackButton, Loading } from '../components'
import { BASE_URL } from '../constant'

import { ArticleAction } from '../actions'

import RenderHtml from 'react-native-render-html';
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const BlogsScreen = ({ navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);

    const getPostCategories = async() => {
        setLoading(true)
        try {
          let response = await ArticleAction.categories();
          console.log('response categories', categories);
          setCategories(response);
        } catch (error) {
          console.log('error categories', error);
        } finally {
            setLoading(false);
        }
      }

    const getArticles = async(category_id=null) => {
        setLoading(true);
        try {
            const response = await ArticleAction.list({
                posts_per_page: 20,
                category_id: category_id
            });
            setArticles(response.data);
        }catch(error) {
            console.error(error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(  () => {
        getArticles();
        getPostCategories();
    }, [])


    let blogImageUrl = (image) => {
        return {
            uri: BASE_URL + '/' + image
        }
    }

    const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={{flex: 1}}>
        <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
            <ImageBackground source={require('../assets/images/long-background.png')} resizeMode="cover" style={{width: '100%', flex: 1, height: '100%'}}>
                <ScrollView style={[styles.container, { paddingHorizontal: 16}]}>
                    <Gap height={20}/>
                    <HeaderWithBackButton title="NEWS & PROMOTIONS" onPress={() => navigation.goBack()}/>
                    <Gap height={32}/>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => getArticles()}>
                            <Text style={{
                                marginBottom: 5,
                                color: '#222',
                                fontFamily: 'Montserrat-SemiBold',
                                fontSize: 14,
                                backgroundColor: '#fff',
                                paddingHorizontal: 10,
                                borderRadius: 8,
                                paddingVertical: 4,
                                marginRight: 4,
                                overflow: 'hidden'
                            }}>
                                All    
                            </Text>
                        </TouchableOpacity>

                        {
                            isLoading ? <ActivityIndicator/> : 
                            categories.map((category, index) => {
                                return (
                                    <TouchableOpacity onPress={() => getArticles(category.id)}>
                                        <Text style={{
                                            marginBottom: 5,
                                            color: '#222',
                                            fontFamily: 'Montserrat-SemiBold',
                                            fontSize: 14,
                                            backgroundColor: '#fff',
                                            paddingHorizontal: 10,
                                            borderRadius: 8,
                                            paddingVertical: 4,
                                            marginRight: 4,
                                            overflow: 'hidden'
                                        }}>
                                            {category.name}    
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }

                        
                    </View>

                    <Gap height={16}/>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                        { 
                            isLoading ? <Loading/> :
                            articles.map((article, index) => {
                                return (
                                <View style={styles.col} key={index}>
                                        <TouchableOpacity  onPress={() => {navigation.navigate('Detail Article', {
                                            postId: article.id
                                        })}} >
                                        <ImageBackground source={blogImageUrl(article.thumbnail)} resizeMode="cover" 
                                        imageStyle={{borderTopLeftRadius: 4, borderTopRightRadius: 4}}
                                        style={{ 
                                            width: '100%', 
                                            height: 100,
                                            backgroundColor: '#fff',
                                            borderTopLeftRadius: 4, borderTopRightRadius: 4
                                        }}/>
                                        <Text style={{ 
                                            borderBottomLeftRadius: 4, borderBottomRightRadius: 4, padding: 14, lineHeight: 16, 
                                            fontFamily: 'Montserrat-SemiBold', color: '#FFFFFF', marginBottom: 2, backgroundColor: '#30312D',
                                            fontSize: 12
                                        
                                        }}>{article.name}</Text>
                                        
                                        
                                        <Gap height={20}/>
                                    </TouchableOpacity>
                                </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </ImageBackground>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default BlogsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    col: {
        width: '48%',
    }
})