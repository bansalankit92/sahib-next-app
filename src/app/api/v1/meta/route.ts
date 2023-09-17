import {parser} from 'html-metadata-parser';
import {NextResponse} from "next/server";
import metaService from "@/services/metaService";
import {getParsedText} from "@/services/utils";

interface UrlWithTitle {
    url: string;
    title: string;
}

/**
 * @Example: http://localhost:3000/api/v1/meta?url=https://drive.google.com/file/d/18jSxXtyrxqys5I6Lo1RwpcxfOKpGqS_P/view?usp=share_link
 * http://localhost:3000/api/v1/meta?csv=http://localhost:3000/data/yturl.csv
 * @param request
 * @constructor
 */
export async function GET(request: Request) {
    const url = new URL(request.url)
    const toFindUrl = url.searchParams.get("url")
    const csvUrl = url.searchParams.get("csv")
    if (toFindUrl) {
        return NextResponse.json(await metaService.getMetadata(toFindUrl), {status: 200})
    }
    if (csvUrl) {
        const csvDataRes = await fetch(csvUrl);
        const csvData = await csvDataRes.text()
        const urls = csvData.split('\n');
        const results: UrlWithTitle[] = [];
        for (const u of urls) {
            let myUrl = u;
            if (u.includes("https://docs.google.com/uc?export=download&id=")) {
                const googleDoc = new URL(u)
                const id = googleDoc.searchParams.get("id")
                myUrl = `https://drive.google.com/file/d/${id}/view?usp=share_link`
            }

            const mdata = await metaService.getMetadata(myUrl);
            results.push({
                url: u,
                title: getParsedText(mdata.meta.title || ''),
            })
        }
        return NextResponse.json(results, {status: 200})
    }
    return NextResponse.json({success: false, message: 'Invalid Request'}, {status: 400})

}
