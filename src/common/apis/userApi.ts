import axios from 'axios'

const staticURL = `http://192.168.42.101:8080`

export const getUserData = axios.get(`${staticURL}/api/users`)
export const postUsertDataLogin = (data: object) => axios.post(`${staticURL}/api/users/login`, data)
export const postUsertDataSignup = (data: object) => axios.post(`${staticURL}/api/users/signup`, data)

