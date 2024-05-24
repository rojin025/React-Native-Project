import { useContext, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import GlobalContext from "../../Utils/Context";
import { createAuthor } from "../../Services/author.api";

import Styles from "../Styles";

const initialAuthor = {
  id: "",
  name: "",
  phone: "",
  email: "",
};

function AddAuthorScreen({ navigation }: any) {
  const { authors, setAuthors } = useContext(GlobalContext);
  const [author, setAuthor] = useState(initialAuthor);
  const [isValidEmail, setIsEmailVaild] = useState(true);

  const handleAdd = async () => {
    const index = authors.findIndex(
      (curAuth) =>
        curAuth.id.trim().toLowerCase() === author.id.trim().toLowerCase()
    );
    if (index === -1) {
      try {
        const res = await createAuthor(author);
        if (res) {
          setAuthors([...authors, res]);
          console.log("Added author:", res);
          navigation.goBack();
        }
      } catch (error) {}
    }
    console.log("Author unable to add:", author);
  };

  const isEmailValid = (email: string) => {
    return email.endsWith(".com");
  };
  const handleEmailChange = (text: string) => {
    setAuthor({ ...author, email: text });
    setIsEmailVaild(isEmailValid(text));
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
          }))
        }
      />
      <TextInput
        placeholder="ID:"
        style={Styles.input}
        value={author.id}
        onChangeText={(text) => setAuthor((prev) => ({ ...prev, id: text }))}
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
        onChangeText={handleEmailChange}
      />
      <Pressable style={Styles.button} onPress={handleAdd}>
        <Text style={Styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

export default AddAuthorScreen;
