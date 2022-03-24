import axios from 'axios'

const staticURL = `http://localhost:8080`

export const getUserData = axios.get(`${staticURL}/users`)
export const postUsertDataLogin = (data: object) => axios.post(`${staticURL}/users/login`, data)
export const postUsertDataSignup = (data: object) => axios.post(`${staticURL}/users/signup`, data)

