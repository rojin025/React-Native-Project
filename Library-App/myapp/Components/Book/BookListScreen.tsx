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
} from "react-native";

import { BookI } from "../../Types/Types";
import GlobalContext from "../../Utils/Context";
import Book from "./Book";
import AddBookButton from "./AddBookButton";

import Styles from "../Styles";

export default function BookListScreen({ navigation }: any) {
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
        {/* <Header /> */}
        <Text>Book Review</Text>
        <TextInput
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
      <View>
        <Pressable
          style={Styles.button}
          onPress={() => navigation.navigate("author-list")}
        >
          <Text style={Styles.addButtonText}>Authors</Text>
        </Pressable>
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
