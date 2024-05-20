import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ProcessScreen = () => {
  return (
    <View style={{ flex: 1, padding: 40 }}>
      <Text style={styles.header}>Process</Text>

      <AntDesign name="book" size={100} style={styles.icon} color="#0066CC" />
    </View>
  );
};

export default ProcessScreen;

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  icon: {
    marginVertical: 20,
    alignSelf: "center",
  },
  text: {
    fontSize: 14,
    color: "#444",
    marginTop: 20,
  },
});
