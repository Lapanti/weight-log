import React, {PropTypes} from 'react';
import {
  Text
} from 'react-native';

const Row = React.createClass({
  propTypes: {
    date: PropTypes.string,
    weight: PropTypes.string
  },

  render() {
    return (
      <Text>{this.props.date}: {this.props.weight}</Text>
    );
  }
});

export default Row;
