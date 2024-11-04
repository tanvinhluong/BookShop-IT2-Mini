import axios from 'axios'
export const API_BASE_URL = 'http://localhost:5454'
const jwt = localStorage.getItem('jwt')
export const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzA0NzgwMDAsImV4cCI6MTczMTM0MjAwMCwiZW1haWwiOiIgIn0.jnSMxHL1mdSpW0bIOik8x3qLBV6tu-1YGVr7Q-vQHf8'
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  },
})
