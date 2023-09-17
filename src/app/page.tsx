"use client";

import React, {useEffect, useState} from "react";
import Button, {ButtonColors} from "@/components/Button";
import {useLocalStorage} from "react-use";
import SatsangBhajanPlayer from "@/components/SatsangPlayer";
import {PlayerContent, VIDEO_TYPE} from "@/models/Player";
import MediaService from "@/services/mediaService";
import Select, {SingleValue, components, createFilter} from "react-select";

interface LastMediaContent {
    [VIDEO_TYPE.SATSANG]?: PlayerContent;
    [VIDEO_TYPE.BHAJAN]?: PlayerContent;
    [VIDEO_TYPE.SAHIB_BHAJAN]?: PlayerContent;
}

function Home() {
    const [selectedType, setSetelectedType] = useState<VIDEO_TYPE>(VIDEO_TYPE.SATSANG);

    const [satsangList, setSatsangList] = useState<PlayerContent[]>([]);
    const [bhajanList, setBhajanList] = useState<PlayerContent[]>([]);
    const [sahibBhajanList, setSahibBhajanList] = useState<PlayerContent[]>([]);
    const [allContentList, setAllContentList] = useState<PlayerContent[]>([]);

    const [storageHistory, setStorageHistory] = useLocalStorage<PlayerContent[]>("plhistory", []);
    const [history, setHistory] = useState<PlayerContent[]>([]);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [lastMediaContent, setLastMediaContent] = useState<LastMediaContent>({});


    useEffect(() => {
        if (storageHistory && storageHistory.length > 0) {
            setSetelectedType(VIDEO_TYPE[storageHistory[0].type as keyof typeof VIDEO_TYPE]);

            updateLastMediaContent(storageHistory.find(x => x.type === VIDEO_TYPE.SATSANG));
            updateLastMediaContent(storageHistory.find(x => x.type === VIDEO_TYPE.BHAJAN));
            updateLastMediaContent(storageHistory.find(x => x.type === VIDEO_TYPE.SAHIB_BHAJAN));
        }
    }, []);


    useEffect(() => {
        MediaService.fetchSatsangs().then((data) => {
            setSatsangList(data);
            setAllContentList(prevState => [...prevState, ...data]);
        });
        MediaService.fetchBhajans().then((data) => {
            setBhajanList(data);
            setAllContentList(prevState => [...prevState, ...data]);
        });

        MediaService.fetchSahibBhajans().then((data) => {
            setSahibBhajanList(data);
            setAllContentList(prevState => [...prevState, ...data]);
        });

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

    // @ts-ignore
    return (
        <main className="flex max-h-screen flex-col items-center justify-between py-8">
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="text-3xl sm:text-2xl font-bold">
                    Welcome to the (Un-Official) Sahibji Satsang Bhajan playlist
                </h1>
                <p className="text-lg font-medium">
                    This is a simple player to play the Sahibji satsang and bhajans.
                </p>
            </div>
            <div className="w-full  p-4 ">
                <Select
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
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
            <div className="grid grid-flow-col justify-stretch w-full">
                <div className="mx-4">
                    {satsangList.length > 0 && <Button type={ButtonColors.DANGER} text="Satsangs"
                                                       selected={selectedType === VIDEO_TYPE.SATSANG}
                                                       onClick={() => setSetelectedType(VIDEO_TYPE.SATSANG)}></Button>}
                </div>
                <div className="mx-4">
                    {bhajanList.length > 0 && <Button type={ButtonColors.WARNING} text="Bhajans"
                                                      selected={selectedType === VIDEO_TYPE.BHAJAN}
                                                      onClick={() => setSetelectedType(VIDEO_TYPE.BHAJAN)}></Button>}
                </div>
                <div className="mx-4">
                    {sahibBhajanList.length > 0 && <Button type={ButtonColors.SUCCESS} text="Sahib Bhajans"
                                                           selected={selectedType === VIDEO_TYPE.SAHIB_BHAJAN}
                                                           onClick={() => setSetelectedType(VIDEO_TYPE.SAHIB_BHAJAN)}></Button>}
                </div>
            </div>
            <hr className="my-4"/>
            <div className="mt-4">


            {selectedType === VIDEO_TYPE.SATSANG
                && satsangList.length && <div>
                    <SatsangBhajanPlayer type={VIDEO_TYPE.SATSANG} contentList={satsangList}
                                         defaultContent={lastMediaContent[VIDEO_TYPE.SATSANG]}
                                         onNextClick={handleNextClick}/>
                </div>}

            {selectedType === VIDEO_TYPE.BHAJAN && bhajanList.length && <div>
                <div>
                    <SatsangBhajanPlayer type={VIDEO_TYPE.BHAJAN} contentList={bhajanList}
                                         defaultContent={lastMediaContent[VIDEO_TYPE.BHAJAN]}
                                         onNextClick={handleNextClick}/>
                </div>

            </div>}
            {selectedType === VIDEO_TYPE.SAHIB_BHAJAN && sahibBhajanList.length && <div>
                <div>
                    <SatsangBhajanPlayer type={VIDEO_TYPE.SAHIB_BHAJAN} contentList={sahibBhajanList}
                                         defaultContent={lastMediaContent[VIDEO_TYPE.SAHIB_BHAJAN]}
                                         onNextClick={handleNextClick}/>
                </div>

            </div>}
            </div>
            <div className="mt-20 mx-4">
                <div className="cursor-pointer" onClick={() => setShowHistory(!showHistory)}>
                    <h3 className="my-4">History</h3>
                </div>
                {showHistory && history?.map((value, index) => <li key={value.url}>
                    <span>
                        <strong>{value.type.toLowerCase().replace('_', " ")}</strong>: &nbsp;
                        <a className="cursor-pointer"
                           onClick={() => onHistoryClick(value)}>{value.title}
                        </a>
                    </span>
                </li>)}

            </div>

            <div className="mt-24 bottom-0"> card-app
                {/*<Link href="/card-app">Checkout card app</Link>*/}
            </div>
        </main>
    );
}

export default Home;