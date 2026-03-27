import {API} from "@/services/AppConstants";

export type BookSearchMode = "normal" | "fuzzy" | "regex";

type SearchRequest = {
    query?: string;
    titleQuery?: string;
    bookId?: string;
    mode: BookSearchMode;
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
                       titleQuery = '',
                       bookId = '',
                       mode = "normal",
                       skip = 0,
                       limit = 10,
                   }: SearchRequest) => {
        const headers = {
            ...DefaultHeaders,
            method: 'POST',
            body: JSON.stringify({
                query: query?.trim() || '',
                titleQuery: titleQuery?.trim() || '',
                bookId: bookId?.trim() || '',
                mode,
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
