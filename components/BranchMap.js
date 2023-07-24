import React from 'react';

import { WebView } from 'react-native-webview';

const BranchMap = (props) => {
    return (<WebView source={{ uri: 'https://eden.webgoster.com/map' }} />);
}

export default BranchMap;

