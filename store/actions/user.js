import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signup = (username, email, password) => {
  return async (dispatch) => {
    axios
      .post(
        "http://192.168.1.103:3000/SignUp",
        {
          name: username,
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then(async (res) => {
        await AsyncStorage.setItem("Access_Token", res.data.token);
        dispatch({
          type: "AUTHENTICATE",
          token: res.data.token,
          userData: { username, email },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    axios
      .post(
        "http://192.168.1.103:3000/LogIn",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then(async (res) => {
        await AsyncStorage.setItem("Access_Token", res.data.token);
        dispatch({
          type: "AUTHENTICATE",
          token: res.data.token,
          userData: {
            username: res.data.user.username,
            email: res.data.user.email,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};
