import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet } from "react-native";

function AddCourseButton() {
  const navigation = useNavigation();

  const handleNavToAddCourse = () => {
    console.log("Add Button clicked.");
    navigation.navigate("Add Course");
  };

  return (
    <View>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("Add Course");
        }}
      >
        <Text style={styles.addButtonText}>Adding Course</Text>
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

export default AddCourseButton;
