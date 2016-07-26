import React, {PropTypes} from 'react';
import {
  Animated,
  StyleSheet,
  Text
} from 'react-native';

// Inspiration / basis
// from https://medium.com/@dabit3/creating-a-custom-toast-module-for-react-native-770fd1c0dcf5#.nnv4br1b3
const Toast = React.createClass({
  propTypes: {
    toastColor: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      modalShown: false
    };
  },

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  },

  showToast() {
    if (this.state.modalShown) {
      return;
    }
    this.setState({modalShown: true});
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 500
      }
    ).start(this.hideToast());
  },

  hideToast() {
    setTimeout(() => {
      this.setState({modalShown: false});
      Animated.timing(
        this.animatedValue,
        {
          toValue: 0,
          duration: 350
        }
      ).start();
    }, 500);
  },

  render() {
    const animation = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [-70, -10, 0]
    });
    return (
      <Animated.View
        style={[
          styles.animatedView,
          {backgroundColor: this.props.toastColor},
          {transform: [{translateY: animation}]}
        ]}
        >
        <Text
          style={[styles.messageText]}
          >
          {this.props.message}
        </Text>
      </Animated.View>
    );
  }
});

const styles = StyleSheet.create({
  animatedView: {
    height: 70,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    justifyContent: 'center'
  },
  messageText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Toast;
