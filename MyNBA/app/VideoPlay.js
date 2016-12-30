'use strict';

import React, { Component } from 'react';
import { WebView , Alert , View , Text , ScrollView ,StyleSheet , TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const WEBVIEW_REF = 'webview';

class VideoPlay extends Component {
  constructor(props) {
   super(props);
   this.state = {
     videoList:[],
     url: '',
     selectedIndex:-1,
   };
 }
 componentDidMount() {
         //这里获取从FirstPageComponent传递过来的参数: id
         this.setState({
             videoList:this.props.videoList,
             url: this.props.videoList[0].video,
             selectedIndex:0
         });
        //  this.refs[WEBVIEW_REF].reload();
     }
  render() {
    var list = this.state.videoList.map(this.createThumbRow.bind(this));
    return (
      <View style={styles.container}>
        <View style={styles.navigation}>
           <TouchableHighlight
             onPress={this._onPressBack.bind(this)}
             underlayColor='transparent'>
             <View style={{width:80,height:44}}>
             <Icon
               name='ios-arrow-back'
               size={44}
               color='#fff'
               style={styles.backIcon} />
             </View>
           </TouchableHighlight>
           <View style={styles.header}>
            <Text style={{textAlign:'center',flex:1,color:'white',fontSize: 17}}>视频播放</Text>
           </View>
        </View>

        <WebView
          ref={WEBVIEW_REF}
          source={{uri:this.state.url}}
          style={styles.webview}
          javaScriptEnabled={true}
          mediaPlaybackRequiresUserAction={true}
          onLoadEnd = {this._onLoad}
        />
        <View style={{marginTop:20, height:94 ,bottom:80}}>
          <ScrollView
          horizontal = {true}
          alwaysBounceHorizontal = {true}
          style={{ flex: 1, backgroundColor:'#f0f0f0'}}
          >
          {list}
          </ScrollView>
        </View>
      </View>
    );
  }

  createThumbRow(item,i){
    var btnStyle = this.state.selectedIndex == i?styles.buttonSelected:styles.buttonNormal;
    var textStyle = this.state.selectedIndex == i?styles.textSelected:styles.textNormal;
    return(
        <View key={i} style={btnStyle}>
          <TouchableHighlight onPress={() => this._cellPressed(i,item)} underlayColor='#FF5745'>
            <Text style={textStyle}> {item.title} </Text>
          </TouchableHighlight>
        </View>
    );
  }

_onPressBack(){
   this.props.navigator.pop()
}

  _onLoad(){

 }
 _cellPressed(i,item){
   if (this.state.url != item.video) {
     this.setState({
         url: item.video,
         selectedIndex:i
     });
   }

 }

}




var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f0f0f0'
  },
  navigation: {
    flexDirection: 'row',
    paddingTop:20,
    backgroundColor: '#FF5745',
  },
  backIcon: {
    left:10,
    height: 44,
    width: 44
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
    alignItems: 'center',
  },
  webview:{
    margin:10
  },
  buttonNormal: {
    margin: 7,
    width:150,
    height:80,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 3,
    backgroundColor:'#ffffff'
  },
  buttonSelected: {
    margin: 7,
    width:150,
    height:80,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 3,
    backgroundColor:'#FF5745'
  },
  textNormal: {
    fontSize: 14,
    color: '#888888',
    alignItems: 'center',
  },
  textSelected: {
    fontSize: 14,
    color: '#ffffff',
    alignItems: 'center',
  }
})



module.exports = VideoPlay;
