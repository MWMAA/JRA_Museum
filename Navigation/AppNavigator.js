import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthScreen } from "../Screens/user/AuthScreen";
import { NavigationContainer } from "@react-navigation/native";
import { MuseumNavigator } from "./MuseumNavigator";

import StartupScreen from "../Screens/StartupScreen";

const AppNavigator = (props) => {
  const token = useSelector((state) => !!state.user.token);
  const didTryLogin = useSelector((state) => state.user.didTryAutoLogin);

  return (
    <NavigationContainer>
      {token && <MuseumNavigator />}
      {!token && didTryLogin && <AuthScreen />}
      {!token && !didTryLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
