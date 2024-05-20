import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";

import Styles from "../Styles";
import { useContext, useEffect, useState } from "react";
import { AuthorI } from "../../Types/Types";

import GlobalContext from "../../Utils/Context";
import Publisher from "./Publisher";

function PublisherListScreen({ navigation }: any) {
  const { publishers, setPublishers } = useContext(GlobalContext);

  return (
    <SafeAreaView style={Styles.container}>
      <View>
        <Text style={Styles.headerText}>Publishers</Text>
      </View>
      {/* <Pressable style={Styles.button} onPress={onNavigateToAddCourse}>
        <Text style={Styles.buttonText}>Add New Course</Text>
      </Pressable>
      <Pressable style={Styles.button} onPress={onLogout}>
        <Text style={Styles.buttonText}>Logout</Text>
      </Pressable> */}
      <FlatList
        data={publishers}
        renderItem={({ item, index }) => (
          <Publisher publisherData={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Pressable
        style={Styles.button}
        onPress={() => {
          navigation.navigate("add-publisher");
        }}
      >
        <Text style={Styles.buttonText}>Add Publisher</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default PublisherListScreen;
