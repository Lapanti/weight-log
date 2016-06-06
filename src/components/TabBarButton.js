import React, {PropTypes} from 'react';
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default React.createClass({
  displayName: 'TabBarButton',
  propTypes: {
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  },
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.action}
        style={styles.button}
        >
        <Icon
          name={this.props.text}
          size={20}
          style={[styles.buttonIcon, this.props.isSelected && styles.selected]}
          />
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  selected: {
    color: 'green'
  },
  buttonIcon: {
    color: 'white'
  }
});
