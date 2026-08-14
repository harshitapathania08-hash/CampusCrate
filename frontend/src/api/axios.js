import axios from "axios";

const API = axios.create({
  baseURL: "https://campuscrate-1bl2.onrender.com/api",
});

export default API;