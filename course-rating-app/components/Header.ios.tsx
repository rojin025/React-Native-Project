import React from "react";
import { Text, View, Image, StyleSheet, Platform } from "react-native";

import HeaderStyle from "../styles/HeaderStyle";
// import CourseImage from "../images/course.png";

const Header = () => {
  return (
    <View
      style={[
        Platform.OS === "ios" ? HeaderStyle.ios : HeaderStyle.android,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <Image source={require("../images/course.png")} />
      <Text> Course</Text>
    </View>
  );
};

export default Header;
