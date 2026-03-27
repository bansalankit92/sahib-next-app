import Books from "@/db/model/Books";
import connectDB from "@/db/connectDb";
import Utils from "@/lib/utils";

const DEFAULT_LIMIT = 10;
const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

(async () => {
    await connectDB();
})();

const BooksDb = {
    create: async (data: any = {}) => {
        const {
            name,
            slug,
            lang,
            content,
            prev,
            next,
            current,
            actualName,
            isTransliteration,
            sourceURL,
            authorName,
            bookId,
        } = data;
        let newSlug = slug;
        if (!slug) {
            newSlug = Utils.getSlugRemovingSpace(name);
        }
        return await Books.create({
            name: name.trim(),
            slug: newSlug,
            lang,
            content,
            prev,
            next,
            current: current || 0,
            actualName: actualName || name,
            isTransliteration,
            sourceURL,
            authorName,
            bookId,
        })
    },
    search: async ({query = "", bookId = "", regex = false, skip = 0, limit = DEFAULT_LIMIT}) => {
        const match: any = {}
        if (bookId) {
            match.bookId = bookId;
        }
        if (query) {
            const trimmed = query.trim();
            if (regex) {
                match.content = {$regex: trimmed, $options: 'i'};
            } else {
                const escaped = escapeRegex(trimmed.replace(/^"|"$/g, ''));
                match['$or'] = [
                    {
                        content: {$regex: escaped, $options: 'i'}
                    },
                    {
                        $text: {
                            $search: trimmed,
                        }
                    }
                ];
            }
        }
        const results = await Books.find(match)
            .sort({current: 1})
            .skip(skip)
            .limit(limit + 1)
            .lean();

        const hasMore = results.length > limit;
        const pagedResults = hasMore ? results.slice(0, limit) : results;

        return {
            results: pagedResults,
            page: {
                skip,
                limit,
                nextSkip: hasMore ? skip + limit : null,
                hasMore,
            },
        };
    },
    searchByName: async ({query = '', limit = 20}) => {
        const escapedQuery = escapeRegex(query.trim());
        const safeLimit = Math.min(Math.max(limit, 1), 30);
        if (!escapedQuery) {
            return [];
        }
        return Books.aggregate([
            {
                $match: {
                    $or: [
                        {actualName: {$regex: escapedQuery, $options: "i"}},
                        {name: {$regex: escapedQuery, $options: "i"}},
                        {slug: {$regex: escapedQuery, $options: "i"}},
                    ],
                },
            },
            {
                $group: {
                    _id: {$ifNull: ["$bookId", {$toString: "$_id"}]},
                    bookId: {$first: {$ifNull: ["$bookId", {$toString: "$_id"}]}},
                    actualName: {$first: {$ifNull: ["$actualName", "$name"]}},
                    slug: {$first: "$slug"},
                },
            },
            {$sort: {actualName: 1}},
            {$limit: safeLimit},
        ]).exec();
    },
    getOneBy: async ({name, actualName, current}: any = {}) => {
        const match: any = {};
        if (name) {
            match.name = name
        }
        if (actualName) {
            match.actualName = actualName
        }
        if (current >= 0) {
            match.current = current
        }
        return Books.findOne(match).lean();
    },
};

export default BooksDb;
