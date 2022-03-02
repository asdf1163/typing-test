import axios from 'axios'

const staticURL = 'http://localhost:8080'

export const getUserData = axios.get(`${staticURL}/users`)
export const postUsertDataLogin = axios.post(`${staticURL}/users/login`)
export const postUsertDataSignup = axios.post(`${staticURL}/users/signup`)

