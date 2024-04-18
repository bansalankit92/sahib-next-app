import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema({
        name: String,
        lang: String,
        content: String,
        isTransliteration: Boolean,
        sourceURL: String,
        authorName: String,
        slug: String,
        prev: Number,
        next: Number,
        current: Number,
        actualName: String,
        bookId: String,
    },
    {
        timestamps: true, collection: 'books'
    });

BooksSchema.index(
    { content: 'text', name: 'text' },
    { name: 'books_text_content_name_idx' }
);BooksSchema.index(
    { content: 1, },
    { name: 'books_content_idx' }
);BooksSchema.index(
    {  name: 1 },
    { name: 'books_name_idx' }
);
const Books =
    mongoose.models.Books || mongoose.model("Books", BooksSchema);

export default Books;