import axios from 'axios'; 


const API = axios.create({
    baseURL: 'https://wompi-backend-y2qy.onrender.com',
});

export const getProducts = async () => {
    const response = await API.get('/products');
    return response.data;
}