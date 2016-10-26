'use strict';

import React, { Component } from 'react';
import { View ,
        Alert ,
        StyleSheet ,
        Dimensions ,
        Text ,
} from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';
import Video from 'react-native-video';
import renderIf from 'render-if';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Bars } from 'react-native-loader';
import Slider from 'react-native-slider';
var Orientation = require('react-native-orientation');

const WEBVIEW_REF = 'webview';
const playerDefaultHeight   = 250;
const playerDefaultWidth    = Dimensions.get('window').width;

class M3U8Tool extends Component {
  constructor(props) {
   super(props);
   this.state = {
     url: 'http://xianng.com/videoplay/video.html?videoid='+props.videoId,
     videoSource:'',
     show:false,
     playButtonColor:'rgba(255,255,255,0)',
    loadingColor:'rgba(255,255,255,0)',
    playing:false,
    bottomBoxStyle:{},
    thumbTouchSize:{width:10,height:10},
    video:{time:'00:00',duration:'00:00'},
    duration:0,
    fullscreen:false,
    playing:false,
    paused:false,
    progress:0,
    position:0,
      customStyle:{},
      customButtonStyle:{},
      buttonSize:70,
      progressWidth:playerDefaultWidth,
   };
   this.state.customStyle = Object.assign({},this.props.style);
    if(this.state.customStyle.width){
      this.state.progressWidth = this.state.customStyle.width;
      this.state.customButtonStyle.width = this.state.customStyle.width;
    }
    if(this.state.customStyle.height){
      this.state.customButtonStyle.height = this.state.customStyle.height;
      this.state.customButtonStyle.top = - (this.state.customStyle.height);
    }
    if(this.props.buttonSize){
      this.state.buttonSize = this.props.buttonSize;
    }
    this.state.customButtonStyle = Object.assign(this.state.customButtonStyle,this.props.buttonStyle);
 }

  render() {
    let defaultControlsView = this.defaultControlsView();
    return (
      <View style={styles.view} ref='windowView'>
        <WebViewBridge
          ref={WEBVIEW_REF}
          injectedJavaScript = {`window.onload = function(){var str = BuildVideoInfo.m3u8src('mp4'); if(WebViewBridge){WebViewBridge.send(str)}}`}
          source={{uri:this.state.url}}
          style={{height: 0, opacity: 0}}
          javaScriptEnabled={true}
          onBridgeMessage={this.onBridgeMessage.bind(this)}
        />
        {renderIf(this.state.show)(
          <Video source={{uri: this.state.videoSource}} // Can be a URL or a local file.
          ref={'videoplayer'}
          rate={1.0}                   // 0 is paused, 1 is normal.
          volume={1.0}                 // 0 is muted, 1 is normal.
          muted={false}                // Mutes the audio entirely.
          paused={this.state.paused}               // Pauses playback entirely.
          resizeMode="cover"           // Fill the whole screen at aspect ratio.
          repeat={false}                // Repeat forever.
          playInBackground={false}     // Audio continues to play when app entering background.
          playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown.
          onLoadStart={this.loadStart.bind(this)} // Callback when video starts to load
          onLoad={this.onLoad.bind(this)}     // Callback when video loads
          onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
          onEnd={this.onEnd.bind(this)}           // Callback when playback finishes
          onError={this.videoError.bind(this)}    // Callback when video cannot be loaded
          style={[styles.backgroundVideo,this.state.customStyle]} />

         )}
         {defaultControlsView}
       </View>

    );
  }

  onBridgeMessage(message){
    // Alert.alert('title',message);
    this.setState({videoSource:message,show:true});
  }

  loadStart(){

  }
  onLoad(){
    this.setState({loadingColor:'rgba(255,255,255,0)',playing:true});
    this.setState({playButtonColor:'rgba(255,255,255,0)'});
  }
  setTime(event){
    this.setState({progress:event.position});
    this.setState({duration:event.duration,video:{time:this.formatTime(event.currentTime),duration:this.formatTime(event.duration)}});
    this.setState({loadingColor:'rgba(255,255,255,0)'});
  }
  onEnd(){

  }
  videoError(){

  }

  pause()
  {
    this.setState({paused:!this.state.paused});
    if (this.state.paused) {//暂停
      this.setState({loadingColor:'rgba(255,255,255,0)',playing:false});
      this.setState({playButtonColor:'rgba(255,255,255,1)'});
    }else {
      this.setState({loadingColor:'rgba(255,255,255,0)',playing:true});
      this.setState({playButtonColor:'rgba(255,255,255,0)'});
    }
  }

