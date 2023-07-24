import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Gap, HeaderWithBackButton } from '../components'
import { Colors, Rp, SAVACONTACT } from '../constant'

import { UserContext } from '../context'
import { UserAction } from '../actions'
import { Linking } from 'react-native'

const MyWithdrawScreen = ({navigation}) => {
    const state = UserContext();
    const [incomes, setIncomes] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [totalIncome, setTotalIncome] = useState(0);

    const getIncomes = async() => {
        setLoading(true);
        try {   
            const response = await UserAction.getIncome(state.get().id)
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
            const response = await UserAction.getTotalIncome(state.get().id)
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

  return (
    <ScrollView style={styles.container}>
        <Gap height={20}/>
        <HeaderWithBackButton title={"Tarik Uang"} onPress={()=>navigation.goBack()}/>
        <Gap height={40}/>
        
        <View style={styles.hero}>
            <Text style={{color: Colors.white}}>Kredit Anda</Text>
            <Text style={styles.textSaldo}>{Rp(totalIncome)}</Text>
            <Gap height={8}/>
            <Text style={{ color: Colors.primary, backgroundColor: Colors.white, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8, fontWeight: 'bold', fontSize: 12}} onPress={() => {
                Linking.openURL(openWaUrl(SAVACONTACT.wa, `
                    Saya ${state.email} ingin melakukan withdraw sebesar ${Rp(totalIncome)} %0a%0a
                    Informasi Bank: %0a
                    Bank: ${state.nama_bank}%0a
                    Cabang: ${state.nama_cabang}%0a
                    A/N: ${state.pemilik_rekening}%0a
                    Nomor Rekening: ${state.nomor_rekening}%0a
                `));
            }}>Widthdraw</Text>
        </View>
        <Gap height={35}/>

        <View>
            <Text style={styles.title}>Riwayat Penarikan</Text>
            <Gap height={10}/>
            {
                isLoading ? <ActivityIndicator/> : incomes.map((income, index)=> {
                    return(
                        <View key={index}>
                            <View style={{backgroundColor: Colors.light, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15 }}>
                                <View style={{flexDirection: 'row'}}>
                                    
                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 10,}}>
                                    <View style={{width: '50%', marginBottom: 10}}>
                                        <Text style={styles.title}>Kode</Text>
                                        <Text style={{fontSize: 12, color: Colors.dark}}>{income.order.order_code ?? ''}</Text>
                                    </View>

                                    <View style={{width: '50%', marginBottom: 10, flexWrap: 'wrap'}}>
                                        <Text style={styles.title}>Status</Text>
                                        <Text style={styles.status(income.status)}>{income.status}</Text>
                                    </View>

                                    <View style={{width: '50%', marginBottom: 10, flexWrap: 'wrap'}}>
                                        <Text style={styles.title}>Tanggal Order</Text>
                                        <Text style={{fontSize: 12, color: Colors.dark}}>{income.order.order_date ?? ''}</Text>
                                    </View>
                                    
                                    <View style={{width: '50%', marginBottom: 10}}>
                                        <Text style={styles.title}>Total Bayar</Text>
                                        <Text style={{fontSize: 12, color: Colors.dark}}>{Rp(income.amount ?? 0)}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'column', flexWrap: 'wrap', paddingVertical: 10,}}>
                                    <Text style={styles.title}>Detail Rekening</Text>
                                    <Text style={{fontSize: 12, color: Colors.dark}}>{[
                                        income.nama_bank, income.nama_cabang,  income.pemilik_rekening, income.nomor_rekening
                                    ].join('-')}</Text>
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

export default MyWithdrawScreen

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

        if(type == "SUCCESS")
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