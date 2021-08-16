import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { CHANGE_LANGUAGE } from "./types";

const initialState = {
  language: "en",
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }

    case CHANGE_LANGUAGE: {
      return {
        language: action.payload.language,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
