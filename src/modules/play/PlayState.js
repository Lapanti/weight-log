import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  gameNumber: 1,
  holeNumber: 1,
  hole1: Map(),
  saving: false,
  savingGame: false
});

// Actions
const END_GAME = 'PlayState/END_GAME';
const END_HOLE = 'PlayState/END_HOLE';
const ADD_HIT = 'PlayState/ADD_HIT';
const SAVE_COMPLETE = 'PlayState/SAVE_COMPLETE';

// Types of hit
export const HITTYPES = {
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
        state.set('savingGame', true).set('saving', true).update('gameNumber', number => number + 1),
        Effects.promise(saveComplete)
      );

    case END_HOLE: {
      const newHoleNumber = state.get('holeNumber') + 1;
      return state.set('holeNumber', newHoleNumber).set('hole' + newHoleNumber, Map());
    }

    case ADD_HIT: {
      const holeName = 'hole' + state.get('holeNumber');
      return state.update(holeName, holeMap => holeMap.set(holeMap.size + 1, action.payload));
    }

    case SAVE_COMPLETE:
      return state.set('savingGame', false).set('saving', false);

    default:
      return state;
  }
}
