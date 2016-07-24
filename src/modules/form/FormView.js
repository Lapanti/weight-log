import * as FormState from './FormState';
import * as WeightState from '../weight/WeightState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  ToastAndroid
} from 'react-native';

const moment = require('moment');

const FormView = React.createClass({
  propTypes: {
    valid: PropTypes.bool.isRequired,
    weight: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  },

  save() {
    if (this.props.valid) {
      this.props.dispatch(WeightState.setWeight(this.props.date, this.props.weight));
    }
    if (Platform.OS === 'android') {
      ToastAndroid.show('Weight saved', ToastAndroid.SHORT);
    }
  },

  render() {
    const weight = this.props.weight;
    const valid = weight !== '' && !isNaN(Number(weight));

    return (
      <View style={styles.container}>
        <Text>
          {this.props.date}
        </Text>
        <TextInput
          value={weight}
          keyboardType='number-pad'
          onChangeText={(newWeight) => this.props.dispatch(FormState.setWeight(newWeight, valid))}
          style={[styles.textInput, valid ? styles.okay : styles.error]}
          />
        <Text
          onPress={this.save}
          style={[styles.submitButton, valid ? styles.okay : styles.error]}
          >
          Save
        </Text>
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
  submitButton: {
    alignSelf: 'center',
    margin: 20,
    borderWidth: 1
  },
  okay: {
    borderColor: 'green'
  },
  error: {
    borderColor: 'red'
  }
});

export default FormView;
