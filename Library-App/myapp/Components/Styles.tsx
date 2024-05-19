import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  containerList: {
    // backgroundColor: index % 2 === 0 ? "white" : "lightgrey"
  },
  row: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  edges: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    minWidth: 50,
  },
  stars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5,
    minWidth: 50,
  },
  course: {
    flexDirection: "column",
    flex: 8,
  },
  faculty: {
    color: "grey",
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
  editButton: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "lightgreen",
    marginBottom: 5,
  },
  infoButton: {
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "skyblue",
    marginBottom: 5,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "red",
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 15,
  },
  addButtonText: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Styles;
