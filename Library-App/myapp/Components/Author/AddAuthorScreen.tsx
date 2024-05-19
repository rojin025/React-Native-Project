import { useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import Styles from "../Styles";

const initialAuthor = {
  id: "",
  name: "",
  phone: "",
  email: "",
};

function AddAuthorScreen() {
  const [author, setAuthor] = useState(initialAuthor);

  const handleAdd = () => {
    console.log("Adding author", author);
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Add Authors</Text>
      <TextInput
        placeholder="Name:"
        style={Styles.input}
        value={author.name}
        onChangeText={(text) =>
          setAuthor((prev) => ({
            ...prev,
            name: text,
            id: Date.now().toString(),
          }))
        }
      />
      <TextInput
        placeholder="Phone:"
        style={Styles.input}
        value={author.phone}
        onChangeText={(text) => setAuthor((prev) => ({ ...prev, phone: text }))}
      />
      <TextInput
        placeholder="Email:"
        style={Styles.input}
        value={author.email}
        onChangeText={(text) => setAuthor((prev) => ({ ...prev, email: text }))}
      />
      <Pressable style={Styles.button} onPress={handleAdd}>
        <Text style={Styles.buttonText}>Add Author</Text>
      </Pressable>
    </View>
  );
}

export default AddAuthorScreen;
