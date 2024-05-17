import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet } from "react-native";

function AddCourseScreen() {
  const navigation = useNavigation();

  const AddCourseScreen = () => {
    console.log("Add Button clicked.");
  };

  return (
    <View>
      <Text>Add New Course</Text>
      <Pressable style={styles.button} onPress={handleAddButton}>
        <Text style={styles.addButtonText}>Submit</Text>
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

export default AddCourseScreen;
