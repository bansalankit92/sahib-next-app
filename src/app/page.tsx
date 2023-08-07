"use client";

import ReactPlayer from 'react-player';
import React, {useEffect, useState} from "react";
import {getRandomNumber} from "@/services/utils";
import Button, {ButtonColors} from "@/components/Button";

enum VIDEO_TYPE {
    SATSANG, BHAJAN
}

function Home() {
    const [selectedType, setSetelectedType] = useState<VIDEO_TYPE>(VIDEO_TYPE.SATSANG);

    const [urls, setUrls] = useState<string[]>([]);
    const [bhajanUrls, setBhajanUrls] = useState<string[]>([]);
    const [videoUrl, setVideoUrl] = useState<string>();
    const [bhajanUrl, setBhajanUrl] = useState<string>();

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
    }, []);

    const getRandomVideo = () => urls[getRandomNumber(0, urls.length)];
    const getRandomBhajanVideo = () => bhajanUrls[getRandomNumber(0, bhajanUrls.length)];


    return (
        <main className="flex max-h-screen flex-col items-center justify-between py-8">
            <div className="flex row justify-between">
                <div className="mx-4">
                    <Button type={ButtonColors.DANGER} text="Satsangs" onClick={() => setSetelectedType(VIDEO_TYPE.SATSANG)}></Button>
                </div>
                <div className="mx-4">
                    <Button type={ButtonColors.WARNING} text="Bhajans" onClick={() => setSetelectedType(VIDEO_TYPE.BHAJAN)}></Button>
                </div>
            </div>
            <div className="mt-4"></div>
            {selectedType === VIDEO_TYPE.SATSANG
                && <div>
                    <Player type={selectedType} url={videoUrl} onEnd={() => setVideoUrl(getRandomVideo())}/>
                </div>}

            {selectedType === VIDEO_TYPE.BHAJAN && <div>
                <div>
                    <Player type={selectedType} url={bhajanUrl} onEnd={() => setBhajanUrl(getRandomBhajanVideo())}/>
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
    type: VIDEO_TYPE
}

const Player: React.FC<Playerprops> = ({
                                           url, onEnd = () => {
    }, type
                                       }) => {
    console.log(url)

    return (
        <div>
            <Button text={`Play Next ${VIDEO_TYPE[type].toLowerCase()}`} onClick={onEnd}></Button>
            <div className="my-4">
                <a href={url}>
                    {url}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </a>
            </div>
            <div className="wrapper">
                {url &&
                    <ReactPlayer url={url} controls={true} loop={true}
                                 className="player"

                                 width='100%'
                                 height='100%'
                                 onEnded={onEnd}/>}
            </div>
        </div>
    )
}
export default Home;