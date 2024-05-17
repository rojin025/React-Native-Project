import axios from "axios";
import ICourse from "./components/ICourse";

// export const SERVER_BASE_URL = "http://localhost:9000/";
export const SERVER_BASE_URL = "http://localhost:9000/";

// before
// axios.defaults.baseURL = "http://localhost:9000/";
// after
axios.defaults.baseURL = "http://10.200.30.248:9000/";

export async function getCourses() {
  try {
    const res = await axios.get("/courses");
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function createCourse(course: ICourse) {
  try {
    const res = await axios.post("/courses", course);
    if (res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCourse(id: string, course: ICourse) {
  try {
    const res = await axios.post(`/courses/${id}`, course);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}
