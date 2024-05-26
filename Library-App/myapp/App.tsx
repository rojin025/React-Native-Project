import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LOCAL_STORAGE_KEY } from "./Components/constants";
import {
  AuthorI,
  BookI,
  CatalogI,
  MemberI,
  PublisherI,
  TransactionI,
} from "./Types/Types";
import Home from "./Components/Home";
import About from "./Components/AboutScreen";
import Login from "./Components/LoginScreen";
import AboutScreen from "./Components/ProcessScreen";

import GlobalContext from "./Utils/Context";
import { getBooks } from "./Services/book.api";
import { getAuthors } from "./Services/author.api";
import { getPublishers } from "./Services/publisher.api";
import { getCatalogs } from "./Services/catalogs.api";
import { getEntities } from "./Services/service.api";
import Process from "./Components/ProcessScreen";
import ProcessScreen from "./Components/ProcessScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [books, setBooks] = useState<BookI[]>([]);
  const [catalogs, setCatalogs] = useState<CatalogI[]>([]);
  const [authors, setAuthors] = useState<AuthorI[]>([]);
  const [publishers, setPublishers] = useState<PublisherI[]>([]);
  const [members, setMembers] = useState<MemberI[]>([]);
  const [transactions, setTransactions] = useState<TransactionI[]>([]);

  const { Navigator, Screen } = createDrawerNavigator();

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
        // console.log("Loading Pub", publishers);
      } catch (error) {
        console.log("Error Loading Publishers: ", error);
      }
    };
    loadPublishers();

    const loadMembers = async () => {
      try {
        setMembers(await getEntities("members"));
        // console.log("Loaded Members: ", members);
      } catch (error) {
        console.log(error);
      }
    };
    loadMembers();

    const loadTransaction = async () => {
      try {
        setTransactions(await getEntities("transactions"));
        // console.log("Loaded Members: ", members);
      } catch (error) {
        console.log(error);
      }
    };
    loadTransaction();
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
        members,
        setMembers,
        transactions,
        setTransactions,
      }}
    >
      <NavigationContainer>
        <Navigator initialRouteName="Process">
          <Screen
            name="Books"
            component={Home}
            options={{
              title: "Books",
            }}
          />
          <Screen name="Process" component={ProcessScreen} />
          <Screen name="User" component={About} />
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
