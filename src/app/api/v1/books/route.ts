import {NextRequest, NextResponse} from "next/server";
import BooksDb from "@/db/BooksDb";
import Utils from "@/lib/utils";


export async function POST(request: Request) {
    const body = await request.json()
    const {name, content, tokenize = true} = body;
    const actualName = body.actualName || name;
    if (!name) {
        return NextResponse.json({success: false, message: 'Invalid Request: Name not found'}, {status: 400})
    }
    if (!content) {
        return NextResponse.json({success: false, message: 'Invalid Request: Content not found'}, {status: 400})
    }
    const bookId = Utils.uniqueId('b');
    if (tokenize && content.length > 20000) {
        const batchedContent = Utils.breakIntoTokensWithSize({content})
        const results = [];
        for (let i = 0; i < batchedContent.length; i++) {
            results.push(await BooksDb.create({
                ...body,
                content: batchedContent[i],
                current: i,
                next: i + 1 < batchedContent.length ? i + 1 : undefined,
                prev: i - 1 >= 0 ? i - 1 : undefined,
                actualName,
                name: name + ' - ' + i,
                bookId,
            }))
        }
        return NextResponse.json({success: true, data: {results}}, {status: 200})

    } else {
        const result = await BooksDb.create({...body, bookId})
        return NextResponse.json({success: true, data: {result}}, {status: 200})
    }
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query') || searchParams.get('q') || '';
    const name = searchParams.get('name') || searchParams.get('name');
    const skip = Number(searchParams.get('skip') || 0)
    const limit = Number(searchParams.get('limit') || 10)
    console.log(query, name)
    if (name) {
        const results = await BooksDb.searchByName({query: name})
        return NextResponse.json({success: true, data: results}, {status: 200})
    } else {
        const results = await BooksDb.search({query, skip, limit})
        return NextResponse.json({success: true, data: {results}}, {status: 200})
    }
    // return NextResponse.json({success: true, data: {}}, {status: 200})
}
