import axios from "axios";

import { BookI } from "../Types/Types";

axios.defaults.baseURL = "http://localhost:9000/";

export async function getEntities(entities: string) {
  try {
    const res = await axios.get(`${entities}`);
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(`Error at ${entities} : `, error);
  }
  return [];
}

export async function createEntitie(entitie: any) {
  try {
    // console.log("API entitie  ", entitie );
    const res = await axios.post(`${entitie}s`, entitie);
    if (res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(`Error at API: `, error);
  }
}

export async function updateEntitie(id: string, entitie: any) {
  try {
    console.log("API ID ", id);
    console.log("API Book ", entitie);

    const res = await axios.put(`${entitie}s/${id}`, entitie);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(`Error at API: `, error);
  }
}

export async function deleteEntitie(entitie: string, id: string) {
  try {
    const res = await axios.delete(`${entitie}s/${id}`);
    if (res.status === 200) {
      console.log("Deleted");
      return true;
    }
  } catch (error) {
    console.log(`Error at API: `, error);
  }
  return false;
}
