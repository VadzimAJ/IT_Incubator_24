import axios from "axios";
import {apiKey_, token_} from "./token_";


const token = token_
const apiKey = apiKey_

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    timeout: 1000,
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    }
});