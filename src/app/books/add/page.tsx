"use client";

import React, {useEffect, useState} from "react";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import BooksAPIService from "@/services/BooksAPIService";
import {toast} from "react-toastify";


interface PlayerProps {

}

const AddBooks: React.FC<PlayerProps> = ({}) => {

    const [bookData, setBookData] = useState<any>();

    const updateFields = (key = '', value = '') => {
        setBookData({
            ...bookData || {},
            [key]: value
        })
    }
    useEffect(() => {
        toast("Page to add books");
    }, []);

    const onSubmit = async () => {
        try {
            console.log(bookData);
            const res = await BooksAPIService.add(bookData);
            toast("Book added successfully")
        } catch (e) {
            toast("Failed to add books")
        }
    }

    return (
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
                <Input name={"name"} label={"Book Name"} onChange={(e) => updateFields('name', e.target.value)}/>
                <Input name={"authorName"} label={"Author Name"}
                       onChange={(e) => updateFields('authorName', e.target.value)}/>
                <TextArea name={"content"} label={"Content"} onChange={(e) => updateFields('content', e.target.value)}/>
                <Button text={"Submit"} onClick={() => onSubmit()}/>
            </div>
        </section>
    );
}

export default AddBooks;