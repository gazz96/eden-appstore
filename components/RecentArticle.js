import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArticleAction } from '../actions'
import { BASE_URL, Colors } from '../constant'
import ArticleCardBlock from './ArticleCardBlock'
import Gap from './Gap'
import { ScrollView } from 'react-native'
import moment from 'moment/moment'

const RecentArticle = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    const getArticles = async() => {
        try {
            const response = await ArticleAction.get({
                paginate: 5
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
    }, [])


    let blogImageUrl = (image) => {
        return {
            uri: BASE_URL + '/uploads/' + image
        }
    }

  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.title}>Blogs</Text>
            <Text style={{ }}  onPress={() => {
                props.navigation.navigate('Blogs Screen')
            }}>Lihat Semua</Text>
        </View>
        <Gap height={20}/>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {
            isLoading ? <ActivityIndicator/> : articles.map((article, index) => {
                return (<View style={{marginRight: 10, width: 280}} key={index}><ArticleCardBlock 
                    style={{marginRight: 10}}
                    title={article.post_title} 
                    author={article.author}
                    published_date={moment(article.post_date).format('DD MMMM YYYY')}
                    image={blogImageUrl(article.post_thumbnail)} 
                    onPress={() => {props.navigation.navigate('Detail Article', {
                        article: article
                    })}}/></View>)
            })
        }
        </ScrollView>
    </View>
  )
}

export default RecentArticle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor :'#fff',
        position: 'relative',
        backgroundColor: '#fff'
    },
    title: {
        fontWeight: 'bold',
        color: Colors.dark
    }
})