import { applyMiddleware, createStore } from "redux";
import itemsReducer from "../Reducers/items.reducer";
import { thunk } from "redux-thunk";


const store = createStore(itemsReducer, applyMiddleware(thunk));

export default store;