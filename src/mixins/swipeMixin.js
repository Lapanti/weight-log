const ReactNative = require('react-native');
const {
  PanResponder
} = ReactNative;

const SwipeMixin = {
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (evt, gestureState) => {
        this._swipe(gestureState.moveX);
      }
    });
  }
};
