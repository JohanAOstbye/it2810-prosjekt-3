import { 
    CHANGE_TERM
} from './../actions/types';

const defaultState = {
    term: ''
}

export default function termReducer(state = defaultState, action: any) {
switch (action.type) {
    case CHANGE_TERM: 
        return { 
            ...state,  
            term: action.payload
        }
    default:
        return state;
}
}