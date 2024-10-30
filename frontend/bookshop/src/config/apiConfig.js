import axios from 'axios'
export const API_BASE_URL = 'http://localhost:5454'
const jwt = localStorage.getItem('jwt')
export const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3Mjk2MTI3OTIsImV4cCI6MTczMDQ3Njc5MiwiZW1haWwiOiJ2aW5odGVzdGVyQGdtYWlsLmNvbSJ9.tdbv4vhVxyGoIKuvaOGw3Y8F252w-Zk9UhMnCpZNezM'
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  },
})
