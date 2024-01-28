import { GET_CONTENT } from "../actions/types";

const initialState = { content: "" };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTENT:
      return { 
        ...state,
        content : payload.content 
      }

    default:
      return state;
  }
}

/**
 * dispatch({
          type: GET_CONTENT,
          payload: { content: response.data }
        })
 */