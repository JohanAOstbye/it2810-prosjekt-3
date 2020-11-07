import Filter from '../helperClasses/filter';
import { 
    CHANGE_FILTER
} from './../actions/types';

const initialState: Filter = {
    pokemonId: { $lte: null, $gte: null},
    name: { $regex: "" },
    weight: { $lte: null, $gte: null},
    height: { $lte: null, $gte: null}
  }

export default function filterReducer(state = initialState, action: any) {
switch (action.type) {
    case CHANGE_FILTER:
        
        return { 
            ...state,  
            pokemonId: action.payload.pokemonId,
            name:{ $regex: action.payload.name },
            weight: action.payload.weight,
            height: action.payload.height
        }
    default:
        return state;
}
}