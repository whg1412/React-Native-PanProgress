import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
  Alert,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
// 渐变
// import LinearGradient from 'react-native-linear-gradient';

const topData = Platform.OS === 'ios' ? 5 : 0;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 65,
    backgroundColor: 'white',
  },
  // 标题背景
  titleBackStyle: {
    height: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // 标题样式
  titleStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  // 进度条背景
  progressBackStyle: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 30,
    width: screenWidth - 30 - 40,
  },
  // 进度条灰色背景
  propgressGrayStyle: {
    borderRadius: 10,
    width: screenWidth - 30 - 40,
    height: 20,
    backgroundColor: 'rgb(245,245,245)',
  },
  // 拖拽按钮
  panButtonStyle: {
    width: 32,
    height: 32,
    backgroundColor: 'rgb(51,51,51)',
    borderRadius: 16,
    zIndex: 1,
    position: 'absolute',
    left: 30,
    top: 33,
    marginLeft: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 百分数文字
  panButtonTextStyle: {
    color: 'rgb(255,255,255)',
    fontSize: 12,
    fontFamily: 'DIN Condensed',
    marginTop: topData,
  },
});

export default class PanProgressLayoutWhg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveProgress: props.defaultProgress,
    };
  }

  componentWillMount() {
    this.watcher = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => this.onPanResponderGrant(e, gestureState),
      onPanResponderMove: (e, gestureState) => this.onPanResponderMove(e, gestureState),
      onPanResponderEnd: (e, gestureState) => this.onPanResponderEnd(e, gestureState),
    });
  }

  // TODO: 按下手势
  onPanResponderGrant(e, gestureState) {
    this.startx = gestureState.x0;
  }

  // TODO: 移动
  onPanResponderMove(e, gestureState) {
    const touchPointX = gestureState.moveX;
    let progress = 0;
      if (touchPointX > (screenWidth - 40 )) {
        progress = 1;
      }else if (touchPointX < 30 || (this.startx < 62 && touchPointX < this.startx)) {
        progress = 0;
      }else {
        progress = (touchPointX - 30) / (screenWidth - 30 - 40);
      }
    this.setState({
      moveProgress: progress,
    });
  }

  // TODO: 移动结束
  onPanResponderEnd(e, gestureState) {
    this.props.passValueFunc(Math.round(this.state.moveProgress * 100));
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBackStyle}>
          <Text style={styles.titleStyle}>
            {this.props.titleStr}
          </Text>
          {this.props.optionString !== '' &&
            <Text style={{ fontSize: 10, color: 'rgb(153,153,153)' }}>{this.props.optionString}</Text>
          }
        </View>

        <View style={styles.progressBackStyle}>
          <View style={styles.propgressGrayStyle}>
            {/* <LinearGradient style={{ width: (screenWidth - 30 - 40) * this.state.moveProgress, height: 20, borderRadius: 10, backgroundColor: 'red' }} colors={['rgb(254,144,111)', 'rgb(255,82,102)']} /> */}
            <View style={{ backgroundColor: 'red', width: (screenWidth - 30 - 40) * this.state.moveProgress, height: 20, borderRadius: 10 }} />
          </View>
        </View>
        <View style={[styles.panButtonStyle, { left: this.state.moveProgress * (screenWidth - 30 - 40 - 32) }]}>
          <Text style={styles.panButtonTextStyle}>
            {String(Math.round(this.state.moveProgress * 100)) + '%'}
          </Text>
        </View>
        <View
          style={{ width: 32, height: 32, backgroundColor: 'transparent', position: 'absolute', left: this.state.moveProgress * (screenWidth - 30 - 40 - 32), top: 33, zIndex: 2, marginLeft: 30 }}
          {...this.watcher.panHandlers}
        />
      </View>
    );
  }
}

PanProgressLayoutWhg.propTypes = {
  titleStr: PropTypes.string,
  optionString: PropTypes.string,
  passValueFunc: PropTypes.func,
  defaultProgress: PropTypes.number,
};

PanProgressLayoutWhg.defaultProps = {
  titleStr: '成功率',
  optionString: '',
  passValueFunc: () => {},
  defaultProgress: 0,
};
