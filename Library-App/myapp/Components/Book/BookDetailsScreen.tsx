import React, { useContext, useEffect, useState } from "react";

import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BookI, CatalogI } from "../../Types/Types";
import Styles from "../Styles";
import GlobalContext from "../../Utils/Context";
import { updateCatalog } from "../../Services/catalogs.api";
import { AntDesign } from "@expo/vector-icons";

export default function BookDetailsScreen({ route, navigation }: any) {
  const { title, id, genre, category, authorIDs, publisherId } = route.params;
  const { catalogs, setCatalogs } = useContext(GlobalContext);
  const [catalog, setCatalog] = useState<CatalogI | null>(null);

  useEffect(() => {
    const index = catalogs.findIndex((catalog) => catalog.bookId === id);
    if (index !== -1) {
      setCatalog(catalogs[index]);
    }
  }, [catalogs, id]);

  const handleTransaction = async (transaction: number) => {
    if (transaction !== 1 && transaction !== -1) {
      return alert("Invalid operation.");
    }
    if (!catalog || (transaction === -1 && catalog.availableCopies === 0)) {
      return alert("Cannot operate this book now.");
    }

    const updatedCatalog = {
      ...catalog,
      availableCopies: catalog.availableCopies + transaction,
    };

    const data = await updateCatalog(updatedCatalog.id, updatedCatalog);

    if (data) {
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
        <Text style={Styles.title}>Brrow Books</Text>

        <Text style={styles.name}>
          Available Books: {catalog?.availableCopies}
        </Text>
        <Text style={styles.info}>
          Numbers of Copies: {catalog?.numberOfCopies}
        </Text>
        <Pressable
          style={[Styles.button, { backgroundColor: "skyblue" }]}
          onPress={() => handleTransaction(1)}
        >
          <Text style={Styles.buttonTextPrimary}>Return</Text>
        </Pressable>
        <Pressable
          style={[Styles.button, { backgroundColor: "green" }]}
          onPress={() => handleTransaction(-1)}
        >
          <Text style={Styles.buttonTextPrimary}>Borrow</Text>
        </Pressable>
      </View>
    );
  }

  const BookDetails = React.memo(() => {
    return (
      <View>
        <AntDesign
          name="codesquare"
          size={100}
          style={styles.icon}
          color="#0066CC"
        />
        <Text style={Styles.title}>{title}</Text>
        <Text style={styles.name}>{id}</Text>
        <Text style={styles.info}>{genre}</Text>
        <Text style={styles.info}>{category}</Text>
        <Text style={styles.info}>{authorIDs}</Text>
        <Text style={styles.info}>{publisherId}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View>
        <BookDetails />
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
    padding: 30,
    justifyContent: "center",
    alignContent: "center",
  },
  name: {
    fontSize: 19,
    marginTop: 5,
  },
  icon: {
    marginVertical: 20,
    alignSelf: "center",
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
