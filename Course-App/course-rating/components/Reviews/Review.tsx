import { StyleSheet } from "react-native";

import { Text, View } from "react-native";
import { IReview } from "../ICourse";

interface props {
  review: IReview;
}

function Review({ review }: props) {
  const { name, rating, comment } = review;
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.info}>{comment}</Text>
      <Text>{rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    marginTop: 5,
  },
  info: {
    color: "grey",
    marginBottom: 5,
  },
});

export default Review;
