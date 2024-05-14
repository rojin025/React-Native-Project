import { useContext, useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { IContact } from "../contacts";
import GlobalContext from "../Context";

import { styles } from "../styles";

const initalContact = {
  name: "",
  phone: "",
  id: "",
};

function AddForm() {
  const { setContacts, contacts } = useContext(GlobalContext);
  const [contact, setContact] = useState<IContact>(initalContact);

  const handleNameInput = (text: string) => {
    setContact({ ...contact, name: text });
  };

  const handlePhoneInput = (phone: string) => {
    setContact({ ...contact, phone: phone });
  };

  const handleAddContact = async () => {
    try {
      if (!contact.name || !contact.phone) {
        return Alert.alert("No input detected.");
      }

      const phoneNum = parseInt(contact.phone);

      if (isNaN(phoneNum)) {
        return Alert.alert("Phone number has to be a number.");
      }

      if (contact.phone.trim().length !== 9) {
        console.log("Not Valid", contact.phone.trim().length);
        throw new Error(" Not valid number");
      }

      const newContact = { ...contact, id: uuid.v1() };
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);

      console.log("Contact Here : ", newContact);
      await AsyncStorage.setItem("ws-3", JSON.stringify(newContacts));
      console.log(contacts);

      console.log("New Contacts: ", contacts);
      console.log("Contacts: ", contacts);
      setContact(initalContact);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Full Name:"
        onChangeText={(text: string) => handleNameInput(text)}
      />
      <TextInput
        placeholder="Enter Phone No."
        style={styles.input}
        onChangeText={(phone: string) => handlePhoneInput(phone)}
      />
      <Button title="Add Contact" onPress={handleAddContact} />
    </View>
  );
}

export default AddForm;
