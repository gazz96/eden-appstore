import { API_URL, axiosRequest } from "../constant"
import Toast from 'react-native-toast-message';
import axios from "axios";

const UserAction = {
    get: async(params={}) => 
    {
        let paramsFormat = new URLSearchParams(params);
        let url = API_URL + '/properties';
        if(paramsFormat) {
            url += '?' + paramsFormat.toString();
        }
        const response = await fetch(url);
        const json = await response.json();
        return json;
    },
    find: async(id) => 
    {
        const response = await fetch(API_URL + '/property?id=' + id);
        const json = await response.json();
        return json;
    },
    me: async(id) => {
        const response = await axiosRequest.get('/user/me',{
            params: {
                user_id: id
            }
        })
        return response.data;
    },
    update: async(data) => {
        const response = await axiosRequest.post('/user/profile',data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response;
    },
    getProperty: async(user_id) => 
    {
        try{
            const response = await axiosRequest.get('/user/property',{
                params: {
                    user_id: user_id
                }
            })
            return (response).data;
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    },
    getIncome: async(user_id) => 
    {
        try{
            const response = await axiosRequest.get('/user/income',{
                params: {
                    user_id: user_id
                }
            })
            return (response).data;
        }
        catch(error)
        {
            return false;
        }
    },
    getTotalIncome: async(user_id) => {
        try{
            const response = await axiosRequest.get('/user/total-income',{
                params: {
                    user_id: user_id
                }
            })
            return (response).data;
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    },
    getTotalFee: async(user_id) => {
        try{
            const response = await axiosRequest.get('/user/total-fee',{
                params: {
                    user_id: user_id
                }
            })
            return (response).data;
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    },
    getOrders: async(options={}) => {
        try{
            const response = await axiosRequest.get('/user/orders',{
                params: options
            })
            console.log(response.data);
            return (response).data;
        }
        catch(error) 
        {
            console.log(error);
            return false;
        }
    },
    getShishaOrders: async(options={}) => {
        const response = await axiosRequest.get('/pos/waiting',{
            params: options
        })
        return (response).data;
    },
    getTopups: async(options={}) => {
        const response = await axiosRequest.get('/topups', {
            params: options
        })
        return response.data;
    },
    getRedeems: async(options={}) => {
        const response = await axiosRequest.get('/user/redeems',{
            params: options
        })
        return (response).data;
    },
    changePassword: async(data) => {
        const response = await axiosRequest.post('/user/password',data);
        return response.data;
    },
    requestComission: async(data) => {
        const response = await axiosRequest.post('/order/request-comission', data);
        return response.data;
    },
    getMyFees: async(user_id) => 
    {
        const response = await axiosRequest.get('/user/fees',{
            params: {
                user_id: user_id
            }
        })
        return (response).data;
    },
    requestWithdraw: async(data) => {
        const response = await axiosRequest.post('/withdraw', data);
        return response.data;
    },
    agents: async(data={}) => {
        const response = await axiosRequest.get('/agents', {
            params: data
        });
        return response.data;
    },
    detailAgent: async(id) => {
        const response = await axiosRequest.get('/agent/' + id);
        return response.data;
    },
    createOrder: async(data) => {
        const response = await axiosRequest.post('order/create', data);
        return response.data;
    },
    reviews: async(data={}) => {
        const response = await axiosRequest.get('user/reviews', {
            params: data
        });
        return response.data;
    },
    saveTimeline: async(data={}) => {
        const response = await axiosRequest.post('order/timeline', data);
        return response.data;
    },

    updateProfile: async(data) => {
        const response = await axiosRequest.post('/user/profile',data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data;
    },
    topup: async(data) => {
        const response = await axiosRequest.post('topup', data);
        return response.data;
    },
    balance: async(user_id) => {
        const response = await axiosRequest.post('user/balance', {
            user_id: user_id
        });
        return response.data;
    },
    reservations: async(data) => {
        const response = await axiosRequest.get('reservation', {
            params: data
        })
        return response.data;
    },
    cancelReservation: async(data) => {
        const response = await axiosRequest.post('/reservation/cancel',data)
        return response.data;
    },
    dectiveAccount: async (id) => {
        const response = await axiosRequest.post('/user/deactive', {
            user_id: id
        })
        return response.data;
    },
    getPoints: async(id) => {
        const response = await axiosRequest.post('/user/points', {
            user_id: id
        });
        return response.data;
    }
}

export default UserAction;