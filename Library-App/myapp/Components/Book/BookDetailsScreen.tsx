import React from "react";

import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BookI } from "../../Types/Types";

interface props {
  data: BookI;
  route: any;
}

export default function BookDetailsScreen({ route }: props) {
  const { title, id, genre, category, authorIDs, publisherId } = route.params;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.info}>{id}</Text>
      <Text style={styles.info}>{genre}</Text>
      <Text style={styles.info}>{category}</Text>
      <Text style={styles.info}>{authorIDs}</Text>
      <Text style={styles.info}>{publisherId}</Text>
    </View>
  );
}

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
