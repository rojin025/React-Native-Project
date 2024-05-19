import { createStackNavigator } from "@react-navigation/stack";

import BookListScreen from "./Book/HomeScreen";
import BookDetailsScreen from "./Book/BookDetailsScreen";
import AddBookScreen from "./Book/AddBookScreen";
import UpdateBookScreen from "./Book/UpdateBookScreen";
import AuthorListScreen from "./Author/AuthorListScreen";
import AddAuthorScreen from "./Author/AddAuthorScreen";
import UpdateAuthorScreen from "./Author/UpdateAuthorScreen";
import AuthorDetailsScreen from "./Author/AuthorDetailsScreen";

function Home() {
  const { Navigator, Screen } = createStackNavigator();

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
          headerShown: true,
        }}
      />
      <Screen
        name="add-author"
        component={AddAuthorScreen}
        options={{
          title: "Add Author",
          headerShown: true,
        }}
      />
      <Screen
        name="update-author"
        component={UpdateAuthorScreen}
        options={{
          title: "Update Author",
          headerShown: true,
        }}
      />
      <Screen
        name="author-details"
        component={AuthorDetailsScreen}
        options={{
          title: "Author Detials",
          headerShown: true,
        }}
      />
    </Navigator>
  );
}

export default Home;
