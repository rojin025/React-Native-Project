import React, { useContext, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";

import ICourse from "../ICourse";
import GlobalContext from "../../Context";
import { updateCourse } from "../../api";

import styles from "./Course.Styles";
import { Colors } from "react-native/Libraries/NewAppScreen";

function UpdateCourseScreen({ route, navigation }: any) {
  const data = route.params;
  const [course, setCourse] = useState<ICourse>(data);
  const { courses, setCourses } = useContext(GlobalContext);

  const handleUpdateCourse = async () => {
    try {
      const res = await updateCourse(course.id!, course);
      if (res) {
        const index = courses.findIndex(
          (currentCourse) => currentCourse.id === course.id
        );
        if (index !== -1) {
          const updatedCourses = [...courses];
          updatedCourses[index] = res;
          setCourses(updatedCourses);
          navigation.navigate("courseList");
        }
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add New Course</Text>
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
        style={[styles.input, { color: "gray" }]}
        value={course.code}
        editable={false}
      />
      <Pressable style={styles.button} onPress={handleUpdateCourse}>
        <Text style={styles.addButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

export default UpdateCourseScreen;
