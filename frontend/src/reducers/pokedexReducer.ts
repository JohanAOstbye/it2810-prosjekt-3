import { SHOW_POKEDEX } from "./../actions/types";

const initialState: {pokedex:boolean} = {pokedex:false}

export default function pokedexReducer(state = initialState, action: any) {
  switch (action.type) {
    case SHOW_POKEDEX:
      return {
          state,
        show: action.payload.show
      };
    default:
      return state;
  }
}