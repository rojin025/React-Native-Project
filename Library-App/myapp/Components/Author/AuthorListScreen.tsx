import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";

import Styles from "../Styles";
import { useContext, useEffect, useState } from "react";
import { AuthorI } from "../../Types/Types";

import Author from "./Author";
import AddAuthorScreen from "./AddAuthorScreen";
import GlobalContext from "../../Utils/Context";

function AuthorListScreen({ navigation }: any) {
  const { authors, setAuthors } = useContext(GlobalContext);

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
        keyExtractor={(item) => item.id}
      />
      <Pressable
        style={Styles.button}
        onPress={() => {
          navigation.navigate("add-author");
        }}
      >
        <Text style={Styles.buttonText}>Add Author</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default AuthorListScreen;
