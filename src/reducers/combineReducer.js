import { combineReducers } from 'redux';
import eventReducer from './eventsReducer';
import fetchReducer from './fetchReducer';

const rootReducer = combineReducers({
  addEvents: eventReducer,
  fetch: fetchReducer,
});

export default rootReducer;