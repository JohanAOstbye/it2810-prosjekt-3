import { 
    CHANGE_TERM
} from './../actions/types';

const initialState = {
    term: ''
}

export default function termReducer(state = initialState, action: any) {
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