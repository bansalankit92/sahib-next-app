"use client";

import ReactPlayer from 'react-player';
import React, {useEffect, useState} from "react";
import {getRandomNumber} from "@/services/utils";
import Button, {ButtonColors} from "@/components/Button";
import {useLocalStorage} from "react-use";

enum VIDEO_TYPE {
    SATSANG, BHAJAN, SAHIB_BHAJAN
}

interface ViewHistory {
    type: string,
    url: string
}

function Home() {
    const [selectedType, setSetelectedType] = useState<VIDEO_TYPE>(VIDEO_TYPE.SATSANG);

    const [urls, setUrls] = useState<string[]>([]);
    const [bhajanUrls, setBhajanUrls] = useState<string[]>([]);
    const [videoUrl, setVideoUrl] = useState<string>();
    const [bhajanUrl, setBhajanUrl] = useState<string>();
    const [sahibOnlyBhajanUrls, setSahibOnlyBhajanUrls] = useState<string[]>([]);
    const [sahibOnlybhajanUrl, setSahibOnlyBhajanUrl] = useState<string>();
    const [storageHistory] = useLocalStorage<ViewHistory[]>("history", []);

    useEffect(() => {
        fetch('/data/yturl.csv')
            .then(r => r.text())
            .then(text => {
                // console.log('text decoded:', text);
                const urls = text.split('\n');
                setUrls(urls);
                setVideoUrl(urls[getRandomNumber(0, urls.length)]);
            });
        fetch('/data/bhajanurls.csv')
            .then(r => r.text())
            .then(text => {
                // console.log('text decoded:', text);
                const urls = text.split('\n');
                setBhajanUrls(urls);
                setBhajanUrl(urls[getRandomNumber(0, urls.length)]);
            });
        fetch('/data/sahib_bhajans.csv')
            .then(r => r.text())
            .then(text => {
                // console.log('text decoded:', text);
                const urls = text.split('\n');
                setSahibOnlyBhajanUrls(urls);
                setSahibOnlyBhajanUrl(urls[getRandomNumber(0, urls.length)]);
            });
        if (storageHistory && storageHistory.length > 0) {
            setSetelectedType(VIDEO_TYPE[storageHistory[0].type as keyof typeof VIDEO_TYPE]);
        }
    }, []);


    const getRandomVideo = () => urls[getRandomNumber(0, urls.length)];
    const getRandomBhajanVideo = () => bhajanUrls[getRandomNumber(0, bhajanUrls.length)];
    const getRandomSahibOnlyBhajanVideo = () => sahibOnlyBhajanUrls[getRandomNumber(0, sahibOnlyBhajanUrls.length)];


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
                    <Player type={selectedType} url={videoUrl} onEnd={() => setVideoUrl(getRandomVideo())}
                            onHistoryClick={(url) => setVideoUrl(url)}/>
                </div>}

            {selectedType === VIDEO_TYPE.BHAJAN && <div>
                <div>
                    <Player type={selectedType} url={bhajanUrl} onEnd={() => setBhajanUrl(getRandomBhajanVideo())}
                            onHistoryClick={(url) => setBhajanUrl(url)}/>
                </div>

            </div>}
            {selectedType === VIDEO_TYPE.SAHIB_BHAJAN && <div>
                <div>
                    <Player type={selectedType} url={sahibOnlybhajanUrl}
                            onEnd={() => setSahibOnlyBhajanUrl(getRandomSahibOnlyBhajanVideo())}
                            onHistoryClick={(url) => setSahibOnlyBhajanUrl(url)}
                    />
                </div>

            </div>}

            <div className="mt-24 bottom-0"> card-app
                {/*<Link href="/card-app">Checkout card app</Link>*/}
            </div>
        </main>
    );
}

interface Playerprops {
    url: string | undefined;
    onEnd?: () => void;
    onHistoryClick?: (url: string) => void;
    type: VIDEO_TYPE
}

const Player: React.FC<Playerprops> = ({
                                           url,
                                           onEnd = () => {
                                           },
                                           onHistoryClick = () => {
                                           },
                                           type
                                       }) => {

    const [storageHistory, setStorageHistory] = useLocalStorage<ViewHistory[]>("history", []);
    const [history, setHistory] = useState<ViewHistory[]>([]);
    const [showHistory, setShowHistory] = useState<boolean>(false);

    useEffect(() => {
        if (url && storageHistory) {
            const h = [...(storageHistory || [])];
            if (h.find(x => x.url === url)) {
                return;
            }
            h.unshift({url, type: VIDEO_TYPE[type]});
            h.length = Math.min(h.length, 30);
            setStorageHistory(h);
            setHistory(h);
        }
    }, [url]);

    return (
        <div className="m-4">
            <Button text={`Play next ${VIDEO_TYPE[type].toLowerCase().replace('_', " ")}`} onClick={onEnd}></Button>
            <div className="my-4">
                <a href={url} target="_blank">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Click to open in new tab {url}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </a>
            </div>
            <div className="wrapper">
                {url &&
                    <ReactPlayer src={url} controls={true} playing={true}
                                 className="player"
                                 width='100%'
                                 height='100%'
                                 onEnded={onEnd}/>}
            </div>
            <div className="mt-20 mx-4 items-center">
                <div className="cursor-pointer" onClick={() => setShowHistory(!showHistory)}>
                    <h3>History</h3>
                </div>
                {showHistory && history?.map((value, index) => <li key={value.url}>
                    <span>
                        <strong>{value.type.toLowerCase().replace('_', " ")}</strong> :
                        <a className="cursor-pointer"
                           onClick={() => onHistoryClick(value.url)}>{value.url}
                        </a>
                    </span>
                </li>)}

            </div>
        </div>
    )
}
export default Home;
