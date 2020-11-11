import Filter from "../helperClasses/filter";
import { CHANGE_FILTER } from "./../actions/types";

export const initialState: Filter = new Filter();

export default function filterReducer(state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        pokemonId: action.payload.pokemonId,
        name: action.payload.name,
        weight: action.payload.weight,
        height: action.payload.height,
        orderby: action.payload.orderby
      };
    default:
      return state;
  }
}
