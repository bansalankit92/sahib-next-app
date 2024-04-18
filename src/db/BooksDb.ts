import Books from "@/db/model/Books";
import connectDB from "@/db/connectDb";
import Utils from "@/lib/utils";


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
            authorName
        } = data;
        let newSlug = slug;
        if (!slug) {
            newSlug = Utils.getSlugRemovingSpace(name);
        }
        return await Books.create({
            name,
            slug: newSlug,
            lang,
            content,
            prev,
            next,
            current: current || 0,
            actualName: actualName || name,
            isTransliteration,
            sourceURL,
            authorName
        })
    },
    search: async ({query = "", skip = 0, limit = 10}) => {
        const match: any = {}
        if (query) {
            match['$or'] = [
                // {
                //     name: {$regex: `^${query}`, $options: 'i'}
                // },
                {
                    content: {$regex: `^${query}`, $options: 'i'}
                },
                {
                    $text: {
                        $search: query,
                    }
                }
            ];
        }
        console.log(JSON.stringify(match))
        return Books.find(match).skip(skip).limit(limit).sort({updatedAt: -1})
    },
    searchByName: async ({query = ''}) => {
        return Books.find({
            $or: [
                {
                    name: {$regex: `^${query}`, $options: 'i'}
                }, {
                    slug: {$regex: `^${query}`, $options: 'i'}
                },
            ]
        }).lean();
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