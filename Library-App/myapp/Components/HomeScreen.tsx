import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BookListScreen from "./Book/BookListScreen";
import BookDetailsScreen from "./Book/BookDetailsScreen";
import AddBookScreen from "./Book/AddBookScreen";
import UpdateBookScreen from "./Book/UpdateBookScreen";
import AuthorListScreen from "./Author/AuthorListScreen";
import AddAuthorScreen from "./Author/AddAuthorScreen";

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
      <Screen name="update-book" component={UpdateBookScreen} />

      <Screen
        name="author-list"
        component={AuthorListScreen}
        options={{
          title: "Authors",
          headerShown: false,
        }}
      />
      <Screen
        name="add-author"
        component={AddAuthorScreen}
        options={{
          title: "Authors",
          headerShown: false,
        }}
      />
    </Navigator>
  );
}

export default HomeScreen;
