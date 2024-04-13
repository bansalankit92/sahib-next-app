import {API} from "@/services/AppConstants";

const DefaultHeaders = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
}

const BASE_URL = API.BASE_PATH+API.BASE_API_PATH+API.BOOKS
const BooksAPIService = {
    add: async (body = {}) => {
        const headers = {
            ...DefaultHeaders,
            body: JSON.stringify(body)
        }
        console.log(headers)
        const res = await fetch(BASE_URL, headers)
        const result = await res.json();
        return result;
    },
    search: async (query = '') => {
        const headers = {
            ...DefaultHeaders,
            method: 'GET',
        }
        const res = await fetch(BASE_URL+'?query=' + query, headers)
        const result = await res.json();
        return result;
    },
    findName: async (name = '') => {
        const headers = {
            ...DefaultHeaders,
            method: 'GET',
        }
        const res = await fetch(BASE_URL+'?name=' + name, headers)
        const result = await res.json();
        return result;
    }
}

export default BooksAPIService