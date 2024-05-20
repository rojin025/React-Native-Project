import React, { useContext, useEffect, useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BookI, CatalogI } from "../../Types/Types";
import Styles from "../Styles";
import GlobalContext from "../../Utils/Context";
import { updateCatalog } from "../../Services/catalogs.api";

interface props {
  data: BookI;
  route: any;
}

export default function BookDetailsScreen({ route }: props) {
  const { title, id, genre, category, authorIDs, publisherId } = route.params;
  const navigation = useNavigation();
  const { catalogs, setCatalogs } = useContext(GlobalContext);
  const [catalog, setCatalog] = useState<CatalogI | null>(null);

  useEffect(() => {
    console.log("ID -------", id);
    console.log(catalogs);
    const index = catalogs.findIndex((catalog) => catalog.bookId === id);
    if (index !== -1) {
      setCatalog(catalogs[index]);
    }
    // borrow BOoks
    // - search catalog in catalogs Array
    // - setCatalog
    // -
  }, [catalogs, id]);

  const handleBorrow = async () => {
    console.log("handle Books");

    if (!catalog || catalog.availableCopies === 0) {
      return alert("Cannot borrow this book now.");
    }

    const updatedCatalog = {
      ...catalog,
      availableCopies: catalog.availableCopies - 1,
    };

    const res = await updateCatalog(updatedCatalog.id, updatedCatalog);

    if (res.status === 200) {
      let index = catalogs.findIndex((catalog) => catalog.bookId === id);
      if (index !== -1) {
        const updatedCatalogs = [...catalogs];
        updatedCatalogs[index] = updatedCatalog;
        setCatalog(updatedCatalog);
        setCatalogs(updatedCatalogs);
      }
    }
  };

  function BorrowAble() {
    return (
      <View>
        <Text style={styles.name}>
          Available Books: {catalog?.availableCopies}
        </Text>
        <Text style={styles.info}>
          Numbers of Copies: {catalog?.numberOfCopies}
        </Text>
        <Pressable
          style={[Styles.button, { backgroundColor: "green" }]}
          onPress={handleBorrow}
        >
          <Text style={Styles.buttonTextPrimary}>Borrow</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      <View style={[Styles.container, { margin: 30 }]}>
        <Text style={Styles.title}>{title}</Text>
        <Text style={styles.name}>{id}</Text>
        <Text style={styles.info}>{genre}</Text>
        <Text style={styles.info}>{category}</Text>
        <Text style={styles.info}>{authorIDs}</Text>
        <Text style={styles.info}>{publisherId}</Text>
      </View>
      <View>
        <Text style={Styles.title}>Brrow Books</Text>
        {catalog ? (
          <BorrowAble />
        ) : (
          <Text style={Styles.title}>So sorry no Books available :(</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 19,
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
