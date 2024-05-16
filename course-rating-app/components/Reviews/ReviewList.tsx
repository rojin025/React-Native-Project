import { View } from "react-native";
import { IReview } from "../ICourse";
import React from "react";
import Review from "./Review";

interface props {
  data: IReview[];
}

export default function ReviewList({ data }: props) {
  return (
    <View>
      {data.map((review: IReview) => (
        <Review review={review} />
      ))}
    </View>
  );
}
