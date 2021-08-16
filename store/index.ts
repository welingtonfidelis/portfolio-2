import { createWrapper } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";

import language from "./language/reducers";

const reducers = combineReducers({
  language,
});

const makeStore = () => {
  const store = createStore(reducers);

  return store;
};

export const storeWrapper = createWrapper(makeStore);
