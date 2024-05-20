import axios from "axios";

axios.defaults.baseURL = "http://localhost:9000/";

export async function isEligibleUser(email: string) {
  try {
    const res = await axios.get(`users?email=${email}`);
    if (res.status === 200 && res.data.length > 0) {
      return true;
    }
  } catch (error) {}
  return false;
}
