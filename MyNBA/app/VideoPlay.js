'use strict';

import React, { Component } from 'react';
import { WebView , Alert , View , Text , ScrollView ,StyleSheet , TouchableHighlight } from 'react-native';
// import {Icon} from 'react-native-icons'

const WEBVIEW_REF = 'webview';
var arr = [
    {
        "title": "[今日十佳球-原声] 布罗格登颜扣欧文+反扣詹姆斯\r",
        "video": "http://www.24zbw.com/bf/qq.html?id=i0022r5ijqt&tiny=0&auto=1"
    },
    {
        "title": "[今日最佳镜头] 布罗格登突破霸气反扣詹姆斯\r",
        "video": "http://www.24zbw.com/bf/qq.html?id=g0022qwnfyj&tiny=0&auto=1"
    },
    {
        "title": "[今日最佳扣篮] 布罗格登单手暴力劈扣欧文\r",
        "video": "http://www.24zbw.com/bf/qq.html?id=m0022wk5e3r&tiny=0&auto=1"
    },
    {
        "title": "[今日最佳助攻] 保罗快手妙传 皇叔接球暴扣\r",
        "video": "http://www.24zbw.com/bf/qq.html?id=p0022pcy95v&tiny=0&auto=1"
    },
    {
        "title": "[今日最佳动作] 利拉德持球突破轻松写意拉杆\r",
        "video": "http://www.24zbw.com/bf/qq.html?id=z0022tzgjac&tiny=0&auto=1"
    },
    {
        "title": "[今日最佳运球] 哈登晃开铁林防守三分飚射\r",
        "video": "http://www.24zbw.com/bf/qq.html?id=y0022ab57pm&tiny=0&auto=1"
    },
    {
        "title": "[今日最佳盖帽] 又见詹式追身血帽帕克接锅",
        "video": "http://www.24zbw.com/bf/qq.html?id=e00226n0sg6&tiny=0&auto=1"
    }
];

class VideoPlay extends Component {
  constructor(props) {
   super(props);
   this.state = {
     url: '',
     selectedIndex:-1,
   };
 }
 componentDidMount() {
         //这里获取从FirstPageComponent传递过来的参数: id
         this.setState({
             videoItem:this.props.videoItem,
             url: this.props.videoItem.videoList[0].video,
             selectedIndex:0
         });
        //  this.refs[WEBVIEW_REF].reload();
     }
  render() {
    var list = arr.map(this.createThumbRow.bind(this));
    return (
      <View style={{flex: 1, flexDirection:'column', backgroundColor:'white'}}>
      <View style={{height:64}}>
        <TouchableHighlight
          onPress={this.onPressBack.bind(this)}
          underlayColor='transparent'>

        </TouchableHighlight>
      </View>

        <View style={{flexDirection: 'row',height: 64,backgroundColor: '#FF5745',justifyContent: 'center',alignItems: 'center'}}>
           <Text style={{marginTop:10 ,textAlign:'center', color:'white',fontSize: 17}}>视频播放</Text>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          source={{uri:this.state.url}}
          style={{marginTop:20}}
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
  backIcon: {
    height: 30,
    marginLeft: 6,
    marginTop: 6,
    width: 30
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
