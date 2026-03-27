import {API} from "@/services/AppConstants";

type SearchRequest = {
    query?: string;
    bookId?: string;
    regex?: boolean;
    skip?: number;
    limit?: number;
};

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
    search: async ({
                       query = '',
                       bookId = '',
                       regex = false,
                       skip = 0,
                       limit = 10,
                   }: SearchRequest) => {
        const headers = {
            ...DefaultHeaders,
            method: 'POST',
            body: JSON.stringify({
                query: query?.trim() || undefined,
                bookId: bookId?.trim() || undefined,
                regex,
                skip,
                limit,
            })
        }
        const res = await fetch(BASE_URL+'/search', headers)
        const result = await res.json();
        return result;
    },
    findName: async (name = '') => {
        const headers = {
            ...DefaultHeaders,
            method: 'GET',
        }
        const res = await fetch(BASE_URL+'?name=' + encodeURIComponent(name), headers)
        const result = await res.json();
        return result;
    }
}

export default BooksAPIService
