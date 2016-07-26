import React, {PropTypes} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import Row from './Row';

const moment = require('moment');

const WeightListView = React.createClass({
  propTypes: {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  },

  compare(a, b) {
    const aD = moment(a.get('date'), 'D.M.YYYY').valueOf();
    const bD = moment(b.get('date'), 'D.M.YYYY').valueOf();
    if (aD < bD) {
      return -1;
    }
    else if (aD > bD) {
      return 1;
    }
    else {
      return 0;
    }
  },

  render() {
    if (this.props.history.count() > 0) {
      const weightRows = this.props.history.sort(this.compare).map(
        (historySpot, key) =>
        (<Row key={key} date={historySpot.get('date')} weight={historySpot.get('weight')}/>)
      );
      return (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.rowContainer}>
            {weightRows}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.rowContainer}>
            <Text>
              No history yet
            </Text>
          </View>
        </ScrollView>
      );
    }
  }
});

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    height: 300
  },
  rowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100
  }
});

export default WeightListView;
