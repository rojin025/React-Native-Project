import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ICourse from "./components/ICourse";
import GlobalContext from "./Context";
import Home from "./components/Home";
import About from "./components/About";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Data from "./Data";

export default function App() {
  const data: ICourse[] = Data;
  const [courses, setCourses] = useState<ICourse[]>(data);

  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <GlobalContext.Provider value={{ courses, setCourses }}>
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen
            name="Courses"
            component={Home}
            options={{
              title: "Course",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={24} />
              ),
            }}
          />
          <Screen
            name="About us"
            component={About}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={24}
                />
              ),
            }}
          />
        </Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
});
