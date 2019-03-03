import * as types from './actionTypes';

export const initialState = {
  user: null,
  password: null,
  isFetching: false,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });
    }
    case types.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        user: action.user,
        password: action.password,
        isFetching: false,
        error: null
      });
    }
    case types.LOGIN_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    }
    default:
      return state;
  }
}
