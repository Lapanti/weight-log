import {Map, List} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  game: 1,
  holes: List(initialHole(1)),
  saving: false,
  savingGame: false
});

function initialHole(holeNumber) {
  return Map({
    number: holeNumber,
    total: 0,
    tee: 0,
    rough: 0,
    fairway: 0,
    bunker: 0,
    green: 0,
    penalty: 0
  });
}

// Actions
const END_GAME = 'PlayState/END_GAME';
const END_HOLE = 'PlayState/END_HOLE';
const ADD_TOTAL = 'PlayState/ADD_TOTAL';
const ADD_TEE = 'PlayState/ADD_TEE';
const ADD_ROUGH = 'PlayState/ADD_ROUGH';
const ADD_FAIRWAY = 'PlayState/ADD_FAIRWAY';
const ADD_BUNKER = 'PlayState/ADD_BUNKER';
const ADD_GREEN = 'PlayState/ADD_GREEN';
const ADD_PENALTY = 'PlayState/ADD_PENALTY';
const SAVE_COMPLETE = 'PlayState/SAVE_COMPLETE';

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

export function addTotal() {
  return {
    type: ADD_TOTAL
  };
}

export function addTee() {
  return {
    type: ADD_TEE
  };
}

export function addRough() {
  return {
    type: ADD_ROUGH
  };
}

export function addFairway() {
  return {
    type: ADD_FAIRWAY
  };
}

export function addBunker() {
  return {
    type: ADD_BUNKER
  };
}

export function addGreen() {
  return {
    type: ADD_GREEN
  };
}

export function addPenalty() {
  return {
    type: ADD_PENALTY
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
        state.set('savingGame', true).set('saving', true),
        Effects.promise(saveComplete)
      );

    case END_HOLE:
      return loop(
        state
          .set('savingGame', false)
          .set('saving', true)
          .update('holes', holes => holes.push(initialHole(holes.size))),
        Effects.promise(saveComplete)
      );

    case ADD_TOTAL:
      return state.update('total', total => total + 1);

    case ADD_TEE:
      return state.update('total', total => total + 1).update('tee', tee => tee + 1);

    case ADD_ROUGH:
      return state.update('total', total => total + 1).update('rough', rough => rough + 1);

    case ADD_FAIRWAY:
      return state.update('total', total => total + 1).update('fairway', fairway => fairway + 1);

    case ADD_BUNKER:
      return state.update('total', total => total + 1).update('bunker', bunker => bunker + 1);

    case ADD_GREEN:
      return state.update('total', total => total + 1).update('green', green => green + 1);

    case ADD_PENALTY:
      return state.update('total', total => total + 1).update('penalty', penalty => penalty + 1);

    case SAVE_COMPLETE:
      return state.set('savingGame', false).set('saving', false);

    default:
      return state;
  }
}
