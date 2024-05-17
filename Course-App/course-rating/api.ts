import axios from "axios";

export const SERVER_BASE_URL = "http://localhost:9000/";

axios.defaults.baseURL = "http://localhost:9000/";

export async function getCourses() {
  try {
    const res = await axios.get("/courses");
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}
