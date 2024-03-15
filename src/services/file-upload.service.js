import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: `${apiURL}/api`
})

const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file, storedToken) => {
  return api.post("/upload", file, {
    headers: { Authorization: `Bearer ${storedToken}` }
})
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  uploadImage
};
