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
   Navigator,
 } from 'react-native';

 import NavigatorBar from './app/components/NavigatorBar'

 var Main = require('./app/Main');

 class MyNBA extends Component {

   renderScene (route, navigator) {
    if (route.component) {
      const Component = route.component
      return <Component {...route.params} navigator={navigator} route={route} {...this.props} />
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

AppRegistry.registerComponent('MyNBA', () => MyNBA);
