import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { CHANGE_THEME } from "./types";

const initialState = {
  isDarkTheme: false,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }

    case CHANGE_THEME: {
      return {
        isDarkTheme: action.payload.isDarkTheme,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
