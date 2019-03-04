import * as types from './actionTypes';

export const initialState = {
  monsters: [],
  characters: [],
  encounters: [],
  isFetching: false,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MONSTERS_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });
    }
    case types.FETCH_MONSTERS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        monsters: action.monsters
      });
    }
    case types.FETCH_MONSTERS_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    }
    case types.FETCH_CHARACTERS_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });
    }
    case types.FETCH_CHARACTERS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        characters: action.characters
      });
    }
    case types.FETCH_CHARACTERS_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    }
    case types.FETCH_ENCOUNTERS_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });
    }
    case types.FETCH_ENCOUNTERS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        encounters: action.encounters
      });
    }
    case types.FETCH_ENCOUNTERS_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    }
    default:
      return state;
  }
}
