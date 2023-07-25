import axios from "axios";
const backendURL = 'http://localhost:3001';

export async function getAllCategories() {

    try{
        const response = await axios.get(backendURL+'/api/categories');
        return await response.data;
    }catch(error) {
        return [];
    }
    
}