import { SafeAreaView, Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AuthorI } from "../../Types/Types";
import Styles from "../Styles";
import showConfirmation from "../../Utils/Confirmation";
import { deleteAuthor } from "../../Services/author.api";
import GlobalContext from "../../Utils/Context";
import { useContext } from "react";

interface props {
  data: AuthorI;
  index: number;
}

function Author({ data, index }: props) {
  const navigation = useNavigation();
  const { authors, setAuthors } = useContext(GlobalContext);

  const handleNavToAuthorDetails = () => {
    navigation.navigate("author-details", data);
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
        const res = await deleteAuthor(data.id);
        if (res) {
          console.log("res", res);
          const updatedAuthors = authors.filter(
            (author) => author.id !== data.id
          );
          setAuthors(updatedAuthors);
        }
      } catch (error) {}
    };
  };

  const handleEdit = () => {
    navigation.navigate("update-author", data);
  };

  return (
    <SafeAreaView>
      <View
        style={[
          Styles.container,
          { backgroundColor: index % 2 === 0 ? "white" : "lightgrey" },
        ]}
      >
        <View style={Styles.row}>
          <View style={Styles.course}>
            <Text style={Styles.title}>{data.name}</Text>
            <Text style={Styles.faculty}>
              {data.id} - {data.phone}
            </Text>
            <Text style={Styles.faculty}>{data.email}</Text>
          </View>

          <View style={Styles.edges}>
            <TouchableHighlight
              onPress={handleNavToAuthorDetails}
              style={Styles.infoButton}
              underlayColor="#5398DC"
            >
              <Text style={Styles.buttonText}>Details</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={askDeleteConfirmation}
              style={Styles.deleteButton}
              underlayColor="red"
            >
              <Text style={Styles.buttonText}>Delete</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handleEdit}
              style={Styles.editButton}
              underlayColor="Green"
            >
              <Text style={Styles.buttonText}> Edit </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Author;
