import { useContext, useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import Styles from "../Styles";
import GlobalContext from "../../Utils/Context";

function UpdateAuthorScreen({ navigation, route }: any) {
  const [author, setAuthor] = useState(route.params);
  const { authors, setAuthors } = useContext(GlobalContext);

  const handleUpdate = async () => {
    console.log("Update:", author);
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Add Authors</Text>
      <TextInput
        placeholder="Name:"
        style={Styles.input}
        value={author.name}
        onChangeText={(text) => setAuthor({ ...author, name: text })}
      />
      <TextInput
        placeholder="ID:"
        style={Styles.input}
        value={author.id}
        onChangeText={(text) => setAuthor({ ...author, id: text })}
      />
      <TextInput
        placeholder="Phone:"
        style={Styles.input}
        value={author.phone}
        onChangeText={(text) => setAuthor({ ...author, phone: text })}
      />
      <TextInput
        placeholder="Email:"
        style={Styles.input}
        value={author.email}
        onChangeText={(text) => setAuthor({ ...author, email: text })}
      />
      <Pressable style={Styles.button} onPress={handleUpdate}>
        <Text style={Styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

export default UpdateAuthorScreen;
