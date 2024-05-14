import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import createContact, { IContact } from "../contacts";

import GlobalContext from "../Context";
import Contact from "./Contact";
import { styles } from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

let currentSortStage = 0;

function ContactList() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [displaylist, setDisplaylist] = useState<IContact[]>([]);
  const [isDisplaylist, setIsDisplaylist] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await AsyncStorage.getItem("ws-3");
        if (data) {
          const arr = JSON.parse(data);
          setContacts(arr);
        }
        for (let i = 0; i < 3; i++) {
          setContacts((arr) => [...arr, createContact()]);
        }
      } catch (error) {
        console.log("Error on Loading data: ", error);
      }
    };
    loadContacts();
  }, []);

  useEffect(() => {
    setDisplaylist(contacts);
  }, [contacts]);

  const handleSortAscByName = () => {
    const result = contacts.slice().sort((a: IContact, b: IContact) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setDisplaylist(result);
  };

  const handleSortDesByName = () => {
    const result = contacts.slice().sort((a: IContact, b: IContact) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
    setDisplaylist(result);
  };

  const handleSortToggle = () => {
    switch (currentSortStage) {
      case 0:
        handleSortAscByName();
        currentSortStage = 1;
        break;
      case 1:
        handleSortDesByName();
        currentSortStage = 2;
        break;
      case 2:
        setDisplaylist(contacts);
        currentSortStage = 0;
        break;
      default:
        break;
    }
  };

  const handleSearch = () => {
    console.log("Searching:", search);
    const searchingContact = search.trim().toLowerCase();
    const results = contacts.filter((contact) =>
      contact.name.toLowerCase().startsWith(searchingContact)
    );
    setDisplaylist(results);
    // setSearch("");
  };

  return (
    <GlobalContext.Provider value={{ contacts, setContacts }}>
      <SafeAreaView style={styles.container}>
        {isDisplaylist && (
          <FlatList
            data={displaylist}
            renderItem={({ item }) => <Contact contact={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </SafeAreaView>
      <View>
        <Button
          title="Show List"
          onPress={() => setIsDisplaylist(!isDisplaylist)}
        />
        <Button title="Sort ↕" onPress={handleSortToggle} />
      </View>
      <View>
        <TextInput
          placeholder="Search Contact"
          style={{ textAlign: "center", fontSize: 18 }}
          onChangeText={(search: string) => setSearch(search)}
        />
        {search && <Button title="Search " onPress={handleSearch} />}
      </View>
    </GlobalContext.Provider>
  );
}

export default ContactList;
