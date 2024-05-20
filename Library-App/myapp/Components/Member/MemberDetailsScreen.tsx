import React from "react";

import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Styles from "../Styles";

export default function MemberDetailsScreen({ route }: any) {
  const { id, residentID, firstname, lastname, phone, email, address } =
    route.params;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={Styles.headerText}>
        {firstname} {lastname}
      </Text>
      <Text style={styles.subHeading}> residentID : {residentID}</Text>
      <Text style={styles.subHeading}> id : {id}</Text>
      <Text style={styles.subHeading}> email : {email}</Text>
      <Text style={styles.info}> phone : {phone}</Text>
      <Text style={styles.info}> address : {address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  subHeading: {
    fontSize: 15,
    // fontWeight: "light",
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
