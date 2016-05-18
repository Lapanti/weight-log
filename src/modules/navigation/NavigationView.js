import React from 'react';
import {
  View,
  PropTypes,
  StyleSheet,
  PanResponder,
  Dimensions
} from 'react-native';
import AppRouter from '../AppRouter';
import NavigationTabView from './NavigationTabView';
import TabBar from '../../components/TabBar';

const TAB_BAR_HEIGHT = 50;

const NavigationView = React.createClass({
  propTypes: {
    router: PropTypes.func.isRequired,
    navigationState: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired,
    switchTab: PropTypes.func.isRequired,
    swipeTab: PropTypes.func.isRequired
  },

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        var width = Dimensions.get('window').width;
        if (gestureState.dx > (width / 2)) {
          if (gestureState.moveX > (gestureState.x0)) {
            this.props.swipeTab(-1);
          }
          if (gestureState.moveX < (gestureState.x0)) {
            this.props.swipeTab(1);
          }
        }
      }
    });
  },

  _panResponder: {},

  render() {
    const {children, index} = this.props.navigationState;
    const tabs = children.map((tabState, tabIndex) => {
      return (
        <View key={'tab' + tabIndex} style={[styles.viewContainer, index !== tabIndex && styles.hidden]}>
          <NavigationTabView
            router={AppRouter}
            navigationState={tabState}
            onNavigate={this.props.onNavigate}
          />
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <TabBar
          height={TAB_BAR_HEIGHT}
          tabs={children}
          currentTabIndex={index}
          switchTab={this.props.switchTab}
        />
        <View style={styles.container} {...this._panResponder.panHandlers}>
          {tabs}
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewContainer: {
    position: 'absolute',
    top: TAB_BAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0
  },
  hidden: {
    overflow: 'hidden',
    width: 0,
    height: 0
  }
});

export default NavigationView;
