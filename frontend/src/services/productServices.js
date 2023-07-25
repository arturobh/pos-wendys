import axios from "axios";
const backendURL = 'http://localhost:3001';

export async function getProducts(categoryName) {

    try{
        const response = await axios.get(backendURL+'/api/products/byCategory/'+categoryName);
        return await response.data;
    }catch(error) {
        return [];
    }
}

export async function getOneProduct(id) {

    try{
        const response = await axios.get(backendURL+'/api/products/'+id);
        return await response.data;
    }catch(error) {
        return [];
    }
}