import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";

import { BookI } from "../../Types/Types";
import GlobalContext from "../../Utils/Context";
import Book from "./Book";
import AddBookButton from "./AddBookButton";

import Styles from "../Styles";

export default function HomeScreen({ navigation }: any) {
  const { books } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const [displayList, setDisplayList] = useState<BookI[]>([]);

  useEffect(() => {
    if (search.trim() === "") {
      setDisplayList(books);
    } else {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().trim().includes(search.toLowerCase())
      );
      setDisplayList(filteredBooks);
    }
  }, [search, books]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={Styles.headerText}>Books</Text>
        <TextInput
          style={Styles.input}
          placeholder="Live Serach"
          value={search}
          onChangeText={(text: string) => setSearch(text)}
        />
      </View>
      <AddBookButton />
      <FlatList
        data={displayList}
        renderItem={({ item, index }) => <Book data={item} index={index} />}
        keyExtractor={(item) => item.id!}
      />
      <View style={styles.bottomContainer}>
        <ScrollView horizontal>
          <View style={styles.horizontalContainer}>
            <Pressable
              style={styles.horizontalContainerButton}
              onPress={() => navigation.navigate("author-list")}
            >
              <Text style={styles.horizontalContainerButtonText}>Authors</Text>
            </Pressable>
            <Pressable
              style={styles.horizontalContainerButton}
              onPress={() => navigation.navigate("publisher-list")}
            >
              <Text style={styles.horizontalContainerButtonText}>
                Publishers
              </Text>
            </Pressable>
            <Pressable
              style={styles.horizontalContainerButton}
              onPress={() => navigation.navigate("member-list")}
            >
              <Text style={styles.horizontalContainerButtonText}>Members</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingBottom: 200,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  horizontalContainer: {
    justifyContent: "center",
    flexDirection: "row",
    height: 60,
  },

  horizontalContainerButtonText: {
    // maxHeight: 20,

    fontSize: 15,
    paddingBottom: 6,
    textAlign: "center",
    color: "#616060",
  },

  horizontalContainerButton: {
    height: 40,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E7E5E6",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5",
  },
});
