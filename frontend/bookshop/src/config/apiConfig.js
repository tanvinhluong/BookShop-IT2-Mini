import axios from "axios";
export const API_BASE_URL = "http://localhost:5454";
export const jwt = localStorage.getItem("jwt");
export const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzA3MzA2NTAsImV4cCI6MTczMTU5NDY1MCwiZW1haWwiOiJ2aW5odGVzdGVyQGdtYWlsLmNvbSJ9.iFllq90JaEdZHA6iLQxt8RW6GhgZJQ34ly23mei0H_Y";
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
});
