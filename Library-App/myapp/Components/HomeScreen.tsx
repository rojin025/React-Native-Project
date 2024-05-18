import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BookListScreen from "./Book/BookListScreen";
import BookDetailsScreen from "./Book/BookDetailsScreen";
import AddBookScreen from "./Book/AddBookScreen";

function HomeScreen() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="book-list">
      <Screen
        name="book-list"
        component={BookListScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Screen name="book-details" component={BookDetailsScreen} />
      <Screen name="add-book" component={AddBookScreen} />
    </Navigator>
  );
}

export default HomeScreen;
