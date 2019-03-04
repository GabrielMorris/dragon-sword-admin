import * as types from './actionTypes';

export const initialState = {
  user: null,
  password: null,
  isAuthenticated: false,
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
        isAuthenticated: true,
        isFetching: false,
        error: null
      });
    }
    case types.LOGIN_FAILURE: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        isFetching: false,
        error: action.error
      });
    }
    default:
      return state;
  }
}
