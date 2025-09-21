import mongoose, { Document, Model } from "mongoose";

// Define the interface for the Book document
interface IBook extends Document {
    name?: string;
    lang?: string;
    content?: string;
    isTransliteration?: boolean;
    sourceURL?: string;
    authorName?: string;
    slug?: string;
    prev?: number;
    next?: number;
    current?: number;
    actualName?: string;
    bookId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

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
);
BooksSchema.index(
    { content: 1, },
    { name: 'books_content_idx' }
);
BooksSchema.index(
    {  name: 1 },
    { name: 'books_name_idx' }
);

// Properly type the model
const Books: Model<IBook> = mongoose.models.Books || mongoose.model<IBook>("Books", BooksSchema);

export default Books;