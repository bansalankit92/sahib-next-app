"use client";

import React, {useEffect, useState} from "react";
import Head from "next/head";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import BooksAPIService from "@/services/BooksAPIService";
import {toast} from "react-toastify";
import hi2en from "@/lib/hi2en";
import ashramLocationsAll from "@/data/asharamLocations.json";


interface PlayerProps {

}

const AddBooks: React.FC<PlayerProps> = ({}) => {

    const [bookData, setBookData] = useState<any>();
    const [transliterationCheck, setTransliterationCheck] = React.useState(false);
    const [transliterationContent, setTransliterationContent] = useState('')
    const [loading, setLoading] = useState(false)

    function handleChange(e: any) {
        setTransliterationCheck(e.target.checked);
        setTransliterationContent(hi2en(bookData?.content || ''))
    }

    const updateFields = (key = '', value = '') => {
        setBookData(JSON.parse(JSON.stringify({
            ...bookData || {},
            [key]: value
        })))
    }
    useEffect(() => {
        toast("Page to add books");
    }, []);

    const onSubmit = async () => {
        try {
            console.log(bookData);
            setLoading(true);
            if (!bookData.name && !bookData.content) {
                toast("Please add book name and content");
            }

            const res = await BooksAPIService.add(bookData);
            toast("Book added successfully")
            if (transliterationCheck) {
                await BooksAPIService.add({
                    ...bookData,
                    content: transliterationContent || hi2en(bookData.content),
                    isTransliteration: true,
                    lang: "en",
                    name: bookData.name + ' en'
                });
                toast("Transliterated Content added successfully")
                setTransliterationCheck(false);
                setTransliterationContent('');
            }
            updateFields('content', '')
            updateFields('name', '')
        } catch (e) {
            toast("Failed to add books")
        } finally {
            setLoading(false);
        }
    }

    // @ts-ignore
    return (
        <>
            <Head>
                <title>Add Books - Sahibji Satsang and Bhajans</title>
                <meta name="description" content="Add new books and spiritual content to the collection" />
            </Head>
            <section
                className="container mx-auto px-4 py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white dark:bg-gray-900"
                id="books-section">
            <div
                className="flex flex-col items-center justify-center w-full mb-8 md:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 3xl:mb-28">
                <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl dark:text-white">
                    Add Books
                </h2>
                <p className="text-center text-gray-600 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <Input name={"name"} value={bookData?.name||''} label={"Book Name"} onChange={(e) => updateFields('name', e.target.value)}/>
                <Input name={"authorName"} label={"Author Name"}
                       onChange={(e) => updateFields('authorName', e.target.value)}/>

                <TextArea row={6} value={bookData?.content||''} name={"content"} label={"Content"}
                          onChange={(e) => updateFields('content', e.target.value)}/>


                <div className="flex gap-8 items-center">
                    <Input name={"Transliteration"} label={"Transliteration"} inputType={"CHECKBOX"}
                           checked={transliterationCheck} type="checkbox" onChange={handleChange}/>
                    <Input
                        inputType="DROPDOWN"
                        label="Lang"
                        name="lang"
                        id="lang"
                        placeholder="hi"
                        value={bookData?.lang}
                        dropdownValues={([
                            {
                                "name": "hi",
                                "key": "hi",
                                "label": "hi"
                            }, {
                                "name": "en",
                                "key": "en",
                                "label": "en"
                            }
                        ])}
                        onClickClear={() =>
                            updateFields('lang', '')
                        }
                        onDropdownSelect={(d) => {
                            updateFields('lang', d?.name)
                        }}
                    />
                </div>
                {transliterationCheck ?
                    <TextArea row={6} name={"English Transliterated content"} label={"English Transliterated content"}
                              value={transliterationContent}
                              onChange={(e) => setTransliterationContent(e.target.value)}/>
                    : null}
                <Button text={"Submit"} onClick={() => onSubmit()} loading={loading}/>
            </div>
        </section>
        </>
    );
}

export default AddBooks;