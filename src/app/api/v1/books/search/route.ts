import {NextRequest, NextResponse} from "next/server";
import BooksDb from "@/db/BooksDb";


export async function OPTIONS(request: Request) {
    const allowedOrigin = request.headers.get("origin");
    const response = new NextResponse(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": allowedOrigin || "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
                "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
            "Access-Control-Max-Age": "86400",
        },
    });

    return response;
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const query = body.query || body.q || '';
    const name = body.name;
    const skip = body.skip || 0;
    const limit = body.limit || 0;
    console.log(query, name)
    if (name) {
        const results = await BooksDb.getByName({query: name})
        return NextResponse.json({success: true, data: results}, {status: 200})
    } else {
        const results = await BooksDb.search({query, skip, limit})
        return NextResponse.json({success: true, data: {results}}, {status: 200})
    }
    // return NextResponse.json({success: true, data: {}}, {status: 200})
}
