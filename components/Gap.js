import React, {Component} from 'react';
import { View, Text } from "react-native";


const Gap = (props) => {
    return (
        <View style={{ 
            width: '100%', 
            height: props.height
            }}>
            <Text></Text>
        </View>
    );
}

export default Gap;

