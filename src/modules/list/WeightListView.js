import React, {PropTypes} from 'react';
import {
  StyleSheet,
  ListView,
  View,
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

  getInitialState() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return {dataSource: ds.cloneWithRows(this.props.history.map(this.format).sort(this.compare))};
  },

  format(weightData) {
    return {
      date: weightData.get('date'),
      weight: weightData.get('weight')
    };
  },

  compare(a, b) {
    const aD = moment(a.date, 'D.M.YYYY').valueOf();
    const bD = moment(b.date, 'D.M.YYYY').valueOf();
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

  renderRow(rowData) {
    const rowDataDefined = typeof rowData !== 'undefined';
    const rDate = rowDataDefined ? moment(rowData.date).format('D.M.YYYY') : '';
    const rWeight = rowDataDefined ? rowData.weight : '';
    return (<Row date={rDate} weight={rWeight} />);
  },

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
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
  }
});

export default WeightListView;
