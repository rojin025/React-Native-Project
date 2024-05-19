import { FlatList, SafeAreaView, Text, TextInput, View } from "react-native";

import Styles from "../Styles";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useEffect, useState } from "react";
import { AuthorI } from "../../Types/Types";
import { getAuthors } from "../../Services/author.api";
import Author from "./Author";

function AuthorListScreen() {
  const [authors, setAuthors] = useState<AuthorI[]>([]);

  useEffect(() => {
    try {
      const loadData = async () => {
        const data = await getAuthors();
        setAuthors(data);
      };
      loadData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <SafeAreaView style={Styles.container}>
      <View>
        <Text style={Styles.headerText}>Authors</Text>
      </View>
      {/* <Pressable style={Styles.button} onPress={onNavigateToAddCourse}>
        <Text style={Styles.buttonText}>Add New Course</Text>
      </Pressable>
      <Pressable style={Styles.button} onPress={onLogout}>
        <Text style={Styles.buttonText}>Logout</Text>
      </Pressable> */}
      <FlatList
        data={authors}
        renderItem={({ item, index }) => <Author data={item} index={index} />}
        keyExtractor={(item: AuthorI) => item.id}
      />
    </SafeAreaView>
  );
}

export default AuthorListScreen;
