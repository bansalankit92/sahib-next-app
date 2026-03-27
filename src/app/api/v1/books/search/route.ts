import {NextRequest, NextResponse} from "next/server";
import BooksDb from "@/db/BooksDb";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;
const VALID_MODES = new Set(["normal", "fuzzy", "regex"]);
const MIN_REGEX_LENGTH = 2;
const MAX_REGEX_LENGTH = 120;

const getSafeNumber = (value: unknown, fallback: number) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }
    return parsed;
};

const validateRegexPattern = (query = "") => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
        return "Regex mode requires a query pattern.";
    }
    if (normalizedQuery.length < MIN_REGEX_LENGTH) {
        return `Regex query must be at least ${MIN_REGEX_LENGTH} characters.`;
    }
    if (normalizedQuery.length > MAX_REGEX_LENGTH) {
        return `Regex query must be at most ${MAX_REGEX_LENGTH} characters.`;
    }
    if (/^(\.\*|\.\+)/.test(normalizedQuery)) {
        return "Regex cannot start with a greedy wildcard.";
    }
    try {
        // Validate syntax and reject malformed patterns early.
        new RegExp(normalizedQuery);
    } catch (error) {
        return "Invalid regex pattern.";
    }
    return null;
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
        const titleQuery = String(body.titleQuery || "").trim();
        const bookId = String(body.bookId || "").trim();
        const mode = String(body.mode || "").trim().toLowerCase();
        const skip = Math.max(getSafeNumber(body.skip, 0), 0);
        const limit = Math.min(Math.max(getSafeNumber(body.limit, DEFAULT_LIMIT), 1), MAX_LIMIT);

        if (!VALID_MODES.has(mode)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid mode. Supported values: normal, fuzzy, regex.",
                },
                {status: 400}
            );
        }

        if (mode === "regex") {
            const regexError = validateRegexPattern(query);
            if (regexError) {
                return NextResponse.json({success: false, message: regexError}, {status: 400});
            }
        }

        const data = await BooksDb.searchAtlas({
            query,
            titleQuery,
            bookId,
            mode: mode as "normal" | "fuzzy" | "regex",
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
