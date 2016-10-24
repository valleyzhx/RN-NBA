/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   NavigatorIOS,
 } from 'react-native';

 var Main = require('./app/Main');
 var M3U8Tool = require('./app/tool/M3U8Tool');

 class HelloWorldApp extends Component {
   render() {
     return (
       <Text>Hello world!</Text>
     );
   }
 }



 class MyNBA extends Component {
   render() {
     return (
       <NavigatorIOS
         style={styles.container}
         barTintColor='#FF5745'
         initialRoute={{
           title: '首页',
           component:M3U8Tool
         }}/>

     );
   }
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('MyNBA', () => MyNBA);
