"use client";

import React, {Suspense, useEffect, useState} from "react";
import {marked} from "marked";
import {useSearchParams} from "next/navigation";


interface PlayerProps {

}

const BooksSection: React.FC<PlayerProps> = ({}) => {

    const [mdBook, setMdBook] = useState<string>();
    const searchParams = useSearchParams()

    useEffect(() => {
        let url = searchParams.get("url") || "https://raw.githubusercontent.com/bansalankit92/indian-script-reader/master/assets/70-pralay-marag-mahi/70-praylay-marag-mahi-hin.md";
        fetch(url,)
            .then(response => response.blob())
            .then(buffer => {
                var reader = new FileReader();
                reader.readAsText(buffer)//, "ISO-8859-1")
                reader.onload = function (e) {
                    console.log(reader.result)
                    setMdBook(reader.result as string)
                }
            })
    }, [searchParams]);

    return (
        <Suspense>
        <section
            className="container mx-auto px-4 py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white dark:bg-gray-900"
            id="books-section">
            <div
                className="flex flex-col items-center justify-center w-full mb-8 md:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 3xl:mb-28">
                <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl">
                    Books
                </h2>
                <p className="text-center text-gray-600 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
                    Read books and read more about Indian scripts.
                </p>
            </div>
            <div>
                {mdBook && <MarkdownRenderer markdown={mdBook}/>}
            </div>
        </section>
            </Suspense>
    );
}


const MarkdownRenderer = ({markdown}: { markdown: string }) => {

    function getMarkdownText() {
        let rawMarkup = marked.parse(markdown);
        return {__html: rawMarkup};
    }

    return (
        <article className="md1 prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={getMarkdownText()}/>
        </article>
    )
}

export default BooksSection;