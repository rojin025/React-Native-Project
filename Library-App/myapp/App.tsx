import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LOCAL_STORAGE_KEY } from "./Components/constants";
import { AuthorI, BookI, CatalogI, PublisherI } from "./Types/Types";
import Home from "./Components/Home";
import About from "./Components/AboutScreen";
import Login from "./Components/LoginScreen";
import AboutScreen from "./Components/UserScreen";

import GlobalContext from "./Utils/Context";
import { getBooks } from "./Services/book.api";
import { getAuthors } from "./Services/author.api";
import { getPublishers } from "./Services/publisher.api";
import { getCatalogs } from "./Services/catalogs.api";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [books, setBooks] = useState<BookI[]>([]);
  const [catalogs, setCatalogs] = useState<CatalogI[]>([]);
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
    // checkIsLoggedIn();

    const loadBooks = async () => {
      try {
        setBooks(await getBooks());
      } catch (error) {
        console.log("Error Loading Books: ", error);
      }
    };
    loadBooks();

    const loadCatalogs = async () => {
      try {
        setCatalogs(await getCatalogs());
      } catch (error) {
        console.log("Error Loading Books: ", error);
      }
    };
    loadCatalogs();

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
        catalogs,
        setCatalogs,
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
            component={AboutScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="heart" color={color} size={24} />
              ),
            }}
          />
          <Screen
            name="User"
            component={About}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="cog-outline"
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
