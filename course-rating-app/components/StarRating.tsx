import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Review } from "./ICourse";

interface props {
  value: number;
  isSelected: boolean;
  onPress: (value: number) => void;
}

function StarButton({ value, isSelected, onPress }: props) {
  return (
    <Pressable onPress={() => onPress(value)} style={{ margin: 10 }}>
      <AntDesign name="star" size={40} color={isSelected ? "gold" : "gray"} />
    </Pressable>
  );
}

interface props {
  review: Review;
  onSelect: (review: Review) => void;
}

function StarRating({ review, onSelect }: props) {
  const [rating, setRating] = useState(0);

  const handlePress = (value: number) => {
    setRating(value);
    onSelect({ ...review, rating: value });
  };

  return (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map((value) => (
        <StarButton
          key={value}
          value={value}
          isSelected={value <= rating}
          onPress={handlePress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stars: {
    marginBottom: 80,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default StarRating;
