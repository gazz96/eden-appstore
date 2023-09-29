import { API_URL, BASE_URL } from "../constant"
import { axiosRequest } from "../constant";


const ArticleAction = {
    get: async(params={}) => {
        let paramsFormat = new URLSearchParams(params);
        let url = API_URL + '/blogs';
        if(paramsFormat) {
            url += '?' + paramsFormat.toString();
        }
        const response = await fetch(url);
        const json = await response.json();
        return json;
    },
    find: async(id) => {
        const response = await fetch(API_URL + '/blog/' + id);
        const json = await response.json();
        return json;
    },
    list: async(data={}) => {
        const response = await axiosRequest.get('/blogs', {
            params: data
        });
        return response.data;
    },
    thumbnail: (thumbnail) => {
        console.log('thumbnail', thumbnail);
        if(thumbnail) {
            return {
                uri: BASE_URL + '/' + thumbnail
            }
        }

        return require('../assets/images/placeholder-news.png');
    },
    categories: async () => {
        const response = await axiosRequest.get('blog/categories');
        return response.data;
    }
}

export default ArticleAction;