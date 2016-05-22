import {Map, OrderedSet} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  number: 1,
  holes: OrderedSet(initialHole()),
  saving: false,
  savingGame: false
});

function initialHole() {
  return OrderedSet();
}

// Actions
const END_GAME = 'PlayState/END_GAME';
const END_HOLE = 'PlayState/END_HOLE';
const ADD_HIT = 'PlayState/ADD_HIT';
const SAVE_COMPLETE = 'PlayState/SAVE_COMPLETE';

// Types of hit
const HITTYPES = {
  DEFAULT: 'Hit',
  TEE: 'Tee',
  ROUGH: 'Rough',
  FAIRWAY: 'Fairway',
  BUNKER: 'Bunker',
  GREEN: 'Green',
  PENALTY: 'Penalty'
};

export function endGame() {
  return {
    type: END_GAME
  };
}

export function endHole() {
  return {
    type: END_HOLE
  };
}

export function addHit(hittype) {
  return {
    type: ADD_HIT,
    payload: hittype
  };
}

export async function saveComplete() {
  return {
    type: SAVE_COMPLETE
  };
}

// Reducer
export default function PlayStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case END_GAME:
      return loop(
        state.set('savingGame', true).set('saving', true).update('number', number => number + 1),
        Effects.promise(saveComplete)
      );

    case END_HOLE:
      return state.update('holes', holes => holes.add(initialHole(holes.size)));

    case ADD_HIT:
      state.holes.last().hits.add(action.payload);
      return state;

    case SAVE_COMPLETE:
      return state.set('savingGame', false).set('saving', false);

    default:
      return state;
  }
}
