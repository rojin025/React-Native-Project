import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import ICourse from "../ICourse";

const initialCourse = {
  title: "",
  faculty: "",
  code: "",
  reviews: [],
  rating: 3,
};

function AddCourseScreen() {
  const navigation = useNavigation();
  const [course, setCourse] = useState<ICourse>(initialCourse);

  const handleAddCourse = () => {
    console.log("New Course: ", course);
    console.log("Add Button clicked.");
  };

  return (
    <View>
      <Text style={styles.title}>Add New Course</Text>
      <TextInput
        style={styles.input}
        placeholder="Title:"
        value={course.title}
        onChangeText={(text) => setCourse({ ...course, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Faculty:"
        value={course.faculty}
        onChangeText={(text) => setCourse({ ...course, faculty: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Code:"
        value={course.code}
        onChangeText={(text) => setCourse({ ...course, code: text })}
      />
      <Pressable style={styles.button} onPress={handleAddCourse}>
        <Text style={styles.addButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  title: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    fontSize: 24,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 24,
  },
  addButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default AddCourseScreen;
