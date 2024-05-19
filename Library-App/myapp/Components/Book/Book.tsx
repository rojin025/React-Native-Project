import React, { useContext, useState } from "react";

import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BookI } from "../../Types/Types";
import { deleteBook } from "../../Services/book.api";
import GlobalContext from "../../Utils/Context";
import showConfirmation from "../../Utils/Confirmation";

interface props {
  data: BookI;
  index: number;
}

function Book({ data, index }: props) {
  const { title, genre, category } = data;
  const { books, setBooks } = useContext(GlobalContext);
  const navigation = useNavigation();

  const handleNavToBookDetails = () => {
    navigation.navigate("book-details", data);
  };

  const askDeleteConfirmation = () => {
    showConfirmation(
      "Delete",
      "Are you sure?",
      () => handleDelete(),
      () => {
        console.log("cancelled");
      }
    );
    const handleDelete = async () => {
      try {
        const res = await deleteBook(data.id);
        if (res) {
          console.log("res", res);
          const updatedBooks = books.filter((book) => book.id !== data.id);
          setBooks(updatedBooks);
        }
      } catch (error) {}
    };
  };

  const handleEdit = () => {
    navigation.navigate("update-book", data);
  };

  return (
    <View style={{ backgroundColor: index % 2 === 0 ? "white" : "lightgrey" }}>
      <View style={styles.row}>
        <View style={styles.course}>
          <Text>{title}</Text>
          <Text style={styles.faculty}>
            {genre} - {category}
          </Text>
        </View>

        <View style={styles.edges}>
          <TouchableHighlight
            onPress={handleNavToBookDetails}
            style={styles.button}
            underlayColor="#5398DC"
          >
            <Text style={styles.buttonText}>Details</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={askDeleteConfirmation}
            style={styles.deleteButton}
            underlayColor="red"
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={handleEdit}
            style={styles.button}
            underlayColor="Green"
          >
            <Text style={styles.buttonText}> Edit </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  edges: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    minWidth: 50,
  },
  stars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5,
    minWidth: 50,
  },
  course: {
    flexDirection: "column",
    flex: 8,
  },
  faculty: {
    color: "grey",
  },
  button: {
    borderWidth: 1,
    borderColor: "#0066CC",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "red",
    marginBottom: 5,
  },
  buttonText: {
    color: "#0066CC",
    fontSize: 12,
    textAlign: "center",
  },
  info: {
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});

export default Book;
