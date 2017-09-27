/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import PanProgressLayoutWhg from './PanProgressLayoutWhg'

var Dimensions = require('Dimensions');
let widthOfMargin = Dimensions.get('window').width * 0.05;
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;


export default class ProgressTest extends Component {
  constructor(props) {
    super(props);
  }


  


render() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <PanProgressLayoutWhg
        defaultProgress={0.5}
        optionString={'－选填'}
        passValueFunc={value => {
          // this.businessInfo.successrate = value / 100;
        }}
      />
    </View>
  );
}
}


AppRegistry.registerComponent('RnProject', () => ProgressTest);
