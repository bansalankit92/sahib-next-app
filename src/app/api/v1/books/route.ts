import {NextRequest, NextResponse} from "next/server";
import BooksDb from "@/db/BooksDb";


export async function POST(request: Request) {
    const body = await request.json()

    if (!body.name) {
        return NextResponse.json({success: false, message: 'Invalid Request: Name not found'}, {status: 400})

    }
    if (!body.content) {
        return NextResponse.json({success: false, message: 'Invalid Request: Content not found'}, {status: 400})

    }
    const resultBook = await BooksDb.create(body)
    return NextResponse.json({success: true, data: resultBook}, {status: 200})
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query') || searchParams.get('q') || '';
    const name = searchParams.get('name') || searchParams.get('name');
    const skip = Number(searchParams.get('skip')||0)
    const limit = Number(searchParams.get('limit')||10)
    console.log(query,name)
    if (name) {
        const results = await BooksDb.getByName({query: name})
        return NextResponse.json({success: true, data: results}, {status: 200})
    }
    else {
        const results = await BooksDb.search({query, skip,limit})
        return NextResponse.json({success: true, data: {results}}, {status: 200})
    }
    // return NextResponse.json({success: true, data: {}}, {status: 200})
}
