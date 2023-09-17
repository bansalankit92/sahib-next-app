"use client";

import ReactPlayer from 'react-player';
import React, {useEffect, useState} from "react";
import {getRandomNumber} from "@/services/utils";
import Button, {ButtonColors} from "@/components/Button";
import {useLocalStorage} from "react-use";
import SatsangBhajanPlayer from "@/components/SatsangPlayer";
import {PlayerContent, VIDEO_TYPE} from "@/models/Player";



function Home() {
    const [selectedType, setSetelectedType] = useState<VIDEO_TYPE>(VIDEO_TYPE.SATSANG);

    const [storageHistory, setStorageHistory] = useLocalStorage<PlayerContent[]>("history", []);
    const [history, setHistory] = useState<PlayerContent[]>([]);
    const [showHistory, setShowHistory] = useState<boolean>(false);

    // useEffect(() => {
    //     if (url && storageHistory) {
    //         const h = [...(storageHistory || [])];
    //         if (h.find(x => x.url === url)) {
    //             return;
    //         }
    //         h.unshift({url, type: VIDEO_TYPE[type]});
    //         h.length = Math.min(h.length, 30);
    //         setStorageHistory(h);
    //         setHistory(h);
    //     }
    // }, [url]);
    //
    //
    // useEffect(() => {
    //     if (storageHistory && storageHistory.length > 0) {
    //         setSetelectedType(VIDEO_TYPE[storageHistory[0].type as keyof typeof VIDEO_TYPE]);
    //     }
    // }, []);




    // @ts-ignore
    return (
        <main className="flex max-h-screen flex-col items-center justify-between py-8">
            <div className="flex row justify-between">
                <div className="mx-4">
                    <Button type={ButtonColors.DANGER} text="Satsangs"
                            onClick={() => setSetelectedType(VIDEO_TYPE.SATSANG)}></Button>
                </div>
                <div className="mx-4">
                    <Button type={ButtonColors.WARNING} text="Bhajans"
                            onClick={() => setSetelectedType(VIDEO_TYPE.BHAJAN)}></Button>
                </div>
                <div className="mx-4">
                    <Button type={ButtonColors.SUCCESS} text="Sahib Bhajans"
                            onClick={() => setSetelectedType(VIDEO_TYPE.SAHIB_BHAJAN)}></Button>
                </div>
            </div>
            <div className="mt-4"></div>
            {selectedType === VIDEO_TYPE.SATSANG
                && <div>
                    <SatsangBhajanPlayer type={ VIDEO_TYPE.SATSANG}/>
                </div>}

            {selectedType === VIDEO_TYPE.BHAJAN && <div>
                <div>
                    <SatsangBhajanPlayer type={ VIDEO_TYPE.BHAJAN}/>
                </div>

            </div>}
            {selectedType === VIDEO_TYPE.SAHIB_BHAJAN && <div>
                <div>
                    <SatsangBhajanPlayer type={ VIDEO_TYPE.SAHIB_BHAJAN}/>
                </div>

            </div>}

            {/*<div className="mt-20 mx-4 items-center">*/}
            {/*    <div className="cursor-pointer" onClick={() => setShowHistory(!showHistory)}>*/}
            {/*        <h3>History</h3>*/}
            {/*    </div>*/}
            {/*    {showHistory && history?.map((value, index) => <li key={value.url}>*/}
            {/*        <span>*/}
            {/*            <strong>{value.type.toLowerCase().replace('_', " ")}</strong> :*/}
            {/*            <a className="cursor-pointer"*/}
            {/*               onClick={() => onHistoryClick(value.url)}>{value.url}*/}
            {/*            </a>*/}
            {/*        </span>*/}
            {/*    </li>)}*/}

            {/*</div>*/}

            <div className="mt-24 bottom-0"> card-app
                {/*<Link href="/card-app">Checkout card app</Link>*/}
            </div>
        </main>
    );
}
export default Home;