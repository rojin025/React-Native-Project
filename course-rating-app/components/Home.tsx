import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoursesList from "./CoursesList";
import CourseDetails from "./CourseDetails";
import AddReview from "./AddReview";

function Home() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="courseList">
      <Screen name="courseList" component={CoursesList} />
      <Screen name="Course Details" component={CourseDetails} />
      <Screen name="addReview" component={AddReview} />
    </Navigator>
  );
}

export default Home;
