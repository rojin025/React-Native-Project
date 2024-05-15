import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ICourse from "./components/ICourse";
import GlobalContext from "./Context";
import HomeScreen from "./components/HomeScreen";
import About from "./components/About";

import Data from "./Data";

export default function App() {
  const courseData: ICourse[] = Data;
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await AsyncStorage.getItem("course-app");
        if (data) {
          const arr = JSON.parse(data);
          setCourses(arr);
        } else {
          setCourses(courseData);
        }
      } catch (error) {
        console.log("Error Loading data: ", error);
      }
    };
    loadCourses();
  }, [courses]);

  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <GlobalContext.Provider value={{ courses, setCourses }}>
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen
            name="Courses"
            component={HomeScreen}
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
