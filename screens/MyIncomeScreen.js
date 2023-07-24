import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Gap, HeaderWithBackButton } from '../components'
import { Colors, Rp, SAVACONTACT } from '../constant'

import { UserContext } from '../context'
import { UserAction } from '../actions'
import { Linking } from 'react-native'

import Toast from 'react-native-toast-message';

const MyIncomeScreen = ({navigation}) => {
    const state = UserContext();
    const [incomes, setIncomes] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [totalIncome, setTotalIncome] = useState(0);

    const getIncomes = async() => {
        setLoading(true);
        try {   
            const response = await UserAction.getMyFees(state.get().id)
            setIncomes(response.data);
        }
        catch(error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
        return false;
    }

    const getTotalIncome = async() => {
        setLoading(true);
        try {
            const response = await UserAction.getTotalFee(state.get().id)
            setTotalIncome(response.total_income);
            
        }catch(error) {
            console.log(error)
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getIncomes();
        getTotalIncome();
    }, [])

    const normalisasiNomorHP = (phone) => {
        phone = String(phone).trim();
        phone = (phone).replace('-', '');
        phone = (phone).replace(' ', '');
        if (phone.startsWith('08')) {
            phone = '628' + phone.slice(2);
        } else if (phone.startsWith('+62')) {
            phone = '628' + phone.slice(3);
        }
        return phone.replace(/[- .]/g, '');
    }

    const openWaUrl = (noHp, message) => {
        let url = 'https://wa.me/' + normalisasiNomorHP(noHp) + '?text=' + message;
        Linking.openURL(url);
    }

    const requestWithdraw = async() => {
        setLoading(true);
        try{
            const response = await UserAction.requestWithdraw({
                user_id: state.get().id
            })

            console.log(response);

            await getIncomes();
            await getTotalIncome();

            Toast.show({
                type: 'success',
                text1: 'Berhasil',
                text2: 'Berhasil melakukan pengajuan'
            });

        }
        catch(error){
            let message = error.response.data.message ?? 'Something Wrong'
            Toast.show({
                type: 'error',
                text1: 'Peringatan',
                text2: message
            });
        }
        finally{
            
            setLoading(false);
        }
    }

  return (
    <ScrollView style={styles.container}>
        <Gap height={20}/>
        <HeaderWithBackButton title={"Penghasilan"} onPress={()=>navigation.goBack()}/>
        <Gap height={40}/>
        
        <View style={styles.hero}>
            <Text style={{color: Colors.white}}>Kredit Anda</Text>
            <Text style={styles.textSaldo}>{Rp(totalIncome)}</Text>
            <Gap height={8}/>
            <Text style={{ color: Colors.primary, backgroundColor: Colors.white, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8, fontWeight: 'bold', fontSize: 12}} onPress={() => {
                requestWithdraw();
            }}>Ajukan Pencairan</Text>
        </View>
        <Gap height={35}/>

        <View>
            <Text style={styles.title}>Penghasilan Anda</Text>
            <Gap height={10}/>
            {
                isLoading ? <ActivityIndicator/> : incomes.map((income, index)=> {
                    return(
                        <View key={index}>
                            <View style={{backgroundColor: Colors.light, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15 }}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.status(income.status)}>{income.status}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 10,}}>
                                    <View style={{width: '50%', marginBottom: 10}}>
                                        <Text style={styles.title}>Kode</Text>
                                        <Text style={{fontSize: 12, color: Colors.dark}}>{income.order.order_code ?? ''}</Text>
                                    </View>
                                    <View style={{width: '50%', marginBottom: 10}}>
                                        <Text style={styles.title}>Tanggal Order</Text>
                                        <Text style={{fontSize: 12, color: Colors.dark}}>{income.order.order_date ?? ''}</Text>
                                    </View>
                                    <View style={{width: '50%', marginBottom: 10}}>
                                        <Text style={styles.title}>Komisi(Gross)</Text>
                                        <Text style={{fontSize: 12, color: Colors.dark}}>{Rp(income.amount)}</Text>
                                    </View>
                                    <View style={{width: '50%', marginBottom: 10}}>
                                        <Text style={styles.title}>Nett Fee Agen</Text>
                                        <Text style={{fontSize: 12, color: Colors.dark}}>{Rp(income.order.nett_fee_agent ?? 0)}</Text>
                                    </View>
                                </View>
                            </View>
                            <Gap height={20}/>
                        </View>
                    )
                })
            }
            
        </View>
    </ScrollView>
  )
}

export default MyIncomeScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },  
    hero: {
        fontWeightBold: '',
        backgroundColor: Colors.primary,
        borderRadius: 10,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        color: Colors.dark,
        fontSize: 12
    },
    textSaldo: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 24
    },
    status: (type) => {
        let color = Colors.light;
        if(type == "PENDING")
        {
            color = Colors.yellow;
        } 

        if(type == "PAID")
        {
            color = Colors.success;
        }
        return {
            backgroundColor: color,
            color: Colors.dark,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 10,
            width: 'auto',
            fontSize: 10
        }
    }
})