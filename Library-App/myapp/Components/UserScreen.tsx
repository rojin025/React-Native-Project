import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AboutScreen = () => {
  return (
    <View style={{ flex: 1, padding: 40 }}>
      <Text style={styles.header}>About Page</Text>

      <AntDesign name="book" size={100} style={styles.icon} color="#0066CC" />
      <Text style={styles.text}>Who are we?</Text>
      <Text style={styles.text}>
        We come from many places, cultures, and backgrounds, but share a strong
        common commitment to personal inner growth, wellness, sustainability,
        and positive values. We support a progressive and inclusive campus
        culture that’s creative, dynamic, and focused on making the world a
        better, more peaceful place.
      </Text>
      <Text style={styles.text}>
        Why is the block system so popular with our students? video block-system
        At MIU you never juggle 4-5 classes and homework at once. Instead,
        you’re immersed in only one full-time course each month. This is the
        block system. The block system allows you to easily learn more with less
        stress. And there’s no finals week!
      </Text>
    </View>
  );
};

export default AboutScreen;

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
