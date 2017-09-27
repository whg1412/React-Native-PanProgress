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
  TextInput
} from 'react-native';

var Dimensions = require('Dimensions');
let widthOfMargin = Dimensions.get('window').width * 0.05;
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class WaitingPage extends Component {
  /**构造函数 */
  constructor(props) {
    super(props);
    /**成员变量(与ui无关,与业务逻辑有关) */
    this.propertys1 = '成员变量';
    this.propertys = '成员变量2';
    

    /**定义状态(与ui刷新有关的变量) */
    this.state = {
        inputedMobile:'',
        inputedPd:''

    }
  }

  /**属性的更新方法,该方法直接调用setState */
  updateNum(nextText) {
    this.setState( (state) => {
      return{inputedMobile:nextText};
    });
  }

  updatePd(newText) {
    this.state(() => {
      return {inputedPd:newText};
    });
  }

  /**判断是否渲染,渲染前调用此函数 */
  shouldComponentUpdate() {
    /**如果输入的手机号长度大于3,不重新渲染 */
    if (this.state.inputedMobile.length > 3) return false;
      return true;
  }




  render() {
    return (
      <View style={styles.container}>
         <TextInput 
              placeholder={'请输入手机号'} 
              style={styles.textInputStyle}
              /**内容改变就执行 */
              onChangeText={(newText) => this.updateNum(newText)}>
         </TextInput> 
         <Text style={styles.textStyle}>您输入的手机号: {this.state.inputedMobile}</Text> 
         <TextInput placeholder={'请输入密码'} style={styles.textInputStyle}></TextInput> 
        <Text style={styles.loginTextStyle}>登录</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInputStyle: {
      marginTop:widthOfMargin,
      backgroundColor:'gray',
      height:25,
      fontSize:15,
      width:screenWidth-40,
  },
  textStyle: {
    marginTop:10,
    alignSelf:'flex-start',
    marginLeft:20
  },
  loginTextStyle: {
    marginTop:20,
    backgroundColor:'blue',
    width:screenWidth-40,
    fontSize:35,
    textAlign:'center',
    color:'white'


  }

});
