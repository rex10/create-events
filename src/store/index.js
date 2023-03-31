import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import eventsReducer from '../reducers/eventsReducer';

const store = createStore(eventsReducer, applyMiddleware(thunk));

export default store;