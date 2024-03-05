import axios from "axios";

const storedToken = localStorage.getItem("authToken");

const api = axios.create({
  baseURL: "http://localhost:5005/api"
});

const errorHandler = (err) => {
  throw err;
};

const getAlbums = () => {
  return api.get("/albums")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  //storedToken
  return api.post("/upload", file, {
    headers: { Authorization: `Bearer ${storedToken}` }
})
    .then(res => res.data)
    .catch(errorHandler);
};

const createAlbum = (newAlbum) => {
  return api.post("/albums", newAlbum)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  getAlbums,
  uploadImage,
  createAlbum
};
