import React, { useContext, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Styles from "../Styles";
import { createBook } from "../../Services/book.api";
import GlobalContext from "../../Utils/Context";
import { Picker } from "@react-native-picker/picker";
import { AuthorI } from "../../Types/Types";
import CheckBox from "@react-native-community/checkbox";
import { Ionicons } from "@expo/vector-icons";

const intitalBook = {
  id: "",
  title: "",
  genre: "",
  category: "",
  authorIDs: [] as string[],
  publisherId: "",
};

function AddBookScreen({ navigation }: any) {
  const [book, setBook] = useState(intitalBook);
  const { books, setBooks, publishers, authors } = useContext(GlobalContext);
  const [seletedPublisherId, setSeletedPublisherId] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  const handleAdd = async () => {
    const { title, genre, category } = book;

    if (!title || !genre || !category) {
      alert("Please fill in all fields");
      return;
    }
    const updatedBook = {
      ...book,
      publisherId: seletedPublisherId,
      authorIDs: selectedAuthors,
    };

    // console.log("New Book is ---- ", updatedBook);
    // console.log("Author's is ---- ", selectedAuthors);
    setBook(updatedBook);

    try {
      // console.log("API Book ", book);

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

  interface CheckboxAuthorProps {
    author: AuthorI;
    isSelected: boolean;
    onToggle: (authorId: string) => void;
  }

  const CheckboxAuthor = ({
    author,
    isSelected,
    onToggle,
  }: CheckboxAuthorProps) => {
    const toggleCheckbox = () => {
      onToggle(author.id);
    };
    return (
      <TouchableOpacity onPress={toggleCheckbox}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isSelected ? (
            <Ionicons name="checkbox-outline" size={24} color="green" />
          ) : (
            <Ionicons name="square-outline" size={24} color="black" />
          )}
          <Text>{author.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleToggleAuthor = (authorId: string) => {
    if (selectedAuthors.includes(authorId)) {
      setSelectedAuthors(selectedAuthors.filter((id) => id !== authorId));
    } else {
      setSelectedAuthors([...selectedAuthors, authorId]);
    }
  };

  return (
    <View>
      {/* <Text style={Styles.title}>Add New Book</Text> */}
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

      <View>
        <Text style={Styles.title}>Authors:</Text>
        {authors.map((author) => (
          <CheckboxAuthor
            key={author.id}
            author={author}
            isSelected={selectedAuthors.includes(author.id)}
            onToggle={handleToggleAuthor}
          />
        ))}
      </View>

      <Picker
        selectedValue={seletedPublisherId}
        onValueChange={(itemValue, itemIndex) =>
          setSeletedPublisherId(itemValue)
        }
        style={{ width: "100%" }}
      >
        {publishers.map((publisher) => (
          <Picker.Item
            key={publisher.id}
            label={`${publisher.name}`}
            value={`${publisher.id}`}
          />
        ))}
      </Picker>
      {/* <TextInput
        style={Styles.input}
        placeholder="Authors: Seperate with ,"
        value={book.authorIDs.toLocaleString()}
        onChangeText={(text) => setBook({ ...book, authorIDs: `${text}` })}
      /> */}
      <Pressable style={Styles.button} onPress={handleAdd}>
        <Text style={Styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  checkboxText: {
    marginTop: 10,
  },
});

export default AddBookScreen;
