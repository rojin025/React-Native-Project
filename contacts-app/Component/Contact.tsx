import React from "react";
import { View, Text } from "react-native";

import { IContact } from "../contacts";
import { styles } from "../styles";

interface props {
  contact: IContact;
}

function Contact({ contact }: props) {
  return (
    <View style={styles.contact}>
      {/* <Text>{contact.id}</Text> */}
      <Text>{contact.name}</Text>
      <Text>{contact.phone}</Text>
    </View>
  );
}

export default Contact;
