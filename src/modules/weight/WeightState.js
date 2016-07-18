import {List, Map} from 'immutable';

// Initial state
const initialState = List();

// Actions
const SET_WEIGHT = 'WeightState/SET_WEIGHT';

export function setWeight(date, weight) {
  return {
    type: SET_WEIGHT,
    payload: {
      key: date,
      value: weight
    }
  };
}

// Reducer
export default function WeightStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_WEIGHT: {
      const newDate = action.payload.key;
      const newWeight = action.payload.value;
      return state.update(state.findIndex((obj) => obj.date === newDate),
        Map({date: newDate, weight: newWeight}),
        (v) => v
      );
    }

    default:
      return state;
  }
}
