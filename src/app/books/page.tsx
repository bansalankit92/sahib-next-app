"use client";

import React, {useEffect, useState} from "react";
import Head from "next/head";
import {useSearchParams} from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import BooksAPIService from "@/services/BooksAPIService";
import {toast} from "react-toastify";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import Highlighter from "react-highlight-words";
import MarkdownRenderer from "@/components/MarkdownRenderer";


interface PlayerProps {

}

const BooksSection: React.FC<PlayerProps> = ({}) => {

    const [query, setQuery] = useState<string | null>();
    const searchParams = useSearchParams()
    const [booksList, setBooksList] = useState([])
    const [loading, setLoading] = useState(false)

    const onSearch = async (val: string | null | undefined) => {
        let q = val || query || searchParams.get("q")
        try {
            console.log(q);
            setLoading(true);
            const res = await BooksAPIService.search(q || '');
            console.log(res)
            const list = res?.data?.results;
            setBooksList(list)
        } catch (e) {
            toast("Failed to find books")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        onSearch('');
    }, []);

    useEffect(() => {
        let q = searchParams.get("q")
        if (q) {
            onSearch(q);
        }
    }, [searchParams]);

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
                    Search book name or content in hindi or english transliteration
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <Input name={"query"} label={"Search Query"}
                       onChange={(e) => {
                           setQuery(e.target.value)
                       }}
                       onKeyDown={(event) => {
                           if (event.key === 'Enter') {
                               onSearch(query)
                           }}}
                />
                <Button text={"Submit"} loading={loading} onClick={() => onSearch(query)}/>


            <div>
                Books List

                <Accordion allowZeroExpanded={true} allowMultipleExpanded={true}>
                    {
                        booksList?.map((x: any) => (
                            <AccordionItem key={x?.name}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        {x.name}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <Highlighter
                                        highlightClassName=""
                                        searchWords={ query?.includes('"')?[query.replaceAll('"','')] :(query||'').split(' ')}
                                        autoEscape={true}
                                        textToHighlight={x.content}
                                    />
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>
            </div>
        </section>
        </>
    );
}


export default BooksSection;