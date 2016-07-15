import {Map} from 'immutable';

// Initial state
const initialState = Map({
  weight: ''
});

// Actions
const ADD_WEIGHT = 'FormState/ADD_WEIGHT';
const SET_WEIGHT = 'FormState/SET_WEIGHT';

export function addWeight(date, weight) {
  return {
    type: ADD_WEIGHT,
    payload: {
      key: date,
      value: weight
    }
  };
}

export function setWeight(weight) {
  return {
    type: SET_WEIGHT,
    payload: weight
  };
}

// Reducer
export default function FormStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_WEIGHT: {
      return state.set(action.payload.key, action.payload.value);
    }

    case SET_WEIGHT:
      return state.set('weight', action.payload);

    default:
      return state;
  }
}
