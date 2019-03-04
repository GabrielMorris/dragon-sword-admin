import * as types from './actionTypes';
import { API_BASE_URL } from '../../config';

/* === Monsters === */
export const fetchMonsters = () => dispatch => {
  dispatch(monstersRequest());

  fetch(`${API_BASE_URL}/monsters`)
    .then(response => {
      if (!response.ok) {
        return dispatch(monstersFailure('Error fetching monsters'));
      }

      return response.json();
    })
    .then(monsters => dispatch(monstersSuccess(monsters)));
};

export const monstersRequest = () => ({
  type: types.FETCH_MONSTERS_REQUEST
});

export const monstersSuccess = monsters => ({
  type: types.FETCH_MONSTERS_SUCCESS,
  monsters
});

export const monstersFailure = error => ({
  type: types.FETCH_MONSTERS_FAILURE,
  error
});

/* === Characters === */
export const fetchCharacters = () => dispatch => {
  dispatch(charactersRequest());

  fetch(`${API_BASE_URL}/characters`)
    .then(response => {
      if (!response.ok) {
        return dispatch(charactersFailure('Error fetching characters'));
      }

      return response.json();
    })
    .then(characters => dispatch(charactersSuccess(characters)));
};

export const charactersRequest = () => ({
  type: types.FETCH_CHARACTERS_REQUEST
});

export const charactersSuccess = characters => ({
  type: types.FETCH_CHARACTERS_SUCCESS,
  characters
});

export const charactersFailure = error => ({
  type: types.FETCH_CHARACTERS_FAILURE,
  error
});

/* === Encounters === */
export const fetchEncounters = () => dispatch => {
  dispatch(encountersRequest());

  fetch(`${API_BASE_URL}/encounters`)
    .then(response => {
      if (!response.ok) {
        return dispatch(encountersFailure('Error fetching encounters'));
      }

      return response.json();
    })
    .then(encounters => dispatch(encountersSuccess(encounters)));
};

export const encountersRequest = () => ({
  type: types.FETCH_ENCOUNTERS_REQUEST
});

export const encountersSuccess = encounters => ({
  type: types.FETCH_ENCOUNTERS_SUCCESS,
  encounters
});

export const encountersFailure = error => ({
  type: types.FETCH_ENCOUNTERS_FAILURE,
  error
});
