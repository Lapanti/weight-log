import React, {PropTypes} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ViewPagerAndroid,
  Platform
} from 'react-native';
import AppRouter from '../AppRouter';
import NavigationTabView from './NavigationTabView';
import TabBar from '../../components/TabBar';

const TAB_BAR_HEIGHT = 50;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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
    if (Platform.OS === 'ios') {
      this.scrollView.scrollTo({
        y: 0,
        x: page * WIDTH,
        animated: true
      });
    } else if (Platform.OS === 'android') {
      this.viewPager.setPage(page);
    }
  },

  eventToIndex(e) {
    return parseInt(e.nativeEvent.contentOffset.x / WIDTH);
  },

  onMomentumScrollEnd(e) {
    this.props.switchTab(this.eventToIndex(e));
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

    const androidView = (
      <ViewPagerAndroid
        style={[styles.container, styles.viewContainer]}
        initialPage={0}
        onPageSelected={this.onPageSelected}
        ref={viewPager => { this.viewPager = viewPager; }}>
        {tabs}
      </ViewPagerAndroid>
    );

    const iosView = (
      <ScrollView
        style={styles.container}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        horizontal={true}
        pagingEnabled={true}
        snapToAlignment='start'
        contentContainerStyle={styles.container}
        centerContent={true}
        ref={scrollView => { this.scrollView = scrollView; }}>
        {tabs}
      </ScrollView>
    );

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ? iosView : androidView}
        <TabBar
          height={TAB_BAR_HEIGHT}
          tabs={children}
          currentTabIndex={index}
          switchTab={this.props.switchTab}
          selectTab={this.go}
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
    flex: 1,
    width: WIDTH,
    height: HEIGHT - TAB_BAR_HEIGHT,
    margin: 0
  }
});

export default NavigationView;
