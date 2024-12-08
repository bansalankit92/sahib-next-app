

export const MEDIA_PATH_JSON  = {
    SATSANG_PATH:"/data/satsangUrlTitle.json",
    BHAJAN_PATH:"/data/bhajansUrlTitle.json",
    SAHIB_BHAJAN_PATH:"/data/sahibBhajansUrlTitle.json",
}

export const API={
    BASE_PATH : process.env.NEXT_PUBLIC_FE_URL || 'http://127.0.0.1:3000',
    BASE_API_PATH: '/api/v1',
    BOOKS: '/books',
}

export const APP_PATHS = {
    SATSANG: '/?type=SATSANG',
    BHAJAN: '/?type=BHAJAN',
    SAHIB_BHAJAN: '/?type=SAHIB_BHAJAN',
    BOOKS: '/books',
    CHALISA: '/books/chalisa',
    AARTI1: '/books/aarti-1',
    AARTI2: '/books/aarti-2',
}