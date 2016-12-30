import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Navigator,
  Platform,
  Linking,
} from 'react-native';

import {
 isFirstTime,
 isRolledBack,
 packageVersion,
 currentVersion,
 checkUpdate,
 downloadUpdate,
 switchVersion,
 switchVersionLater,
 markSuccess,
} from 'react-native-update';

import _updateConfig from '../update.json';
const {appKey} = _updateConfig[Platform.OS];

import NavigatorBar from './components/NavigatorBar'
var Main = require('./Main');

export default class MyNBA extends Component {

  componentWillMount(){

     checkUpdate(appKey).then(info => {
        if (info.expired) {
         //  Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
         //    {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
         //  ]);
        } else if (info.upToDate) {

        } else {
         //  Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
         //    {text: '是', onPress: ()=>{this.doUpdate(info)}},
         //    {text: '否',},
         //  ]);
         this.doUpdate(info);
        }
       }).catch(err => {

       });

  }

  doUpdate(info) {
     downloadUpdate(info).then(hash => {
       Alert.alert('提示', '下载完毕,是否重启应用?', [
         {text: '是', onPress: ()=>{switchVersion(hash);}},
         {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
       ]);
     }).catch(err => {
       Alert.alert('提示', '更新失败.'+err);
     });
   }


  renderScene (route, navigator) {
   if (route.component) {
     const Component = route.component
     return <Component {...route.passProps} navigator={navigator} route={route} {...this.props} />
   }
 }


  render() {
    return (
      <Navigator
        style={styles.container}
        barTintColor='#FF5745'
        initialRoute={{
          title: '首页',
          component:Main
        }}
        navigationBar={<NavigatorBar />}
        renderScene={this.renderScene.bind(this)}
        />

    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});
