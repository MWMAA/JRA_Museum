import React from "react";
import { Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await dispatch(authActions.logout());
    //   token = await AsyncStorage.getItem("Access_Token");
    //   console.log(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Button title="logout" onPress={logoutHandler} />
    </View>
  );
};

export const screenOptions = (navdata) => {
  return {
    headerTitle: "Settings",
  };
};

export default SettingsScreen;
