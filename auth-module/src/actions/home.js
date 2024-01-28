import { GET_CONTENT, SET_MESSAGE } from "./types";
import  HomeService  from '../services/home.service'

export const getWelcomeMessage = () => (dispatch) => {
  return HomeService.getWelcomeMessage().then(
    (response) => {
      if (response.statusCode === 200) {
        dispatch({
          type: GET_CONTENT,
          payload: { content: response.data.content }
        })
        return Promise.resolve();
      }
      else {
        const message = response.message || "Something went wrong!"
        dispatch({
          type: SET_MESSAGE,
          payload: message
        })
        return Promise.reject()
      } 
    }
  )
  };