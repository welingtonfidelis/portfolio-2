import { createWrapper } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";

import language from "./language/reducers";
import theme from "./theme/reducers";

const reducers = combineReducers({
  language,
  theme
});

const makeStore = () => {
  const store = createStore(reducers);

  return store;
};

export const storeWrapper = createWrapper(makeStore);
