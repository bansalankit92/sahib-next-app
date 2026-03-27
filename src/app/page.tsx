"use client";

import React, {Suspense, useEffect, useState} from "react";
import Head from "next/head";
import Button, {ButtonColors} from "@/components/Button";
import {useLocalStorage} from "react-use";
import SatsangBhajanPlayer from "@/components/SatsangPlayer";
import {PlayerContent, VIDEO_TYPE} from "@/models/Player";
import Select, {components, createFilter, SingleValue} from "react-select";
import {SATSANG_URL} from "@/data/satsangUrlTitle";
import {BHAJANS_URL, SAHIB_BHAJANS_URL} from "@/data/bhajansUrlTitle";
import ReactPlayer from "react-player";
import {useSearchParams} from "next/navigation";

interface LastMediaContent {
    [VIDEO_TYPE.SATSANG]?: PlayerContent;
    [VIDEO_TYPE.BHAJAN]?: PlayerContent;
    [VIDEO_TYPE.SAHIB_BHAJAN]?: PlayerContent;
}

function HomeContent() {
    const [selectedType, setSetelectedType] = useState<VIDEO_TYPE>(VIDEO_TYPE.SATSANG);

    const [satsangList, setSatsangList] = useState<PlayerContent[]>([]);
    const [bhajanList, setBhajanList] = useState<PlayerContent[]>([]);
    const [sahibBhajanList, setSahibBhajanList] = useState<PlayerContent[]>([]);
    const [allContentList, setAllContentList] = useState<PlayerContent[]>([]);

    const [storageHistory, setStorageHistory] = useLocalStorage<PlayerContent[]>("plhistory", []);
    const [history, setHistory] = useState<PlayerContent[]>([]);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [lastMediaContent, setLastMediaContent] = useState<LastMediaContent>({});

    const searchParams = useSearchParams();

    const setSearchParamsContentType = (params: URLSearchParams | null) => {
        const type = params?.get('type') || params?.get('tab');
        if (type && type.toUpperCase() in VIDEO_TYPE) {
            setSetelectedType(VIDEO_TYPE[type.toUpperCase() as keyof typeof VIDEO_TYPE]);
        }
    }

    useEffect(() => {
        setSearchParamsContentType(searchParams);
    }, [searchParams]);

    useEffect(() => {
        if (storageHistory && storageHistory.length > 0) {
            setSetelectedType(VIDEO_TYPE[storageHistory[0].type as keyof typeof VIDEO_TYPE]);
            setHistory(storageHistory);
            setSearchParamsContentType(searchParams);
            updateLastMediaContent(storageHistory.find(x => x.type === VIDEO_TYPE.SATSANG));
            updateLastMediaContent(storageHistory.find(x => x.type === VIDEO_TYPE.BHAJAN));
            updateLastMediaContent(storageHistory.find(x => x.type === VIDEO_TYPE.SAHIB_BHAJAN));
        }
    }, []);


    useEffect(() => {
        const satsangURLS = SATSANG_URL.filter((x: any) => x.title !== ' - YouTube').map((r: any) => ({
            ...r,
            type: VIDEO_TYPE.SATSANG
        }))
        setSatsangList(satsangURLS);
        setAllContentList(prevState => [...prevState, ...satsangURLS]);


        const sahibBhajanURLS = SAHIB_BHAJANS_URL.filter((x: any) => x.title !== ' - YouTube').map((r: any) => ({
            ...r,
            type: VIDEO_TYPE.SAHIB_BHAJAN
        }))
        setSahibBhajanList(sahibBhajanURLS);
        setAllContentList(prevState => [...prevState, ...sahibBhajanURLS]);

        const allBhajanURLS = BHAJANS_URL.filter((x: any) => x.title !== ' - YouTube').map((r: any) => ({
            ...r,
            type: VIDEO_TYPE.BHAJAN
        }))
        setBhajanList(allBhajanURLS);
        setAllContentList(prevState => [...prevState, ...allBhajanURLS]);


    }, []);

    const handleNextClick = (playerContent: PlayerContent) => {
        if (playerContent && storageHistory) {
            const h = [...(storageHistory || [])];
            if (h.find(x => x.url === playerContent.url)) {
                return;
            }
            h.unshift(playerContent);
            h.length = Math.min(h.length, 30);
            setStorageHistory(h);
            setHistory(h);
            updateLastMediaContent(playerContent)
        }
    };

    function updateLastMediaContent(playerContent?: PlayerContent): void {
        if (playerContent && lastMediaContent) {
            const h = {...lastMediaContent};
            h[VIDEO_TYPE[playerContent.type as keyof typeof VIDEO_TYPE]] = playerContent;
            setLastMediaContent(h);
        }
    }

    function onHistoryClick(value: PlayerContent): void {
        setSetelectedType(VIDEO_TYPE[value.type as keyof typeof VIDEO_TYPE]);
        updateLastMediaContent(value);
    }

    function handleChange(value: SingleValue<PlayerContent>) {
        if (value) {
            setSetelectedType(VIDEO_TYPE[value.type as keyof typeof VIDEO_TYPE]);
            updateLastMediaContent(value);
        }
    }

    // @ts-ignore
    const MenuList = ({children, ...props}) => {
        // @ts-ignore
        return (
            // @ts-ignore
            <components.MenuList {...props}>
                {Array.isArray(children)
                    ? children.slice(0, 50) /* Options */
                    : children /* NoOptionsLabel */
                }
            </components.MenuList>
        );
    };

    const customStyles = {
        option: (provided: any, state: { isSelected: any; }) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
        })
    }

    const onTypeChange = (type: VIDEO_TYPE) => {
        setSetelectedType(type)
        if (window?.history?.pushState) {
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?type=${type}`;
            window.history.pushState({path: newurl}, '', newurl);
        }
    }

    // @ts-ignore
    return (
        <>
            <Head>
                <title>Sahibji Satsang and Bhajans - Home</title>
                <meta name="description" content="Listen to Sahibji Satsang, Bhajans and spiritual content" />
            </Head>
            <main className="flex flex-col items-center justify-between py-8 mb-20">
            <div className="w-full flex flex-col items-center justify-center">
                {/*<h1 className="text-3xl sm:text-2xl font-bold">*/}
                {/*    Welcome to the (Un-Official) Sahibji Satsang Bhajan playlist*/}
                {/*</h1>*/}
                {/*<p className="text-lg font-medium">*/}
                {/*    This is a simple player to play the Sahibji satsang and bhajans.*/}
                {/*</p>*/}
            </div>
            <div className="w-full  p-4 ">
                <Select
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    instanceId="home-content-select"
                    inputId="home-content-select-input"
                    getOptionLabel={option => option.title}
                    getOptionValue={option => option.url}
                    onChange={handleChange}
                    styles={customStyles}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            text: '#3599B8',
                            font: '#3599B8',
                            primary25: '#3599B8',
                            primary: '#3599B8',
                            neutral80: 'black',
                            color: 'black',
                        },
                    })}
                    options={allContentList}
                    components={{MenuList}}
                    filterOption={createFilter({ignoreAccents: false})}
                />
            </div>
            {/* <div className="grid  justify-stretch w-full gap-1 grid-cols-3 ">
                <div className="">
                    {satsangList.length > 0 && (<Button type={ButtonColors.DANGER} text="Satsangs"
                                                        selected={selectedType === VIDEO_TYPE.SATSANG}
                                                        onClick={() => onTypeChange(VIDEO_TYPE.SATSANG)}></Button>)}
                </div>
                <div className="">
                    {bhajanList.length > 0 && (<Button type={ButtonColors.WARNING} text="Bhajans"
                                                       selected={selectedType === VIDEO_TYPE.BHAJAN}
                                                       onClick={() => onTypeChange(VIDEO_TYPE.BHAJAN)}></Button>)}
                </div>
                <div className="">
                    {sahibBhajanList.length > 0 && (<Button type={ButtonColors.SUCCESS} text="Sahib Bhajans"
                                                            selected={selectedType === VIDEO_TYPE.SAHIB_BHAJAN}
                                                            onClick={() => onTypeChange(VIDEO_TYPE.SAHIB_BHAJAN)}></Button>)}
                </div>
            </div> */}
            <hr className="my-4"/>
            <div className="mt-4">


                {selectedType === VIDEO_TYPE.SATSANG
                    && satsangList.length && (<div>
                        <SatsangBhajanPlayer type={VIDEO_TYPE.SATSANG} contentList={satsangList}
                                             defaultContent={lastMediaContent[VIDEO_TYPE.SATSANG]}
                                             onNextClick={handleNextClick}/>
                    </div>)}

                {selectedType === VIDEO_TYPE.BHAJAN && bhajanList.length && (<div>
                    <div>
                        <SatsangBhajanPlayer type={VIDEO_TYPE.BHAJAN} contentList={bhajanList}
                                             defaultContent={lastMediaContent[VIDEO_TYPE.BHAJAN]}
                                             onNextClick={handleNextClick}/>
                    </div>

                </div>)}
                {selectedType === VIDEO_TYPE.SAHIB_BHAJAN && sahibBhajanList.length && (<div>
                    <div>
                        <SatsangBhajanPlayer type={VIDEO_TYPE.SAHIB_BHAJAN} contentList={sahibBhajanList}
                                             defaultContent={lastMediaContent[VIDEO_TYPE.SAHIB_BHAJAN]}
                                             onNextClick={handleNextClick}/>
                    </div>

                </div>)}
            </div>
            <div>
            {/* <ReactPlayer url="https://www.youtube.com/embed/jfKfPfyJRdk" controls={true} playing={true}
                                  className="player"
                                  width='300px'
                                  height='400px'
                                  /> */}
                                  </div>
            <div className="mt-20 mx-4">
                <button onClick={() => setShowHistory(!showHistory)}>
                    <h3 className="my-4">History</h3>
                </button>
                {showHistory && history?.map((value, index) => <li key={value.url}>
                    <span>
                        <strong>{value.type.toLowerCase().replace('_', " ")}</strong>: &nbsp;
                        <a className="cursor-pointer"
                           onClick={() => onHistoryClick(value)}>{value.title}
                        </a>
                    </span>
                </li>)}

            </div>

            {/*<div className="mt-24 bottom-0"> card-app*/}
            {/*    <Link href="/card-app">Checkout card app</Link>*/}
            {/*</div>*/}
        </main>
        </>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<main className="flex flex-col items-center justify-between py-8 mb-20">Loading...</main>}>
            <HomeContent />
        </Suspense>
    );
}
