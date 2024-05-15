import React from "react";

import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import ICourse from "./ICourse";
import { useNavigation, useRoute } from "@react-navigation/native";
import Stars from "./Stars";

interface props {
  data: ICourse;
  route: any;
}

const CourseDetails = ({ route }: props) => {
  const { data } = route.params;
  const { title, faculty, code, rating } = data;

  const navigation = useNavigation();

  const navToAddReview = () => {
    navigation.navigate("addReview");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.info}>{code}</Text>
      <Text style={styles.info}>{faculty}</Text>
      <Text style={styles.stars}>
        <Stars rating={rating} />
      </Text>
      <TouchableHighlight style={styles.button}>
        <Text style={styles.buttonText} onPress={navToAddReview}>
          Add Review
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    marginTop: 5,
  },
  info: {
    color: "grey",
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "#0066cc",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
    marginTop: 10,
  },

  stars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5,
    minWidth: 50,
  },
  buttonText: {
    color: "#0066CC",
    fontSize: 12,
    textAlign: "center",
  },
});

export default CourseDetails;
