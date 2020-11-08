import Filter from "./filter";
import User from "./user";

export default class ReduxState {
    user: null | User = null
    filter: Filter = new Filter()
}
