import {parser} from 'html-metadata-parser';
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url)
    const toFindUrl = url.searchParams.get("url")
    const metadata = await parser(toFindUrl || 'https://www.youtube.com/watch?v=eSzNNYk7nVU');
    return NextResponse.json(metadata, {status: 200})
}
