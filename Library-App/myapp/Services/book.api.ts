import axios from "axios";

import { BookI } from "../Types/Types";

axios.defaults.baseURL = "http://localhost:9000/";

export async function getBooks() {
  try {
    const res = await axios.get("books");
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function createBook(book: BookI) {
  try {
    // console.log("API Book ", book);
    const res = await axios.post("books", book);
    if (res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function updateBook(id: string, book: BookI) {
  try {
    const res = await axios.put(`books/${id}`, book);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteBook(id: string) {
  try {
    const res = await axios.delete(`books/${id}`);
    if (res.status === 200) {
      console.log("Deleted");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}
