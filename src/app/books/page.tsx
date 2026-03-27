"use client";

import React, {useEffect, useRef, useState} from "react";
import Head from "next/head";
import Input from "@/components/Input";
import Button from "@/components/Button";
import BooksAPIService from "@/services/BooksAPIService";
import {toast} from "react-toastify";
import Highlighter from "react-highlight-words";
type BookSuggestion = {
    bookId?: string;
    actualName?: string;
    slug?: string;
};

type BookResult = {
    _id?: string;
    name?: string;
    actualName?: string;
    content?: string;
    bookId?: string;
    current?: number;
    score?: number;
};

const DEFAULT_LIMIT = 10;

const getSearchWords = (query = "") => {
    if (query.includes('"')) {
        return [query.replaceAll('"', "").trim()].filter(Boolean);
    }
    return query.split(/\s+/).filter(Boolean);
};

const BooksSection: React.FC = () => {
    const [query, setQuery] = useState("");
    const [titleQuery, setTitleQuery] = useState("");
    const [selectedBook, setSelectedBook] = useState<BookSuggestion | null>(null);
    const [booksList, setBooksList] = useState<BookResult[]>([]);
    const [titleSuggestions, setTitleSuggestions] = useState<BookSuggestion[]>([]);
    const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
    const [fullMatch, setFullMatch] = useState(true);
    const [useRegex, setUseRegex] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState({
        skip: 0,
        limit: DEFAULT_LIMIT,
        nextSkip: null as number | null,
        hasMore: false,
    });

    const suggestionDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const onSearch = async ({
                                append = false,
                                skipOverride,
                                queryOverride,
                                selectedBookOverride,
                            }: {
        append?: boolean;
        skipOverride?: number;
        queryOverride?: string;
        selectedBookOverride?: BookSuggestion | null;
    } = {}) => {
        const activeQuery = (queryOverride ?? query).trim();
        const activeSelectedBook =
            selectedBookOverride !== undefined ? selectedBookOverride : selectedBook;
        const activeSkip = append ? skipOverride ?? page.nextSkip ?? 0 : 0;

        if (append) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const searchQuery = activeQuery && fullMatch ? `"${activeQuery}"` : activeQuery;
            const res = await BooksAPIService.search({
                query: searchQuery,
                bookId: activeSelectedBook?.bookId || "",
                regex: useRegex,
                skip: activeSkip,
                limit: DEFAULT_LIMIT,
            });

            if (!res?.success) {
                throw new Error(res?.message || "Failed to search books");
            }

            const results = Array.isArray(res?.data?.results) ? res.data.results : [];
            const apiPage = res?.data?.page || {};

            setBooksList((prev) => (append ? [...prev, ...results] : results));
            setPage({
                skip: Number(apiPage.skip ?? activeSkip),
                limit: Number(apiPage.limit ?? DEFAULT_LIMIT),
                nextSkip:
                    typeof apiPage.nextSkip === "number" ? apiPage.nextSkip : null,
                hasMore: Boolean(apiPage.hasMore),
            });
        } catch (error) {
            if (error instanceof Error) {
                toast(error.message);
            } else {
                toast("Failed to find books");
            }
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const fetchTitleSuggestions = async (value: string) => {
        try {
            const res = await BooksAPIService.findName(value);
            const results = Array.isArray(res?.data?.results) ? res.data.results : [];
            setTitleSuggestions(results);
            setShowTitleSuggestions(results.length > 0);
        } catch (error) {
            setTitleSuggestions([]);
            setShowTitleSuggestions(false);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const initialQuery = (params.get("q") || "").trim();
        const initialTitle = (params.get("title") || "").trim();
        const initialBookId = (params.get("bookId") || "").trim();

        const initialBook = initialBookId
            ? {
                bookId: initialBookId,
                actualName: initialTitle || initialBookId,
            }
            : null;

        if (initialQuery) {
            setQuery(initialQuery);
        }
        if (initialTitle) {
            setTitleQuery(initialTitle);
        }
        if (initialBook) {
            setSelectedBook(initialBook);
        }

        if (initialQuery || initialTitle || initialBookId) {
            onSearch({
                queryOverride: initialQuery,
                selectedBookOverride: initialBook,
            });
        }
    }, []);

    useEffect(() => {
        const normalizedTitle = titleQuery.trim();
        const selectedTitle = (selectedBook?.actualName || "").trim();

        if (!normalizedTitle || normalizedTitle === selectedTitle) {
            setTitleSuggestions([]);
            setShowTitleSuggestions(false);
            return;
        }

        if (suggestionDebounceRef.current) {
            clearTimeout(suggestionDebounceRef.current);
        }

        suggestionDebounceRef.current = setTimeout(() => {
            fetchTitleSuggestions(normalizedTitle);
        }, 250);

        return () => {
            if (suggestionDebounceRef.current) {
                clearTimeout(suggestionDebounceRef.current);
            }
        };
    }, [titleQuery, selectedBook?.bookId, selectedBook?.actualName]);

    return (
        <>
            <Head>
                <title>Search Books - Sahibji Satsang and Bhajans</title>
                <meta name="description" content="Search book name or content in hindi or english transliteration" />
            </Head>
            <section
                className="container mx-auto px-4 py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white dark:bg-gray-900 dark:text-white"
                id="books-section">
            <div
                className="flex flex-col items-center justify-center w-full mb-8 md:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 3xl:mb-28">
                <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl dark:text-white">
                    Search Books
                </h2>
                <p className="text-center text-gray-600 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl dark:text-white">
                    Search book titles and content in Hindi, Devanagari, and transliterated text
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <Input
                        name={"titleQuery"}
                        label={"Book Title Filter"}
                        value={titleQuery}
                        onChange={(e) => {
                            const value = e.target.value;
                            setTitleQuery(value);
                            setShowTitleSuggestions(true);
                            if ((selectedBook?.actualName || "") !== value) {
                                setSelectedBook(null);
                            }
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                onSearch();
                            }
                        }}
                    />
                    {showTitleSuggestions && titleSuggestions.length > 0 && (
                        <div className="border border-gray-200 rounded mt-2 max-h-56 overflow-y-auto bg-white dark:bg-gray-800">
                            {titleSuggestions.map((suggestion) => (
                                <button
                                    key={`${suggestion.bookId}-${suggestion.slug}`}
                                    type="button"
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => {
                                        setSelectedBook(suggestion);
                                        setTitleQuery(suggestion.actualName || "");
                                        setShowTitleSuggestions(false);
                                        setTitleSuggestions([]);
                                        onSearch({selectedBookOverride: suggestion});
                                    }}
                                >
                                    {suggestion.actualName || suggestion.slug || suggestion.bookId}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <Input
                    name={"query"}
                    label={"Search Inside Book"}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            onSearch();
                        }
                    }}
                />

                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={fullMatch}
                            onChange={(e) => {
                                setFullMatch(e.target.checked);
                                if (e.target.checked) setUseRegex(false);
                            }}
                            className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">Full Match</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={useRegex}
                            onChange={(e) => {
                                setUseRegex(e.target.checked);
                                if (e.target.checked) setFullMatch(false);
                            }}
                            className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">Regex</span>
                    </label>
                </div>

                <div className="flex gap-3 items-center">
                    <Button text={"Search"} loading={loading} onClick={() => onSearch()}/>
                    {selectedBook?.bookId && (
                        <button
                            type="button"
                            className="px-3 py-2 rounded border text-sm"
                            onClick={() => {
                                setSelectedBook(null);
                                setTitleQuery("");
                            }}
                        >
                            Clear Book Scope
                        </button>
                    )}
                </div>

            <div>
                <div className="mb-3">
                    Books List ({booksList.length})
                </div>
                {!loading && booksList.length === 0 && (
                    <div className="text-sm text-gray-500">No books found.</div>
                )}

                <div className="flex flex-col gap-3">
                    {booksList.map((book, index) => (
                        <details key={`${book._id || book.name}-${index}`} className="border rounded p-3">
                            <summary className="cursor-pointer font-medium">
                               ({(book.current ?? 0) + 1}) {book.actualName || book.name}
                            </summary>
                            <div className="mt-3 text-sm whitespace-pre-wrap">
                                <Highlighter
                                    highlightClassName=""
                                    searchWords={getSearchWords(query)}
                                    autoEscape={true}
                                    textToHighlight={book.content || ""}
                                />
                            </div>
                        </details>
                    ))}
                </div>

                {page.hasMore && (
                    <div className="mt-4">
                        <Button
                            text={"Load more"}
                            loading={loadingMore}
                            onClick={() => onSearch({append: true})}
                        />
                    </div>
                )}
            </div>
            </div>
        </section>
        </>
    );
}


export default BooksSection;
