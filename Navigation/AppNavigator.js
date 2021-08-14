import React from "react";
import { useSelector } from "react-redux";
import { AuthScreen } from "../Screens/user/AuthScreen";
import { NavigationContainer } from "@react-navigation/native";
import { MuseumNavigator } from "./MuseumNavigator";

const AppNavigator = (props) => {
  const token = useSelector((state) => state.user.token);
  return (
    <NavigationContainer>
      {!token && <AuthScreen />}
      {token && <MuseumNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
