
import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import userReducer from './userReducer';
import pokedexReducer from './pokedexReducer';


const rootReducer = combineReducers({
    user: userReducer,
    filter: filterReducer,
    pokedex: pokedexReducer
});
export default rootReducer