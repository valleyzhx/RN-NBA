

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image,
} from 'react-native';

class Main extends Component {

  constructor(props) {
   super(props);
   var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   this.state = {
     isLoading: false,
     message : '',
     dataSource: dataSource.cloneWithRows([]),
   };
 }
 componentDidMount(){
    this._loadDataFuction();
 }


 renderRow(rowData, sectionID, rowID) {
 var count = rowData.view_count;
 var bigThumbnail = rowData.bigThumbnail;
 return (
   <TouchableHighlight /*onPress={() => this.rowPressed(rowData.id)}*/
       underlayColor='#dddddd'>
     <View>
       <View style={styles.rowContainer}>
         <Image style={styles.thumb} source={{ uri: bigThumbnail }} />
         <View  style={styles.textContainer}>
           <Text style={styles.title} numberOfLines={2}>{rowData.title}</Text>
           <Text style={styles.count} >播放:{count}</Text>
         </View>
       </View>
       <View style={styles.separator}/>
     </View>
   </TouchableHighlight>
 );
}


 render() {
   return (
     <ListView
       dataSource={this.state.dataSource}
       enableEmptySections={ true}
       renderRow={this.renderRow.bind(this)}/>
   );
 }

_loadDataFuction(){
  console.log('start loading');
  var query = 'https://openapi.youku.com/v2/searches/video/by_keyword.json?client_id=e2306ead120d2e34&keyword=nba&category=%E4%BD%93%E8%82%B2&page=10';
  return fetch(query)
  .then(response => response.json())
  .then(json => this._handleResponse(json))
  .catch(error =>
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));
 };

 _handleResponse(json) {
  this.setState({ isLoading: false , message: '' });
  console.log('stop loading');

  if (json.videos.length > 0 ) {
    console.log('Properties found: ' + json.videos.length);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: dataSource.cloneWithRows(json.videos)});
  } else {
    this.setState({ message: 'Location not recognized; please try again.'});
  }
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  thumb: {
   width: 80,
   height: 80,
   marginRight: 10
 },
 textContainer: {
   flex: 1
 },
 separator: {
   height: 1,
   backgroundColor: '#dddddd'
 },
 count: {
   fontSize: 16,
   fontWeight: 'bold',
   color: '#48BBEC',
 },
 title: {
   fontSize: 16,
   color: '#656565',

 },
 rowContainer: {
   flexDirection: 'row',
   padding: 10
 }
});

module.exports = Main;
