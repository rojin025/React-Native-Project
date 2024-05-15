import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import StarRating from "./StarRating";

const AddReview = () => {
  return (
    <View>
      <Text style={styles.headerText}> Add Review </Text>
      <TextInput style={styles.input} placeholder="Enter Name:" />
      <Text style={styles.ratingText}> Your Rating </Text>
      <StarRating />
      <TextInput
        style={[styles.input, { height: 200 }]}
        multiline={true}
        placeholder="Enter Comments:"
      />
      <Pressable style={styles.submitButton}>
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
