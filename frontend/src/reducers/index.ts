
import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import userReducer from './userReducer';

export default combineReducers({
    user: userReducer,
    filter: filterReducer
});