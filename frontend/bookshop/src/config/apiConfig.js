import axios from "axios";
export const API_BASE_URL = "http://localhost:5454";
export const jwt = localStorage.getItem("jwt");
export const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzM0MTMyODksImV4cCI6MTczNDI3NzI4OSwiZW1haWwiOiJ2aW5odGVzdGVyMTIzQGdtYWlsLmNvbSJ9.ahHWS8niYp-OPm3XEDtaManfahSEd8El0BKxaf0udfA";
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
});
