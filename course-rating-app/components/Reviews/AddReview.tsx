import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import GlobalContext from "../../Context";
import StarRating from "../StarRating";
import { Review } from "../ICourse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const initialReview = {
  name: "",
  rating: 0,
  comment: "",
};

const AddReview = ({ route }: any) => {
  const { courses, setCourses } = useContext(GlobalContext);
  const { code } = route.params;
  const [review, setReview] = useState<Review>(initialReview);
  const navigation = useNavigation();

  const addNewReview = async () => {
    const courseIndex = courses.findIndex((c) => c.code === code);
    if (courseIndex === -1) {
      console.log("Course Code not found.");
      return;
    }

    try {
      courses[courseIndex].reviews.push(review);
      courses[courseIndex].rating = calculateAverageRating(
        courses[courseIndex].reviews
      );

      await AsyncStorage.setItem("course-app", JSON.stringify(courses));
      console.log("New review added and courses updated in AsyncStorage.");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving courses to AsyncStorage:", error);
    }
  };

  const calculateAverageRating = (reviews: Review[]): number => {
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
