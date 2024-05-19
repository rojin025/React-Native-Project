import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  headerText: {
    fontSize: 35,
    color: "#444",
    textAlign: "center",
    margin: 20,
    fontWeight: "200",
    textDecorationLine: "underline",
  },
  title: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    fontSize: 24,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 24,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  addButtonText: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Styles;
