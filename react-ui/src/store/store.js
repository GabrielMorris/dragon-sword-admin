import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import authReducer from '../components/auth/reducer';

// Redux form
import { reducer as formReducer } from 'redux-form';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    auth: authReducer,
    form: formReducer
  }),
  composeEnhancer(applyMiddleware(thunk))
);
