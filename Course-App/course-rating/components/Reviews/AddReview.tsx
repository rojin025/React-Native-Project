import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import GlobalContext from "../../Context";
import StarRating from "../StarRating";
import { IReview } from "../ICourse";
import { SERVER_BASE_URL } from "../../Constant";

const initialReview = {
  name: "",
  rating: 0,
  comment: "",
};

const AddReview = ({ route }: any) => {
  const { courses } = useContext(GlobalContext);
  const { code, id } = route.params;
  const [review, setReview] = useState<IReview>(initialReview);
  const navigation = useNavigation();

  const addNewReview = async () => {
    const courseIndex = courses.findIndex((c) => c.code === code);
    if (courseIndex === -1) {
      console.log("Course Code not found.");
      return;
    }

    const currentCourse = courses[courseIndex];
    currentCourse.reviews.push(review);
    currentCourse.rating = calculateAverageRating(currentCourse.reviews);

    console.log(`${SERVER_BASE_URL}courses/${id}`);
    console.log("Current Course -----> ", currentCourse);

    try {
      const res = await axios.put(
        `${SERVER_BASE_URL}courses/${id}`,
        currentCourse
      );
      if (res.status === 200) {
        console.log("New review added and courses updated in AsyncStorage.");
        // navigation.navigate("Course Details", currentCourse);
        navigation.navigate("courseList");
      }
      console.log("Sorry Not updated.");
    } catch (error) {
      console.error("Error saving courses to DataBase:", error);
    }
  };

  const calculateAverageRating = (reviews: IReview[]): number => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length ? Math.round(totalRating / reviews.length) : 0;
  };

  const handleNameChange = (text: string) => {
    setReview({ ...review, name: text });
  };

  const handleCommentChange = (text: string) => {
    setReview({ ...review, comment: text });
  };

  return (
    <View>
      <Text style={styles.headerText}> Add Review </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name:"
        onChangeText={handleNameChange}
      />
      <Text style={styles.ratingText}> Your Rating </Text>
      <StarRating onSelect={setReview} review={review} />
      <TextInput
        style={[styles.input, { height: 200 }]}
        multiline={true}
        placeholder="Enter Comments:"
        onChangeText={handleCommentChange}
      />
      <Pressable style={styles.submitButton} onPress={addNewReview}>
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  button: {
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 25,
    color: "#444",
    textAlign: "center",
    margin: 20,
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
  ratingText: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginVertical: 40,
  },
  stars: {
    marginBottom: 80,
    flexDirection: "row",
    justifyContent: "center",
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default AddReview;
