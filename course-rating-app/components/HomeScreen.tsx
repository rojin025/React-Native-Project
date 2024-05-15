import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoursesList from "./Course/CoursesList";
import CourseDetails from "./Course/CourseDetails";
import AddReview from "./AddReview";

function HomeScreen() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="courseList">
      <Screen name="courseList" component={CoursesList} />
      <Screen name="Course Details" component={CourseDetails} />
      <Screen name="addReview" component={AddReview} />
    </Navigator>
  );
}

export default HomeScreen;
