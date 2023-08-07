"use client";

import Link from "next/link";
import ReactPlayer from 'react-player';
import {useEffect, useState} from "react";
import {getRandomNumber} from "@/services/utils";
import Button from "@/components/Button";

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
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex row justify-between">
                <div className="mx-4">
                    <Button text="Satsangs" onClick={() => setSetelectedType(VIDEO_TYPE.SATSANG)}></Button>

                </div>
                <div className="mx-4">
                    <Button text="Bhajans" onClick={() => setSetelectedType(VIDEO_TYPE.BHAJAN)}></Button>

                </div>
            </div>
            {selectedType === VIDEO_TYPE.SATSANG && <div>
                <Button text="Play Next Satsang" onClick={() => setVideoUrl(getRandomVideo())}></Button>
                <div className="my-4">
                    <a href={videoUrl}>{videoUrl}</a>
                </div>

                <div>
                    {videoUrl &&
                        <ReactPlayer url={videoUrl} controls={true} loop={true}
                                     onEnded={() => setVideoUrl(getRandomVideo())}/>}
                </div>

            </div>}

            {selectedType === VIDEO_TYPE.BHAJAN && <div>
                <Button text="Play Next Bhajan" onClick={() => setBhajanUrl(getRandomBhajanVideo())}></Button>
                <div className="my-4">
                    <a href={bhajanUrl}>{bhajanUrl}</a>
                </div>

                <div>
                    {bhajanUrl &&
                        <ReactPlayer url={bhajanUrl} controls={true} loop={true}
                                     onEnded={() => setBhajanUrl(getRandomBhajanVideo())}/>}
                </div>

            </div>}
            <div>
                <Link href="/card-app">Checkout card app</Link>
            </div>
        </main>
    );
}

export default Home;