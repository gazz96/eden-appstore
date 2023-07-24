import { API_URL, axiosRequest } from "../constant"
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthAction = {
    attempt: async(email, password) => {
        const response = await axiosRequest.post('/auth/login',{
            email: email,
            password: password
        })
        await AuthAction.saveUserloggedIn({
            email: email,
            password: password
        })
        return response.data;
    },
    register: async(data={}) => {
        const response = await axiosRequest.post('/auth/register',data)
        return response.data;
       
    },
    sendTokenResetPassword: async(data={}) => {
        const response = await axiosRequest.post('/user/send-reset-password-token',data)
        return response.data;
       
    },
    resetPassword: async(data={}) => {
        const response = await axiosRequest.post('/user/update-new-password',data)
        return response.data;
       
    },
    validate: async(token) => {
        return true
    },
    saveUserloggedIn: async(data) => {
        try {
            await AsyncStorage.setItem('@SESS_USER', JSON.stringify(data));
        }catch(e) {
            console.log('error saveUserLoggedIn', e);
        }
    },
    isUserloggedIn: async() =>  {
        try {
            const jsonValue = await AsyncStorage.getItem('@SESS_USER')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        }catch(e) {
            console.log('error isUserloggedIn', e)
            return false;
        }
    },
    clearSess: async() => {
        try {
            await AsyncStorage.removeItem('@SESS_USER')
        }
        catch(e) {
            return false;
        }
    },
    forgetPassword: async(email) => {
        return (await axiosRequest.post('auth/forgot-password', {
            email: email
        })).data;
    },
    newPassword: async(data) => {
        const response = await axiosRequest.post('auth/new-password', data);
        return response.data;
    }

}

export default AuthAction;