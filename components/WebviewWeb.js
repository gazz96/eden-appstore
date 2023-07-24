import React, {Component} from 'react';
import { View, Text } from "react-native";

import { WebView } from 'react-native-webview';

const WebViewWeb = (props) => {
    return (<WebView 
        scalesPageToFit={false}
        mixedContentMode="compatibility"
        source={props.settings} onMessage={props.onMessage} />);
}

export default WebViewWeb;

