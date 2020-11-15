import User from "../helperClasses/user";
import { AUTH_USER } from "./../actions/types";

const initialUser: User | null = null;

export default function userReducer(state = initialUser, action: any) {
  switch (action.type) {
    case AUTH_USER:
      if(action.payload == null) return null;
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        id: action.payload.id
      };
    default:
      return state;
  }
}
