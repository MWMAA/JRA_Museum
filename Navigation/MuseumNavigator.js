import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ArtifactDetailScreen from "../Screens/Artifacts/ArtifactDetailScreen";
import ArtifactListScreen from "../Screens/Artifacts/ArtifactListScreen";
import HomeScreen from "../Screens/HomeScreen";
import CameraComponent from "../components/cameraComponent";
import SettingsScreen, {
  screenOptions as SettingScreeenOptions,
} from "../Screens/SettingsScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "white" : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "black" : "black",
};

const MuseumStackNavigator = createNativeStackNavigator();

const StackNavigator = () => {
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

const tabBarOption = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Camera") {
      iconName = "camera-outline";
    } else if (route.name === "Museum") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "Settings") {
      iconName = focused ? "list" : "list-outline";
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const BottomDrawer = createBottomTabNavigator();
export const MuseumNavigator = () => {
  return (
    <BottomDrawer.Navigator screenOptions={tabBarOption}>
      <BottomDrawer.Screen name="Museum" component={StackNavigator} />
      <BottomDrawer.Screen
        name="Camera"
        component={CameraComponent}
        options={{
          tabBarStyle: { display: "none" },
          tabBarShowLabel: false,
        }}
      />
      <BottomDrawer.Screen name="Settings" component={SettingsNavigator} />
    </BottomDrawer.Navigator>
  );
};

const SettingsStackNavigator = createNativeStackNavigator();

export const SettingsNavigator = () => {
  return (
    <SettingsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SettingsStackNavigator.Screen
        name="Configurations"
        component={SettingsScreen}
        options={SettingScreeenOptions}
      />
    </SettingsStackNavigator.Navigator>
  );
};
