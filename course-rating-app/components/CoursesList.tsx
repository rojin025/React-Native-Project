import React, { useEffect, useState } from "react";
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
import Header from "./Header.ios";
import ICourse from "./ICourse";

const data = [
  {
    title: "Web Application Programming",
    faculty: "Asaad Saad",
    code: "CS472",
    rating: 4,
  },
  {
    title: "Modern Web Application",
    faculty: "Asaad Saad",
    code: "CS572",
    rating: 5,
  },
  {
    title: "Enterprise Architecture",
    faculty: "Joe Bruen",
    code: "CS557",
    rating: 4,
  },
  { title: "Algorithms", faculty: "Clyde Ruby", code: "CS421", rating: 5 },
  {
    title: "Object Oriented JavaScript",
    faculty: "Keith Levi",
    code: "CS372",
    rating: 3,
  },
  { title: "Big Data", faculty: "Prem Nair", code: "CS371", rating: 5 },
  {
    title: "Web Application Architecture",
    faculty: "Rakesh Shrestha",
    code: "CS377",
    rating: 5,
  },
  {
    title: "Big Data Analytics",
    faculty: "Mrudula Mukadam",
    code: "CS378",
    rating: 5,
  },
];

export default function CoursesList() {
  //   const { data };
  const [search, setSearch] = useState("");
  const [displayList, setDisplayList] = useState<ICourse[]>([]);

  useEffect(() => {
    if (search.trim() === "") {
      setDisplayList(data);
    } else {
      const filteredCourse = data.filter((course) =>
        course.title.toLowerCase().trim().includes(search.toLowerCase())
      );
      setDisplayList(filteredCourse);
    }
  }, [data, search]);

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
