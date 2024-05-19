import { useContext, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

import Styles from "../Styles";
import { createBook } from "../../Services/book.api";
import GlobalContext from "../../Utils/Context";
import { v4 as uuidv4 } from "uuid";
import { Picker } from "@react-native-picker/picker";

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
  const { books, setBooks, publishers } = useContext(GlobalContext);
  const [seletedPublisherId, setSeletedPublisherId] = useState("");

  const handleAdd = async () => {
    const { title, genre, category, publisherId } = book;

    if (!title || !genre || !category || !publisherId) {
      alert("Please fill in all fields");
      return;
    }
    const updatedBook = { ...book, publisherId: seletedPublisherId };
    console.log("Id ---->> ", seletedPublisherId);
    console.log("New Book is ---- ", updatedBook);
    setBook(updatedBook);

    try {
      console.log("API Book ", book);

      const res = await createBook(updatedBook);
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
      <Picker
        selectedValue={seletedPublisherId}
        onValueChange={(itemValue, itemIndex) =>
          setSeletedPublisherId(itemValue)
        }
        style={{ width: "100%" }}
      >
        {publishers.map((publisher) => (
          <Picker.Item label={`${publisher.name}`} value={`${publisher.id}`} />
        ))}
      </Picker>
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
