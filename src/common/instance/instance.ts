import axios from "axios"

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
})
// он нужен пробы прикреплять токен из локал стородж в каждом запросе
instance.interceptors.request.use(config => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("sn-token")}`
  return config
})
