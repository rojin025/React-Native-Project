import axios from "axios";

import { AuthorI } from "../Types/Types";

axios.defaults.baseURL = "http://localhost:9000/";

export async function getPublishers() {
  try {
    const res = await axios.get("publishers");
    // console.log(res.data);
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function createPublisher(publisher: AuthorI) {
  try {
    const res = await axios.post("publishers", publisher);
    if (res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePublisher(id: string, publisher: AuthorI) {
  try {
    const res = await axios.put(`publishers/${id}`, publisher);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePublisher(id: string) {
  try {
    const res = await axios.delete(`publishers/${id}`);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}
