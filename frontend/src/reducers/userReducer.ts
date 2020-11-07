import { AUTH_USER } from "./../actions/types";

class User {
  id: String | undefined;
  username: String | undefined;
  email: String | undefined;
}

const user: User | null = null;

export default function userReducer(state = user, action: any) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
