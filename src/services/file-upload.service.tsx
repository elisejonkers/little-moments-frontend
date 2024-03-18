import axios, { AxiosError } from "axios";

const apiURL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: `${apiURL}/api`
})

const errorHandler = (err: AxiosError): never => {
  throw err;
};

const uploadImage = (file: FormData, storedToken: string | null): Promise<any> => {
  return api.post("/upload", file, {
    headers: { Authorization: `Bearer ${storedToken}` }
  })
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  uploadImage
};
