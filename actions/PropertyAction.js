import { API_URL, axiosRequest } from "../constant"


const PropertyAction = {
    get: async(params={}) => {
        
        let paramsFormat = new URLSearchParams(params);
        let url = API_URL + '/products';
        if(paramsFormat) {
            url += '?' + paramsFormat.toString();
        }
        const response = await fetch(url);
        const json = await response.json();
        return json;
    },
    find: async(id) => 
    {
        const response = await axiosRequest.get('/property', {
            params: {
                id: id
            }
        })
        return response.data;
    },
    edit: async(data={}) => {
        const response = await axiosRequest.get('/property/edit', {
            params: data
        })
        return response.data;
    },
    getGallery: async(media_ids) => 
    {
        try{
            const response = await axiosRequest.get('/property-gallery',{
                params: {
                    media_ids: media_ids
                }
            })
            return (response).data;
        }
        catch(error)
        {
            console.log(err);
        }
    },
    getCities: async(nama = '') => {
        const response = await axiosRequest.get('/kota', {
            params: {
                nama: nama
            }
        })
        return response.data;
    },
    create: async(data) => {
        const response = await axiosRequest.post('create-property', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });    
        return response.data;
    },
    update: async(data) => {
        const response = await axiosRequest.post('update-property', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    uploadThumbnail: async(data) => {
        const response = await axiosRequest.post('upload-thumbnail', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    uploadGallery: async(data) => {
        const response = await axiosRequest.post('upload-gallery', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    relatedProperties: async(data = {}) => 
    {
        const response = await axiosRequest.get('/related-properties', {
            params: data
        })
        return response.data;
    },
    reviews: async(data = {}) => 
    {
        const response = await axiosRequest.get('/property/review', {
            params: data
        })
        return response.data;
    },

}

export default PropertyAction;