import axios from "axios"

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
})
