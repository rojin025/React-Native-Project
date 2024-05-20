import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import { updateCatalog } from "../../Services/catalogs.api";
import { CatalogI } from "../../Types/Types";
import Styles from "../Styles";
import GlobalContext from "../../Utils/Context";

import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const initailTransaction = {
  id: "",
  bookId: "",
  memberId: "",
  borrowedDate: "",
  returnedDate: "",
};

export default function BookDetailsScreen({ route, navigation }: any) {
  const { title, id, genre, category, authorIDs, publisherId } = route.params;
  const { catalogs, setCatalogs, members } = useContext(GlobalContext);
  const [catalog, setCatalog] = useState<CatalogI | null>(null);
  const [seletedMemberId, setSeletedMemberId] = useState("");
  const [transaction, setTransaction] = useState(initailTransaction);

  useEffect(() => {
    const index = catalogs.findIndex((catalog) => catalog.bookId === id);
    if (index !== -1) {
      setCatalog(catalogs[index]);
    }
    if (members.length > 0) {
      setSeletedMemberId(members[0].id);
    }
  }, [catalogs, id, members]);

  const calculateCurrentDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    // const minutes = String(date.getMinutes()).padStart(2, "0");
    // const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleBookTransaction = async (bookTransactionNum: number) => {
    if (bookTransactionNum !== 1 && bookTransactionNum !== -1) {
      return alert("Invalid operation.");
    }
    if (
      !catalog ||
      (bookTransactionNum === -1 && catalog.availableCopies === 0) ||
      (bookTransactionNum === 1 &&
        catalog.availableCopies === catalog.numberOfCopies)
    ) {
      return alert("Cannot perform this transaction!");
    }

    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      id: Date.now().toString(),
      bookId: id,
      memberId: seletedMemberId,
    }));

    if (bookTransactionNum === 1) {
      setTransaction((prevTransaction) => ({
        ...prevTransaction,
        returnedDate: calculateCurrentDate(),
      }));
    } else {
      setTransaction((prevTransaction) => ({
        ...prevTransaction,
        borrowedDate: calculateCurrentDate(),
      }));
    }

    console.log("New Transaction Record: ", transaction);

    const updatedCatalog = {
      ...catalog,
      availableCopies: catalog.availableCopies + bookTransactionNum,
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

  function BorrowAbleComponent() {
    return (
      <View>
        <Text style={Styles.title}>Brrow Books</Text>
        {/* <Text style={styles.name}>Member names: </Text> */}
        <Text>{transaction.borrowedDate}</Text>
        <Text>{transaction.returnedDate}</Text>
        <Picker
          selectedValue={seletedMemberId}
          onValueChange={(itemValue, itemIndex) =>
            setSeletedMemberId(itemValue)
          }
          style={{ width: "100%" }}
        >
          {members.map((member) => (
            <Picker.Item
              key={member.id}
              label={`${member.firstname} ${member.lastname}`}
              value={`${member.id}`}
            />
          ))}
        </Picker>
        <Text style={styles.info}>
          Available Books: {catalog?.availableCopies}
        </Text>
        <Text style={styles.info}>
          Numbers of Copies: {catalog?.numberOfCopies}
        </Text>
        <View style={[{ flexDirection: "row" }]}>
          <Pressable
            style={[Styles.button, { backgroundColor: "skyblue" }]}
            onPress={() => handleBookTransaction(1)}
          >
            <Text style={Styles.buttonTextPrimary}>Return</Text>
          </Pressable>
          <Pressable
            style={[Styles.button, { backgroundColor: "green" }]}
            onPress={() => handleBookTransaction(-1)}
          >
            <Text style={Styles.buttonTextPrimary}>Borrow</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const BookDetails = React.memo(() => {
    return (
      <View>
        {/* <AntDesign
          name="codesquare"
          size={40}
          style={styles.icon}
          color="#0066CC"
        /> */}
        <Text style={Styles.headerText}>{title}</Text>
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
          <BorrowAbleComponent />
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
