import { useContext, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

import Styles from "../Styles";
import { createBook } from "../../Services/book.api";
import GlobalContext from "../../Utils/Context";
import { v4 as uuidv4 } from "uuid";

const intitalBook = {
  id: "",
  title: "",
  genre: "",
  category: "",
  authorIDs: [],
  publisherId: "",
};

function AddBookScreen({ navigation }: any) {
  const [book, setBook] = useState(intitalBook);
  const { books, setBooks } = useContext(GlobalContext);

  const handleAdd = async () => {
    const { title, genre, category, publisherId } = book;

    if (!title || !genre || !category || !publisherId) {
      alert("Please fill in all fields");
      return;
    }

    try {
      console.log("API Book ", book);

      const res = await createBook(book);
      if (res) {
        setBooks([...books, res]);
        navigation.goBack();
      } else {
        Alert.alert("Failed to add.");
      }
    } catch (error) {
      console.log(error);
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
      <Pressable style={Styles.button} onPress={handleAdd}>
        <Text style={Styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
  );
}
export default AddBookScreen;
