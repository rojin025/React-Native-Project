import axios from "axios";

import { AuthorI } from "../Types/Types";

axios.defaults.baseURL = "http://localhost:9000/";

export async function getAuthors() {
  try {
    const res = await axios.get("authors");
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function createAuthor(author: AuthorI) {
  try {
    const res = await axios.post("authors", author);
    if (res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function updateAuthor(id: string, author: AuthorI) {
  try {
    const res = await axios.post(`authors/${id}`, author);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAuthor(id: string) {
  try {
    const res = await axios.delete(`authors/${id}`);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}
