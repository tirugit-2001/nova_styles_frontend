import * as axio_lib from 'axios';



export const baseURL = import.meta.env.VITE_BACKEND_URL


export const axios = axio_lib.default.create({
    baseURL,
    timeout:100000
})


axios.interceptors.request.use((config) => {
   return config;
}, (error) => {
    return Promise.reject(error);
})