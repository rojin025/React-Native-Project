import React, { useContext, useDebugValue, useEffect, useState } from "react";

import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BookI, CatalogI, TransactionI } from "../Types/Types";
import GlobalContext from "../Utils/Context";
import { Picker } from "@react-native-picker/picker";
import Styles from "./Styles";
import { updateCatalog } from "../Services/catalogs.api";
import { createEntitie, updateEntitie } from "../Services/service.api";

const initailTransaction = {
  id: "",
  bookId: "",
  memberId: "",
  borrowedDate: "",
  returnedDate: "",
};

function ProcessScreen({ navigation }: any) {
  const {
    catalogs,
    books,
    setCatalogs,
    members,
    transactions,
    setTransactions,
  } = useContext(GlobalContext);

  const [availableCatalogs, setAvailableCatalogs] = useState<CatalogI[]>([]);

  const [selectedBookId, setSelectedBookId] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const [selectedBook, setSelectedBook] = useState<BookI>();
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogI>();
  const [transaction, setTransaction] = useState(initailTransaction);

  useEffect(() => {
    const newCatalogs = catalogs.filter((curr) => curr.availableCopies > 0);
    console.log("Filtered Catalogs:", newCatalogs);

    if (newCatalogs.length > 0) {
      setAvailableCatalogs(newCatalogs);
      setSelectedCatalog(newCatalogs[0]);
      setSelectedBookId(newCatalogs[0].bookId);
    }

    if (members.length > 0) {
      setSelectedMemberId(members[0].id);
    }
  }, [catalogs, members]);

  useEffect(() => {
    console.log("Selected Book ID changed:", selectedBookId);
    const bookFound = books.find((book) => book.id === selectedBookId);
    const catalogFound = catalogs.find(
      (catalog) => catalog.bookId === selectedBookId
    );
    if (bookFound) {
      setSelectedBook(bookFound);
    } else {
      setSelectedBook(undefined);
    }
    if (catalogFound) {
      setSelectedCatalog(catalogFound);
    } else {
      setSelectedCatalog(undefined);
    }
  }, [selectedBookId, books, catalogs]);

  const calculateCurrentDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    console.log("New UseEffect -----> ", transactions);
  }, [transactions]);

  const handleBorrow = async () => {
    if (!selectedCatalog || selectedCatalog.availableCopies === 0) {
      return alert("Cannot perform this transaction!");
    }

    const updatedCatalog = {
      ...selectedCatalog,
      availableCopies: selectedCatalog.availableCopies - 1,
    };

    try {
      const catalogData = await updateCatalog(
        updatedCatalog.id,
        updatedCatalog
      );

      if (catalogData) {
        let index = catalogs.findIndex(
          (catalog) => catalog.bookId === selectedCatalog.bookId
        );
        if (index !== -1) {
          const updatedCatalogs = [...catalogs];
          updatedCatalogs[index] = catalogData;

          setCatalogs(updatedCatalogs);
          setSelectedCatalog(catalogData);
        }
      }
    } catch (error) {
      console.error("Error updating catalog:", error);
    }

    const transactionRec = {
      ...transaction,
      id: Date.now().toString(),
      memberId: selectedMemberId,
      bookId: selectedBookId,
      borrowedDate: calculateCurrentDate(),
    };

    try {
      const transactionData = await createEntitie(
        "transaction",
        transactionRec
      );
      if (transactionData) {
        setTransactions([...transactions, transactionData]);
        setTransaction(initailTransaction);
        Alert.alert("Successful.");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  const handleReturn = async () => {
    console.log("return");
    if (
      !selectedCatalog ||
      selectedCatalog.availableCopies === selectedCatalog.numberOfCopies
    ) {
      return alert("Cannot perform this transaction!");
    }

    const updatedCatalog = {
      ...selectedCatalog,
      availableCopies: selectedCatalog.availableCopies + 1,
    };

    try {
      const catalogData = await updateCatalog(
        updatedCatalog.id,
        updatedCatalog
      );

      if (catalogData) {
        let index = catalogs.findIndex(
          (catalog) => catalog.id === updatedCatalog.id
        );
        if (index !== -1) {
          const updatedCatalogs = [...catalogs];
          updatedCatalogs[index] = catalogData;

          setCatalogs(updatedCatalogs);
          setSelectedCatalog(catalogData);
        }
      }
    } catch (error) {
      console.log(error);
    }

    const index = transactions.findIndex(
      (t) => t.bookId === selectedBookId && t.memberId === selectedMemberId
    );
    if (index !== -1) {
      const updatedTransactions = [...transactions];
      const tempTrans = updatedTransactions[index];
      const updatedTrans = {
        ...tempTrans,
        returnedDate: calculateCurrentDate(),
      };
      // console.log("Here ----> ", updatedTransactions[index]);
      try {
        const data = await updateEntitie(
          "transaction",
          updatedTrans.id,
          updatedTrans
        );
        if (data) {
          updatedTransactions[index] = data;
          setTransactions(updatedTransactions);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return Alert.alert("Cannnot find any record.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 40 }}>
      <Text style={styles.header}>Process</Text>

      <AntDesign name="book" size={50} style={styles.icon} color="#0066CC" />
      <Text>{selectedBook?.title}</Text>
      <Text>Available Copies {selectedCatalog?.availableCopies}</Text>
      <Text style={Styles.info}>Selected Catalog: {selectedCatalog?.id}</Text>
      <Text style={Styles.info}>Selected Member: {selectedMemberId}</Text>

      <Picker
        selectedValue={selectedBookId}
        onValueChange={(itemValue, itemIndex) => setSelectedBookId(itemValue)}
        style={{ width: "100%" }}
      >
        {availableCatalogs.map((catalog) => (
          <Picker.Item
            key={catalog.id}
            label={`${catalog.bookId}`}
            value={`${catalog.bookId}`}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedMemberId}
        onValueChange={(itemValue, itemIndex) => setSelectedMemberId(itemValue)}
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
      <View style={[{ flexDirection: "row" }]}>
        <Pressable
          style={[Styles.button, { backgroundColor: "skyblue" }]}
          onPress={handleReturn}
        >
          <Text style={Styles.buttonTextPrimary}>Return</Text>
        </Pressable>
        <Pressable
          style={[Styles.button, { backgroundColor: "green" }]}
          onPress={handleBorrow}
        >
          <Text style={Styles.buttonTextPrimary}>Borrow</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default ProcessScreen;

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
