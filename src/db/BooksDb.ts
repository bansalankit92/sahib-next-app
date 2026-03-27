import Books from "@/db/model/Books";
import connectDB from "@/db/connectDb";
import Utils from "@/lib/utils";

const SEARCH_INDEX_NAME = "default";
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

const SEARCHABLE_PATHS = [
    "content.hi",
    "content.std",
    "name.hi",
    "name.std",
    "actualName.hi",
    "actualName.std",
];

const TITLE_PATHS = [
    "name.hi",
    "name.std",
    "actualName.hi",
    "actualName.std",
];

const REGEX_PATHS = [
    "content.hi",
    "content.std",
    "name.hi",
    "name.std",
    "actualName.hi",
    "actualName.std",
];

const FUZZY_OPTIONS = {
    maxEdits: 1,
    prefixLength: 2,
    maxExpansions: 50,
};

type SearchMode = "normal" | "fuzzy" | "regex";

type AtlasSearchParams = {
    query?: string;
    titleQuery?: string;
    bookId?: string;
    mode?: SearchMode;
    skip?: number;
    limit?: number;
};

type NameSearchParams = {
    query?: string;
    limit?: number;
};

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizeLimit = (limit = DEFAULT_LIMIT) => {
    if (!Number.isFinite(limit)) {
        return DEFAULT_LIMIT;
    }
    return Math.min(Math.max(Math.floor(limit), 1), MAX_LIMIT);
};

const normalizeSkip = (skip = 0) => {
    if (!Number.isFinite(skip)) {
        return 0;
    }
    return Math.max(Math.floor(skip), 0);
};

const buildTextOperator = ({
                               query,
                               path,
                               fuzzy = false,
                           }: {
    query: string;
    path: string[];
    fuzzy?: boolean;
}) => {
    const text: {
        query: string;
        path: string[];
        fuzzy?: typeof FUZZY_OPTIONS;
    } = {
        query,
        path,
    };
    if (fuzzy) {
        text.fuzzy = FUZZY_OPTIONS;
    }
    return {text};
};

const buildRegexOperators = ({pattern}: { pattern: string }) =>
    REGEX_PATHS.map((path) => ({
        regex: {
            query: pattern,
            path,
            allowAnalyzedField: true,
        },
    }));

const BooksDb = {
    create: async (data: any = {}) => {
        await connectDB();
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
    search: async ({query = "", skip = 0, limit = DEFAULT_LIMIT}) => {
        await connectDB();
        const match: any = {}
        if (query) {
            match['$or'] = [
                // {
                //     name: {$regex: `^${query}`, $options: 'i'}
                // },
                {
                    content: {$regex: `^${query.trim()}`, $options: 'i'}
                },
                {
                    $text: {
                        $search: query.trim(),
                    }
                }
            ];
        }
        return Books.find(match).skip(skip).limit(limit).sort({updatedAt: -1})
    },
    searchAtlas: async ({
                            query = "",
                            titleQuery = "",
                            bookId = "",
                            mode = "normal",
                            skip = 0,
                            limit = DEFAULT_LIMIT,
                        }: AtlasSearchParams = {}) => {
        await connectDB();

        const safeSkip = normalizeSkip(skip);
        const safeLimit = normalizeLimit(limit);
        const normalizedQuery = query.trim();
        const normalizedTitleQuery = titleQuery.trim();
        const normalizedBookId = bookId.trim();
        const normalizedMode: SearchMode = mode;

        if (!normalizedQuery && !normalizedTitleQuery && !normalizedBookId) {
            return {
                results: [],
                page: {
                    skip: safeSkip,
                    limit: safeLimit,
                    nextSkip: null,
                    hasMore: false,
                },
            };
        }

        const compound: {
            must?: Array<Record<string, unknown>>;
            should?: Array<Record<string, unknown>>;
            filter?: Array<Record<string, unknown>>;
            minimumShouldMatch?: number;
        } = {};

        if (normalizedBookId) {
            compound.filter = [
                {
                    equals: {
                        path: "bookId",
                        value: normalizedBookId,
                    },
                },
            ];
        }

        if (normalizedTitleQuery) {
            compound.must = [
                buildTextOperator({
                    query: normalizedTitleQuery,
                    path: TITLE_PATHS,
                    fuzzy: normalizedMode === "fuzzy",
                }),
            ];
        }

        if (normalizedQuery) {
            if (normalizedMode === "regex") {
                compound.should = buildRegexOperators({pattern: normalizedQuery});
            } else {
                compound.should = [
                    buildTextOperator({
                        query: normalizedQuery,
                        path: SEARCHABLE_PATHS,
                        fuzzy: normalizedMode === "fuzzy",
                    }),
                ];
            }
            compound.minimumShouldMatch = 1;
        } else if (!normalizedTitleQuery && normalizedBookId) {
            compound.must = [
                {
                    exists: {
                        path: "content",
                    },
                },
            ];
        }

        const pipeline: Record<string, unknown>[] = [
            {
                $search: {
                    index: SEARCH_INDEX_NAME,
                    compound,
                },
            },
            {
                $sort: {
                    score: {
                        $meta: "searchScore" as const,
                    },
                    updatedAt: -1,
                },
            },
            {
                $skip: safeSkip,
            },
            {
                $limit: safeLimit + 1,
            },
            {
                $project: {
                    name: 1,
                    slug: 1,
                    lang: 1,
                    content: 1,
                    actualName: 1,
                    bookId: 1,
                    isTransliteration: 1,
                    current: 1,
                    updatedAt: 1,
                    score: {
                        $meta: "searchScore" as const,
                    },
                },
            },
        ];

        const results = await Books.aggregate(pipeline as any[]).exec();

        const hasMore = results.length > safeLimit;
        const pagedResults = hasMore ? results.slice(0, safeLimit) : results;

        return {
            results: pagedResults,
            page: {
                skip: safeSkip,
                limit: safeLimit,
                nextSkip: hasMore ? safeSkip + safeLimit : null,
                hasMore,
            },
        };
    },
    searchByName: async ({query = "", limit = 20}: NameSearchParams = {}) => {
        await connectDB();
        const normalizedQuery = query.trim();
        const safeLimit = Math.min(Math.max(limit, 1), 30);
        const escapedQuery = escapeRegex(normalizedQuery);

        const match = escapedQuery
            ? {
                $or: [
                    {actualName: {$regex: escapedQuery, $options: "i"}},
                    {name: {$regex: escapedQuery, $options: "i"}},
                    {slug: {$regex: escapedQuery, $options: "i"}},
                ],
            }
            : {};

        return Books.aggregate([
            {$match: match},
            {$sort: {updatedAt: -1}},
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
        await connectDB();
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
