import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Link = "http://192.168.1.103:3000";

export const setDidTryAL = () => {
  return { type: "AUTO_LOGIN_TRIED" };
};

export const tryAutoLogin = (refreshToken) => {
  return async (dispatch) => {
    axios
      .post(
        `${Link}/tokenRefresh`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
      .then(async (res) => {
        await AsyncStorage.setItem("Access_Token", res.data.accessToken);

        dispatch({
          type: "AUTHENTICATE",
          token: res.data.accessToken,
          userData: res.data.user,
        });
        return;
      })
      .catch((err) => {
        dispatch(setDidTryAL());
        return;
      });
  };
};

export const signup = (username, email, password) => {
  return async (dispatch) => {
    axios
      .post(
        `${Link}/SignUp`,
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
        await AsyncStorage.setItem("Access_Token", res.data.accessToken);
        await AsyncStorage.setItem("Refresh_Token", res.data.refreshToken);

        dispatch({
          type: "AUTHENTICATE",
          token: res.data.accessToken,
          userData: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    axios
      .post(
        `${Link}/LogIn`,
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
        await AsyncStorage.setItem("Access_Token", res.data.accessToken);
        await AsyncStorage.setItem("Refresh_Token", res.data.refreshToken);

        dispatch({
          type: "AUTHENTICATE",
          token: res.data.accessToken,
          userData: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const logout = () => {
  return async (dispatch) => {
    const refreshToken = await AsyncStorage.getItem("Refresh_Token");
    axios
      .post(
        `${Link}/LogOut`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
      .then(async (res) => {
        await AsyncStorage.removeItem("Access_Token");
        await AsyncStorage.removeItem("Refresh_Token");

        dispatch({
          type: "LOGOUT",
        });
      })
      .catch((err) => console.log(err));
  };
};

export const tokenRefresh = () => {
  return async (dispatch) => {
    const refreshToken = await AsyncStorage.getItem("Refresh_Token");
    axios
      .post(
        `${Link}/tokenRefresh`,
        {
          refreshToken,
        },
        {
          headers: {
            "Content-type": "application/json",
            // Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
      .then(async (res) => {
        await AsyncStorage.setItem("Access_Token", res.data.accessToken);

        dispatch({
          type: "TOKEN_REFRESH",
          accessToken,
        });
      })
      .catch((err) => console.log(err));
  };
};
