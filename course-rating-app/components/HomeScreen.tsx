import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoursesList from "./Courses/CoursesList";
import CourseDetails from "./Courses/CourseDetails";
import AddReview from "./Reviews/AddReview";

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
