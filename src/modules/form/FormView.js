import * as FormState from './FormState';
import * as WeightState from '../weight/WeightState';
import Toast from '../../components/Toast';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import DatePicker from 'react-native-datepicker';

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
      this._successToast.showToast();
    } else {
      this._failToast.showToast();
    }
  },

  setSuccessToast(toast) {
    this._successToast = toast;
  },

  setFailToast(toast) {
    this._failToast = toast;
  },

  render() {
    const weight = this.props.weight;
    const valid = weight !== '' && !isNaN(Number(weight));

    return (
      <View style={styles.container}>
        <Toast
          toastColor='green'
          message='Saved'
          ref={(toast) => this.setSuccessToast(toast)}
          />
        <Toast
          toastColor='red'
          message='Not valid'
          ref={(toast) => this.setFailToast(toast)}
          />
        <DatePicker
          style={[styles.generalInput, styles.dateInput]}
          date={this.props.date}
          mode='date'
          format='D.M.YYYY'
          maxDate={moment().format('D-M-YYYY')}
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          showIcon={false}
          onDateChange={(newDate) => this.props.dispatch(FormState.setDate(newDate))}
          />
        <TextInput
          value={weight}
          keyboardType='number-pad'
          onChangeText={(newWeight) => this.props.dispatch(FormState.setWeight(newWeight, valid))}
          style={[styles.generalInput, styles.textInput, valid ? styles.okay : styles.error]}
          />
        <Text
          onPress={this.save}
          style={[styles.submitButton]}
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
  generalInput: {
    alignSelf: 'center',
    height: 40,
    borderWidth: 1,
    borderRadius: 5
  },
  dateInput: {
    margin: 20,
    width: 100
  },
  textInput: {
    textAlign: 'center',
    margin: 20,
    width: 50
  },
  submitButton: {
    alignSelf: 'center',
    margin: 20
  },
  okay: {
    borderColor: 'green'
  },
  error: {
    borderColor: 'red'
  }
});

export default FormView;
