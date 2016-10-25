'use strict';

import React, { Component } from 'react';
import { WebView , Alert } from 'react-native';
const WEBVIEW_REF = 'webview';

class M3U8Tool extends Component {
  constructor(props) {
   super(props);
   this.state = {
     url: 'http://xianng.com/videoplay/video.html?videoid='+props.videoId
   };
 }

  render() {
    return (
      <WebView
        ref={WEBVIEW_REF}
        source={{uri:this.state.url}}
        style={{marginTop: 20}}
        javaScriptEnabled={true}
        onLoadEnd = {this._onLoad}
      />
    );
  }




  _onLoad(){

 }


}
module.exports = M3U8Tool;
