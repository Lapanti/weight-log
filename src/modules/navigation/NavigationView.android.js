import React from 'react';
import {
  View,
  PropTypes,
  StyleSheet,
  ViewPagerAndroid
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
    switchTab: PropTypes.func.isRequired
  },

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
        <ViewPagerAndroid
          style={styles.container}
          initialPage={0}
          ref={viewPager => { this.viewPager = viewPager; }}>
          {tabs}
        </ViewPagerAndroid>
        <TabBar
          height={TAB_BAR_HEIGHT}
          tabs={children}
          currentTabIndex={index}
          switchTab={this.props.switchTab}
        />
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
