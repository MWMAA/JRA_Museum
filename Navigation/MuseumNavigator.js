import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import ArtifactDetailScreen from "../Screens/Artifacts/ArtifactDetailScreen";
import ArtifactListScreen from "../Screens/Artifacts/ArtifactListScreen";
import HomeScreen from "../Screens/HomeScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "blue" : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "blue",
};

const MuseumStackNavigator = createNativeStackNavigator();

export const MuseumNavigator = () => {
  return (
    <MuseumStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <MuseumStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        // options={ProdOverviewOptions}
      />
      <MuseumStackNavigator.Screen
        name="Artifacts"
        component={ArtifactListScreen}
        // options={ProdDetailOptions}
      />
      <MuseumStackNavigator.Screen
        name="Artifact Detail"
        component={ArtifactDetailScreen}
        // options={CartScreenOptions}
      />
    </MuseumStackNavigator.Navigator>
  );
};
