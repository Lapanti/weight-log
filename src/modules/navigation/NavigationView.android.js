import React from 'react';
import {
  View,
  PropTypes,
  StyleSheet
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

  onPageSelected(e) {
    this.props.switchTab(e.nativeEvent.position);
  },

  go(page) {
    this.viewPager.setPage(page);
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
<<<<<<< HEAD:src/modules/navigation/NavigationView.js
=======
        <ViewPagerAndroid
          style={[styles.container, styles.viewContainer]}
          initialPage={0}
          onPageSelected={this.onPageSelected}
          ref={viewPager => { this.viewPager = viewPager; }}>
          {tabs}
        </ViewPagerAndroid>
>>>>>>> master:src/modules/navigation/NavigationView.android.js
        <TabBar
          height={TAB_BAR_HEIGHT}
          tabs={children}
          currentTabIndex={index}
          switchTab={this.props.switchTab}
<<<<<<< HEAD:src/modules/navigation/NavigationView.js
=======
          selectTab={this.go}
>>>>>>> master:src/modules/navigation/NavigationView.android.js
        />
        <View style={styles.container}>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: TAB_BAR_HEIGHT
  },
  hidden: {
    overflow: 'hidden',
    width: 0,
    height: 0
  }
});

export default NavigationView;
