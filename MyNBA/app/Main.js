

import React, { Component , PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image,
} from 'react-native';


// var M3U8Tool = require('./tool/M3U8Tool');
var VideoPlay = require('./VideoPlay');

var dataArr = new Array();
let page = 1;
class Main extends Component {
  constructor(props) {
   super(props);
   var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   this.state = {
     isLoading: false,
     moreData: true,
     message : '',
     dataSource: dataSource.cloneWithRows([]),
   };
 }
 componentDidMount(){
   this._loadDataFuction();
 }


 renderRow(rowData, sectionID, rowID) {
 // var count = rowData.view_count;
 var bigThumbnail = rowData.img;
 return (
   <TouchableHighlight onPress={() => this._rowPressed(rowData)}
       underlayColor='#dddddd'>
     <View>
       <View style={styles.rowContainer}>
         <Image style={styles.thumb} source={{ uri: bigThumbnail }} />
         <View  style={styles.textContainer}>
           <Text style={styles.title} numberOfLines={2}>{rowData.title}</Text>
            <Text style={styles.count} >播放:{10}</Text>
         </View>
       </View>
       <View style={styles.separator}/>
     </View>
   </TouchableHighlight>
 );
}


 render() {
   return (
     <View style={{flex: 1}}>
       <View style={{flexDirection: 'row',height: 64,backgroundColor: '#FF5745',justifyContent: 'center',alignItems: 'center'}}>
          <Text style={{marginTop:10 ,textAlign:'center', color:'white',fontSize: 17}}>首页</Text>
       </View>
       <ListView
         dataSource={this.state.dataSource}
         enableEmptySections={ true}
         onEndReached = {this._onEndReached.bind(this)}
         renderRow={this.renderRow.bind(this)}/>
    </View>
   );

 }
 _onEndReached(){
   console.log('scroll end');
   if (!this.state.isLoading && this.state.moreData) {
     page += 1;
     this._loadDataFuction();
   }
 }

_loadDataFuction(){
  this.setState({ isLoading: true , message: '' });
  var query = 'https://nba.xianng.com/api?func=getVideoList&page='+page;
  return fetch(query)
  .then(response => response.json())
  .then(json => this._handleResponse(json))
  .catch(error =>
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   })
  );
 };

 _handleResponse(json) {
  this.setState({ isLoading: false , message: '' });
  console.log('stop loading');

  if (json.data.length > 0 ) {
    Array.prototype.push.apply(dataArr, json.data);
    var dataSource = this.state.dataSource;
    this.setState({dataSource: dataSource.cloneWithRows(dataArr)});
  } else {
    this.setState({ message: 'No more Data',moreData:false});
  }
 }

 _rowPressed(rowData){
   this.props.navigator.push({
      title: rowData.title,
      component:VideoPlay,
      params:{
        videoItem:rowData
      }
    });
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
