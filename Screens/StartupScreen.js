import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../store/actions/user";
import { useDispatch } from "react-redux";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const refreshToken = await AsyncStorage.getItem("Refresh_Token");
      if (refreshToken) {
        try {
          dispatch(authActions.tryAutoLogin(refreshToken));
        } catch (err) {
          console.log(err);
        }

        return;
      } else {
        dispatch(authActions.setDidTryAL());
        return;
      }
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>iSAME</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
});

export default StartupScreen;
