import React, { Component } from 'react';
import { WebView , Alert } from 'react-native';
var WEBVIEW_REF = 'webview';

class M3U8Tool extends Component {
  render() {
    return (
      <WebView
        ref={WEBVIEW_REF}
        source={{uri: 'http://v.youku.com/v_show/id_XNzE5NDQ5NDc2.html'}}
        style={{marginTop: 20}}
        javaScriptEnabled={true}
        onLoadEnd = {this.onLoadEnd}
      />
    );
  }
  onLoadEnd(){
    console.log('webview end');
   var m3u8 =  this.refs[WEBVIEW_REF].injectedJavaScript = "BuildVideoInfo.m3u8src('mp4');"
   if (m3u8) {
     Alert.alert(
              'Alert Title',
              m3u8,
            )
   }

 }s


}
module.exports = M3U8Tool;
