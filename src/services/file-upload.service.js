// src/services/file-upload.service.js

import axios from "axios";

const storedToken = localStorage.getItem("authToken");

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/api"
  // withCredentials: true // => you might need this option if using cookies and sessions
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
