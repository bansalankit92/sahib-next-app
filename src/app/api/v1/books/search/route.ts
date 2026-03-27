import {NextRequest, NextResponse} from "next/server";
import BooksDb from "@/db/BooksDb";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

const getSafeNumber = (value: unknown, fallback: number) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }
    return parsed;
};

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
    try {
        const body = await request.json();
        const query = String(body.query || "").trim();
        const bookId = String(body.bookId || "").trim();
        const regex = Boolean(body.regex);
        const skip = Math.max(getSafeNumber(body.skip, 0), 0);
        const limit = Math.min(Math.max(getSafeNumber(body.limit, DEFAULT_LIMIT), 1), MAX_LIMIT);

        const data = await BooksDb.search({
            query,
            bookId,
            regex,
            skip,
            limit,
        });

        return NextResponse.json({success: true, data}, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to search books",
            },
            {status: 500}
        );
    }
}
