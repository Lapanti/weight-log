import {Map} from 'immutable';

const moment = require('moment');

// Initial state
const initialState = Map({
  valid: false,
  date: moment().format('D.M.YYYY'),
  weight: ''
});

// Actions
const SET_DATE = 'FormState/SET_DATE';
const SET_WEIGHT = 'FormState/SET_WEIGHT';

export function setDate(date) {
  return {
    type: SET_DATE,
    payload: date
  };
}

export function setWeight(wweight, vvalid) {
  return {
    type: SET_WEIGHT,
    payload: {
      weight: wweight,
      valid: vvalid
    }
  };
}

// Reducer
export default function FormStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DATE: {
      return state.set('date', action.payload);
    }

    case SET_WEIGHT:
      return state.set('weight', action.payload.weight).set('valid', action.payload.valid);

    default:
      return state;
  }
}
