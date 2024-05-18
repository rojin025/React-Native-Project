import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet } from "react-native";

function AddBookButton() {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("add-book");
        }}
      >
        <Text style={styles.addButtonText}>Add New Book</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  addButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default AddBookButton;
