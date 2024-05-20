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
        <Text style={Styles.title}>Books</Text>
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
            <Text style={styles.horizontalContainerButtonText}>Publishers</Text>
          </Pressable>
        </View>
      </ScrollView>
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
  horizontalContainer: {
    flexDirection: "row",
  },

  horizontalContainerButtonText: {
    fontSize: 15,
    paddingBottom: 6,
    textAlign: "center",
    color: "white",
  },

  horizontalContainerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "lightblue",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
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
