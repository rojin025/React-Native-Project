import axios from "axios";

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

export async function createEntitie(entitieName: string, entitie: any) {
  try {
    console.log("Api create: ", entitie);
    const res = await axios.post(`${entitieName}s`, entitie);
    if (res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(`Error at API: `, error);
  }
}

export async function updateEntitie(
  entitieName: string,
  id: string,
  entitie: any
) {
  try {
    console.log("API ID ", id);
    console.log("API Book ", entitie);

    const res = await axios.put(`${entitieName}s/${id}`, entitie);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(`Error at API: `, error);
  }
}

export async function deleteEntitie(entitieName: string, id: string) {
  try {
    const res = await axios.delete(`${entitieName}s/${id}`);
    if (res.status === 200) {
      console.log("Deleted");
      return true;
    }
  } catch (error) {
    console.log(`Error at API: `, error);
  }
  return false;
}
