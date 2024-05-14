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
import AddForm from "./AddForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

let currentSortStage = 0;

function ContactList() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [displaySort, setDisplaySort] = useState<IContact[]>([]);
  const [displaylist, setDisplaylist] = useState(true);
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
    setDisplaySort(contacts);
  }, [contacts]);

  const handleSortAscByName = () => {
    const result = contacts.slice().sort((a: IContact, b: IContact) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setDisplaySort(result);
  };

  const handleSortDesByName = () => {
    const result = contacts.slice().sort((a: IContact, b: IContact) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
    setDisplaySort(result);
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
        setDisplaySort(contacts);
        currentSortStage = 0;
        break;
      default:
        break;
    }
  };

  const handleSearch = () => {
    console.log("Searching.");
  };

  return (
    <GlobalContext.Provider value={{ contacts, setContacts }}>
      <SafeAreaView style={styles.container}>
        {displaylist && (
          <FlatList
            data={displaySort}
            renderItem={({ item }) => <Contact contact={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </SafeAreaView>
      <View>
        <Button
          title="Show List"
          onPress={() => setDisplaylist(!displaylist)}
        />
        <Button title="Sort ↕" onPress={handleSortToggle} />
      </View>
      <View>
        <TextInput />
        <Button title="Search " onPress={handleSearch} />
      </View>
    </GlobalContext.Provider>
  );
}

export default ContactList;