  defaultControlsView(){
    let playButton = (<View style={{backgroundColor:'rgba(0,0,0,0.5)'}}><Icon.Button opacity={1} style={[styles.playButton,styles.button]} size={10} onPress={this.pause.bind(this)} name="play" color='#fff' ></Icon.Button></View>);
    let pauseButton = (<View style={{backgroundColor:'rgba(0,0,0,0.5)'}}><Icon.Button opacity={1} style={[styles.playButton,styles.button]} size={10} onPress={this.pause.bind(this)} name="pause" color='#fff' ></Icon.Button></View>);
    let playOrPause = this.state.playing ? pauseButton : playButton;
    return (
      <View>
        <View style={[styles.buttonBox,{backgroundColor:'rgba(0,0,0,0)'},this.state.customButtonStyle]}><Bars size={10} color={this.state.loadingColor}  /></View>
        <View style={[styles.bottomBox,this.state.bottomBoxStyle]}>
          <View hidden={true} style={styles.playButtonBox}>
            {playOrPause}
          </View>
           <Text style={styles.time}>{this.state.video.time}</Text>
          <Slider maximumValue={0.97} thumbTouchSize={this.state.thumbTouchSize} thumbTintColor='#fff' thumbStyle={styles.thumbStyle} style={[styles.sliderStyle,this.state.customTrackStyle]} trackStyle={[styles.trackStyle,this.state.customTrackStyle]} value={this.state.progress} onValueChange={this.seek.bind(this)} />
          <Text style={styles.time}>{this.state.video.duration}</Text>
          <View style={{backgroundColor:'rgba(0,0,0,0.5)'}}><Icon.Button opacity={1} style={styles.playButton} size={10} onPress={this.fullscreen.bind(this)} name="expand" color='#fff' ></Icon.Button></View>
        </View>

      </View>
    );
  }
  seek(value){
    this.refs['videoplayer'].seek(value);
    let duration = this.state.duration;
    let curtime  = duration * value;
    this.setState({paused:false,playing:true,video:{time:this.formatTime(curtime),duration:this.formatTime(duration)}});
  }
  formatTime(i){
    let text = '';
    let t = Math.ceil( i / 1000 );
    if( t < 60 ){
      text = '00:' + (t < 10 ?  '0'+t : t );
    }else if(t>=60 && t < 3600){
      let min = Math.floor(t/60);
      let sec = (t - min*60);
      text =  (min < 10 ?  '0'+min : min ) + ':' + (sec < 10 ?  '0'+sec : sec ) ;
    }else{
      let hour = Math.floor(t/3600);
      let min  = Math.floor((t - hour*3600)/60);
      text =  (hour < 10 ?  '0'+hour : hour ) + ':' + (min < 10 ?  '0'+min : min ) + ':' + (t - hour*3600 - min*60);
    }
    return text;
  }
  fullscreen()
  {
    if(this.state.fullscreen){
      this.setState({fullscreen:false});

      this.refs['windowView'].setNativeProps({style:[{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        position:'',
      }]});
      this.refs['videoplayer'].setNativeProps({style:[styles.backgroundVideo,this.state.customStyle]});
      this.setState({customTrackStyle:{width:(Dimensions.get('window').height-120)}});
      Orientation.lockToPortrait();
    }else{
      this.setState({fullscreen:true});
      this.refs['windowView'].setNativeProps({style:[{
        height:Dimensions.get('window').width,
        width:Dimensions.get('window').height,
        position:'absolute',
        left:0,
        top:0
      }]});
      this.refs['videoplayer'].setNativeProps({style:[{
        height:Dimensions.get('window').width,
        width:Dimensions.get('window').height,
      }]});
      this.setState({customTrackStyle:{width:(Dimensions.get('window').height-120)}});
      Orientation.lockToLandscapeLeft();
    }

}
}

var styles = StyleSheet.create({
  view: {
    top:0,
    bottom:0,
    left:0,
    right:0,
  },
  backgroundVideo: {
    width:playerDefaultWidth,
    height:playerDefaultHeight,
    backgroundColor:'black',
  },
  buttonBox:{
    position:'absolute',
    top:-(playerDefaultHeight),
    alignItems: 'center',
    justifyContent: 'center',
    width:playerDefaultWidth,
    height:playerDefaultHeight
  },
  playButton:{
    width:20,
    height:20,
    backgroundColor:'rgba(0,0,0,1)'
  },
  playButtonBox:{
    width:20,
    height:20
  },
  bottomBox:{
    width:playerDefaultWidth,
    height:20,
    left:0,
    top:-20,
    position:'absolute',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  sliderStyle:{
    height:20,
    width:playerDefaultWidth-120,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  trackStyle:{
    width:playerDefaultWidth-120,
    height:2
  },
  thumbStyle:{
    backgroundColor:'#fff',
    width:10,
    height:10
  },
  time:{
    color:'#fff',
    width:40,
    textAlign: 'center',
    justifyContent: 'center',
    height:20,
    paddingTop:5,
    fontSize:8,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  button:{
    backgroundColor:'rgba(0,0,0,1)'
  }
});

module.exports = M3U8Tool;
