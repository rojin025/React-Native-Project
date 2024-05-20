import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AuthorI, BookI, PublisherI } from "./Types/Types";
import { getBooks } from "./Services/book.api";
import GlobalContext from "./Utils/Context";
import Home from "./Components/Home";
import About from "./Components/About";
import { getAuthors } from "./Services/author.api";
import { getPublishers } from "./Services/publisher.api";
import Login from "./Components/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_STORAGE_KEY } from "./Components/constants";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [books, setBooks] = useState<BookI[]>([]);
  const [authors, setAuthors] = useState<AuthorI[]>([]);
  const [publishers, setPublishers] = useState<PublisherI[]>([]);

  const { Navigator, Screen } = createBottomTabNavigator();

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const isLoggedIn = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
      if (isLoggedIn) {
        const user = JSON.parse(isLoggedIn);
        setLoggedIn(user.loggedIn);
      }
    };
    checkIsLoggedIn();

    const loadBooks = async () => {
      try {
        setBooks(await getBooks());
      } catch (error) {
        console.log("Error Loading Books: ", error);
      }
    };
    loadBooks();

    const loadAuthors = async () => {
      try {
        setAuthors(await getAuthors());
      } catch (error) {
        console.log("Error Loading Authors: ", error);
      }
    };
    loadAuthors();

    const loadPublishers = async () => {
      try {
        setPublishers(await getPublishers());
        console.log("Loading Pub", publishers);
      } catch (error) {
        console.log("Error Loading Publishers: ", error);
      }
    };
    loadPublishers();
  }, []);

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  return (
    <GlobalContext.Provider
      value={{
        setLoggedIn,
        books,
        setBooks,
        authors,
        setAuthors,
        publishers,
        setPublishers,
      }}
    >
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen
            name="Books"
            component={Home}
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
