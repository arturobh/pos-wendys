import axios from "axios";
const backendURL = 'http://localhost:3001';

export async function getCategory(id) {

    try{
        const response = await axios.get(backendURL+'/api/categories/'+id);
        return await response.data;
    }catch(error) {
        return [];
    }
}