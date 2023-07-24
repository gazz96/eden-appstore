import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'
import { Gap, HeaderWithBackButton } from '../components'
import { UserAction } from '../actions';
import Toast from 'react-native-toast-message';
import { Colors } from '../constant';
import { UserContext } from '../context';

const RequestComissionScreen = ({ route, navigation}) => {
  const { orderId } = route.params;
  const [komisi, setKomisi] = useState(0);
  const [isLoading, setisLoading] = useState(false)
  const state = UserContext();

  const requestComission = async() => {
    setisLoading(true);
    try {
        const response = await UserAction.requestComission({
            user_id: state.get().id,
            order_id: orderId,
            amount: komisi
        });

        console.log(response)

        Toast.show({
            type: 'success',
            text1: 'Berhasil',
            text2: 'Berhasil mengajukan komisi'
        });
        navigation.replace('My Order');
    }catch(error)
    {

        console.log(error.response);
        Toast.show({
            type: 'error',
            text1: 'Peringatan',
            text2: 'Ulangi beberapa saat lagi'
        });
    }finally{
        setisLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Gap height={25}/>
      <HeaderWithBackButton title="Ajukan Komisi" onPress={() => navigation.goBack()}/>
      <Gap height={55}/>
      <View>
        <Text style={styles.formLabel}>Komisi</Text>
        <TextInput style={styles.formControl} onChangeText={newKomisi => setKomisi(newKomisi)} value={komisi} keyboardType="numeric"/>
      </View>
      <Gap height={20}/>
      <TouchableOpacity>
        <Text style={styles.btnPrimary} onPress={() =>{
            requestComission();
        }}>Ajukan Komisi</Text>
      </TouchableOpacity>
      <Gap height={55}/>
    </ScrollView>
  )
}

export default RequestComissionScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: '#fff'
    },
    formLabel: {
        fontSize: 12, 
        marginBottom: 4,
        color: '#222'
    },
    formControl: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 10,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 16,
        color: Colors.dark
    },
    btnPrimary: {
        borderRadius: 10,
        color: '#fff',
        backgroundColor: Colors.primary,
        height: 40,
        lineHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});