import * as FormState from './FormState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

const moment = require('moment');

const FormView = React.createClass({
  propTypes: {
    weight: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  },

  render() {
    const weight = this.props.weight;
    const valid = weight !== '' && !isNaN(Number(weight));

    return (
      <View style={styles.container}>
        <Text>
          {moment().format('D.M.YYYY')}
        </Text>
        <TextInput
          value={weight}
          keyboardType='number-pad'
          onChangeText={(newWeight) => this.props.dispatch(FormState.setWeight(newWeight))}
          style={[styles.textInput, valid ? styles.okay : styles.error]}
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
  textInput: {
    alignSelf: 'center',
    margin: 20,
    height: 40,
    width: 50,
    borderWidth: 1,
    textAlign: 'center'
  },
  okay: {
    borderColor: 'green'
  },
  error: {
    borderColor: 'red'
  }
});

export default FormView;
