import axios from "axios";
import { config } from "../appConfiig/config";

const GETMESSAGE_API_URL = config.base_url + config.getWelcomeMessage

const user = JSON.parse(localStorage.getItem("user"))

const getWelcomeMessage = () => {
  return axios.get(GETMESSAGE_API_URL, {
    headers: {
      "Authorization": `Bearer ${user ? user.accessToken : 'notoken'}`
    }
  })
  .then(response => {
    console.log("Home content data: ", response)
    return response.data
  });
};

export default {
  getWelcomeMessage
}