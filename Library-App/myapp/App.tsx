import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { BookI } from "./Types/Types";
import { getBooks } from "./Services/book.api";
import GlobalContext from "./Utils/Context";
import HomeScreen from "./Components/HomeScreen";
import About from "./Components/About";

export default function App() {
  const [books, setBooks] = useState<BookI[]>([]);
  const { Navigator, Screen } = createBottomTabNavigator();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        console.log(await getBooks());
        setBooks(await getBooks());
      } catch (error) {
        console.log("Error Loading data: ", error);
      }
    };
    loadBooks();
  }, []);

  return (
    <GlobalContext.Provider value={{ books, setBooks }}>
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen
            name="Books"
            component={HomeScreen}
            options={{
              title: "Books",
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
    alignItems: "center",
    justifyContent: "center",
  },
});
