import axios from 'axios'; 


const API = axios.create({
    baseURL: 'http://localhost:3000',
});

export const getProducts = async () => {
    const response = await API.get('/products');
    return response.data;
}