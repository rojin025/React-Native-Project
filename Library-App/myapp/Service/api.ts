import axios from "axios";

import AuthorI from "../Types/types";

export const SERVER_BASE_URL = "http://localhost:9000/";

// axios.defaults.baseURL = "http://10.200.30.248:9000/";

export async function getAuthors() {
  try {
    const res = await axios.get("/authors");
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function createAuthor(author: AuthorI) {
  try {
    const res = await axios.post("/authors", author);
    if (res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCourse(id: string, author: AuthorI) {
  try {
    const res = await axios.post(`/Authors/${id}`, author);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}
