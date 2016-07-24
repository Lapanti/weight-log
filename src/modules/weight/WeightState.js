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
      const i = state.findIndex((weightData) => weightData.get('date') === newDate);
      if (i >= 0) {
        return state.set(i, Map({date: newDate, weight: newWeight}));
      } else {
        return state.push(Map({date: newDate, weight: newWeight}));
      }
    }

    default:
      return state;
  }
}
