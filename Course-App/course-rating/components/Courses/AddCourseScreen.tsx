import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";

import ICourse from "../ICourse";
import GlobalContext from "../../Context";
import { createCourse } from "../../api";

import styles from "./Course.Styles";

const initialCourse = {
  title: "",
  faculty: "",
  code: "",
  reviews: [],
  rating: 3,
};

function AddCourseScreen({ navigation }: any) {
  const [course, setCourse] = useState<ICourse>(initialCourse);
  const { courses, setCourses } = useContext(GlobalContext);

  const handleAddCourse = async () => {
    try {
      const res = await createCourse(course);
      if (res !== null) {
        setCourses([...courses, res]);
        navigation.goBack();
      } else {
        Alert.alert("Failed!!!");
      }
    } catch (error) {
      console.log(error);
    }
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

export default AddCourseScreen;
