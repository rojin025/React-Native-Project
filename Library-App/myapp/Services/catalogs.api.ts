import axios from "axios";

import { CatalogI } from "../Types/Types";

axios.defaults.baseURL = "http://localhost:9000/";

export async function getCatalogs() {
  try {
    const res = await axios.get("catalogs");
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function createCatalog(catalog: CatalogI) {
  try {
    const res = await axios.post("catalogs", catalog);
    if (res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCatalog(id: string, catalog: CatalogI) {
  try {
    console.log("API ID ", id);
    console.log("API catalog ", catalog);

    const res = await axios.put(`catalogs/${id}`, catalog);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCatalog(id: string) {
  try {
    const res = await axios.delete(`catalogs/${id}`);
    if (res.status === 200) {
      console.log("Deleted");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}
