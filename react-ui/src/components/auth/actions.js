import * as types from './actionTypes';
import base64 from 'base-64';
import { API_BASE_URL } from '../../config';

export const login = (user, password) => dispatch => {
  dispatch(loginRequest());

  let headers = new Headers();
  headers.append(
    'Authorization',
    'Basic ' + base64.encode(user + ':' + password)
  );

  fetch(`${API_BASE_URL}/login`, {
    method: 'GET',
    headers
  })
    .then(response => {
      if (!response.ok) {
        return { error: true, message: 'Bad authentication credentials' };
      }

      return response.json();
    })
    .then(json => {
      if (json.error) {
        return dispatch(loginFailure(json.error));
      }

      dispatch(loginSuccess(json));
    })
    .catch(err => {
      console.log('Error in login action');
      console.error(err);
    });
};

export const loginRequest = () => ({
  type: types.LOGIN_REQUEST
});

export const loginSuccess = user => ({
  type: types.LOGIN_SUCCESS,
  user: user.user,
  password: user.pass
});

export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  error: error
});
