import React, {PropTypes} from 'react';
import {
  StyleSheet,
  ListView,
  View,
  ListViewDataSource
} from 'react-native';

const WeightListView = React.createClass({
  propTypes: {
    formData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  },

  render() {
    const weightList = this.props.formData.entrySeq().filter(
      (key, value) =>
      key !== 'weight'
    ).map(
      (key, value) =>
      key + ': ' + value
    );
    return (
      <View style={styles.container}>
        Weight:
        <ListView
          dataSource={new ListViewDataSource(weightList)}
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
