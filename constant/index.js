import TipeBangunan from "./TipeBangunan";
import Colors from "./Colors";
import Countries from "./Countries";
import currency from "currency.js";
import JenisFasilitas from "./JenisFasilitas";
import axios from "axios";
import { useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

// Languages
import en from '../translations/en';
import fr from '../translations/fr';
const logoSrc = {
    uri: 'https://sava.co.id/uploads/settings/logo.png'
}



const LANGUAGES = {
  en,
  fr
};

const LANG_CODES = Object.keys(LANGUAGES);






const BASE_URL = 'https://eden.webgoster.com';
const API_URL = BASE_URL + '/api';

const UPLOAD_URL =  BASE_URL + '/uploads';

const Rp = (nominal) => {
    return currency(nominal, {
        separator: ',',
        precision: 0,
        symbol: ''
    }).format();
}

const axiosRequest = axios.create({
    baseURL: API_URL
})

const SAVACONTACT = {
    wa: '6281804600069'
}

const useForm  = (initialValues) => {
    const [values, setValues] = useState(initialValues)
    return [
        values, 
        (type, params) => {
            return setValues({...values, [type]: params})
        }
    ]
}

const isAdmin = (role) => {
    return true;
}

const isSubscriber = (role) => {
    return true;
}


const LANGUAGE_DETECTOR = {
    type: 'languageDetector',
    async: true,
    detect: callback => {
      AsyncStorage.getItem('user-language', (err, language) => {
        // if error fetching stored data or no language was stored
        // display errors when in DEV mode as console statements
        if (err || !language) {
          if (err) {
            console.log('Error fetching Languages from asyncstorage ', err);
          } else {
            console.log('No language is set, choosing English as fallback');
          }
          const findBestAvailableLanguage =
            RNLocalize.findBestAvailableLanguage(LANG_CODES);
  
          callback(findBestAvailableLanguage.languageTag || 'en');
          return;
        }
        callback(language);
      });
    },
    init: () => {},
    cacheUserLanguage: language => {
      AsyncStorage.setItem('user-language', language);
    }
  };

export { 
    TipeBangunan, 
    logoSrc, 
    Colors, 
    BASE_URL, 
    API_URL, 
    UPLOAD_URL, 
    Rp, 
    axiosRequest, 
    SAVACONTACT, 
    useForm, 
    isAdmin, 
    isSubscriber, 
    JenisFasilitas, 
    LANG_CODES,
    Countries
};