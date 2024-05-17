import { View, ScrollView } from "react-native";
import { IReview } from "../ICourse";
import React from "react";
import Review from "./Review";

import uuid from "uuid";

interface props {
  data: IReview[];
}

export default function ReviewList({ data }: props) {
  return (
    <ScrollView>
      {data.map((review: IReview, i) => (
        <Review
          review={review}
          key={i + `${review.name}` + i + `${review.comment}`}
        />
        // <Review review={review} key={uuid.v1()} />
      ))}
    </ScrollView>
  );
}
