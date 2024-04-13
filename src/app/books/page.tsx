"use client";

import React, {useEffect, useState} from "react";
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


interface PlayerProps {

}

const BooksSection: React.FC<PlayerProps> = ({}) => {

    const [query, setQuery] = useState<string | null>();
    const searchParams = useSearchParams()
    const [booksList, setBooksList] = useState([])

    const onSearch = async (val: string | null | undefined) => {
        let q = val || query || searchParams.get("q")
        try {
            console.log(q);
            const res = await BooksAPIService.search(q || '');
            console.log(res)
            const list = res?.data?.result;
            setBooksList(list)
        } catch (e) {
            toast("Failed to find books")
        }
    }

    useEffect(() => {
        let q = searchParams.get("q")
        if (q) {
            onSearch(q);
        }
    }, [searchParams]);

    return (
        <section
            className="container mx-auto px-4 py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white dark:bg-gray-900 dark:text-white"
            id="books-section">
            <div
                className="flex flex-col items-center justify-center w-full mb-8 md:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 3xl:mb-28">
                <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl">
                    Search Books
                </h2>
                <p className="text-center text-gray-600 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <Input name={"query"} label={"Search Query"}
                       onChange={(e) => {
                           setQuery(e.target.value)

                       }}/>
                <Button text={"Submit"} onClick={() => onSearch(query)}/>

            </div>
            <div>
                Books List
                {booksList}

                <Accordion>
                    {
                        booksList?.map((x: any) => (
                            <AccordionItem key={x?.name}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        {x.name}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        {x.content}
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))
                    }
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                What harsh truths do you prefer to ignore?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                Exercitation in fugiat est ut ad ea cupidatat ut in
                                cupidatat occaecat ut occaecat consequat est minim minim
                                esse tempor laborum consequat esse adipisicing eu
                                reprehenderit enim.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Is free will real or just an illusion?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                In ad velit in ex nostrud dolore cupidatat consectetur
                                ea in ut nostrud velit in irure cillum tempor laboris
                                sed adipisicing eu esse duis nulla non.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
}


export default BooksSection;