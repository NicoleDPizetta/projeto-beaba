import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const pyApi = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});