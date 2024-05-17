import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CoursesList from "./Courses/CoursesList";
import CourseDetails from "./Courses/CourseDetails";
import AddReview from "./Reviews/AddReview";
import AddCourseScreen from "./Courses/AddCourseScreen";

function HomeScreen() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="courseList">
      <Screen name="courseList" component={CoursesList} />
      <Screen name="Course Details" component={CourseDetails} />
      <Screen name="Add Course" component={AddCourseScreen} />
      <Screen name="addReview" component={AddReview} />
    </Navigator>
  );
}

export default HomeScreen;
