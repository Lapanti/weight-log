import React, {PropTypes} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Chart from 'react-native-chart';

const moment = require('moment');

const ChartView = React.createClass({
  propTypes: {
    history: PropTypes.object.isRequired
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
    const data = this.props.history.sort(this.compare).map(
      (weightData) =>
      [weightData.get('date'), weightData.get('weight')]
    ).toJS();
    console.log('Data: ', data);
    return (
      <View style={styles.container}>
        <Chart
          style={styles.chart}
          data={data.length !== 0 ? data : [['0', '0']]}
          type='line'
          />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  chart: {
    height: 200,
    width: 200
  }
});

export default ChartView;
