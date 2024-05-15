import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
} from "react-native";

import Course from "./Course";
import Header from "../Header.ios";
import ICourse from "../ICourse";
import GlobalContext from "../../Context";

export default function CoursesList() {
  const { courses } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const [displayList, setDisplayList] = useState<ICourse[]>([]);

  useEffect(() => {
    if (search.trim() === "") {
      setDisplayList(courses);
    } else {
      const filteredCourse = courses.filter((course) =>
        course.title.toLowerCase().trim().includes(search.toLowerCase())
      );
      setDisplayList(filteredCourse);
    }
  }, [courses, search]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header />
        <Text>Course Review</Text>
        <TextInput
          placeholder="Live Serach"
          value={search}
          onChangeText={(text: string) => setSearch(text)}
        />
      </View>
      <FlatList
        data={displayList}
        renderItem={({ item, index }) => <Course data={item} index={index} />}
        keyExtractor={(item) => item.code}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingBottom: 200,
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5",
  },
});
