import Books from "@/db/model/Books";
import connectDB from "@/db/connectDb";


(async () => {
    await connectDB();
})();

const BooksDb = {
    create: async (data: any = {}) => {
        await Books.create({
            name: data.name,
            slug: data.slug,
            lang: data.lang,
            content: data.content,
            isTransliteration: data.isTransliteration,
            sourceURL: data.sourceURL,
            authorName: data.authorName,
        })
    },
    search: async ({query = ""}) => {
        return Books.find({$or: [
                // {
                //     name: {$regex: `^${query}`, $options: 'i'}
                // },
                {
                    content: {$regex: `^${query}`, $options: 'i'}
                },
                {$text: {
                        $search: query,
                    }}
            ]})
    },
    getByName: async ({query = ''}) => {
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
};

export default BooksDb;