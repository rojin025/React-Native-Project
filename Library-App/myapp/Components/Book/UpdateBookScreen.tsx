import { useContext, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

import Styles from "../Styles";
import { createBook, updateBook } from "../../Services/book.api";
import GlobalContext from "../../Utils/Context";
import { BookI } from "../../Types/Types";

function UpdateBookScreen({ navigation, route }: any) {
  const [book, setBook] = useState(route.params);
  const { books, setBooks } = useContext(GlobalContext);

  const handleUpdate = async () => {
    try {
      const res = await updateBook(book.id!, book);
      if (res) {
        const index = books.findIndex((x) => x.id === book.id);
        if (index !== -1) {
          const updatedBooks = [...books];
          updatedBooks[index] = res;
          setBooks(updatedBooks);
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <View>
      <Text style={Styles.title}>Add New Book</Text>
      <TextInput
        style={Styles.input}
        placeholder="Title:"
        value={book.title}
        onChangeText={(text) =>
          setBook({ ...book, title: text, id: Date.now().toString() })
        }
      />
      <TextInput
        style={Styles.input}
        placeholder="Genre:"
        value={book.genre}
        onChangeText={(text) => setBook({ ...book, genre: text })}
      />
      <TextInput
        style={Styles.input}
        placeholder="Category:"
        value={book.category}
        onChangeText={(text) => setBook({ ...book, category: text })}
      />
      <TextInput
        style={Styles.input}
        placeholder="PublisherId:"
        value={book.publisherId}
        onChangeText={(text) => setBook({ ...book, publisherId: text })}
      />
      {/* <TextInput
        style={Styles.input}
        placeholder="Authors: Seperate with ,"
        value={book.authorIDs.toLocaleString()}
        onChangeText={(text) => setBook({ ...book, authorIDs: `${text}` })}
      /> */}
      <Pressable style={Styles.button} onPress={handleUpdate}>
        <Text style={Styles.addButtonText}>Update</Text>
      </Pressable>
    </View>
  );
}
export default UpdateBookScreen;
