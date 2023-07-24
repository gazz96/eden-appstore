import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Gap from './Gap';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../constant';
const BadgeItem = ( props ) => {
    return (
        <View>
            <TouchableOpacity onPress={props.onClick} style={styles.container}>
                <Text style={styles.text}>{props.name}</Text>    
                {
                    props.closeButton ? <Text style={styles.closeButton}><Icon name={'times'} solid/></Text> : <></>
                } 
            </TouchableOpacity>
            <Gap height={8}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#EDEDED',
        alignItems: 'center',
        paddingHorizontal: 16, 
        paddingVertical: 10, 
        borderRadius: 10, 
        marginRight: 8,
    },
    text: { 
        display: 'flex', 
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center',
        color: Colors.dark
    },
    closeButton: {
        marginLeft: 8
    }
});


export default BadgeItem;