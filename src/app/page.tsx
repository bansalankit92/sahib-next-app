"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import ReactPlayer from 'react-player';
import { useEffect, useState } from "react";
import { getRandomNumber } from "@/services/utils";
import Button from "@/components/Button";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [urls, setUrls] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>();

useEffect(() => {
  fetch('/data/yturl.csv')
 .then(r => r.text())
 .then(text => {
  console.log('text decoded:', text);
  setUrls(text.split('\n'));
  setVideoUrl(getRandomVideo());
});
}, []);

  const getRandomVideo = () => urls[getRandomNumber(0, urls.length)];


  return (
    <main className="flex min-h-screen flex-col items-left justify-between p-24">
      <div>
        <Button text="Play Next" onClick={() =>setVideoUrl(getRandomVideo())}></Button>
        <a href={videoUrl}>{videoUrl}</a>
      {videoUrl && <ReactPlayer url={videoUrl} />}
      </div>
      <div>
      <Link href="/card-app">Checkout card app</Link>
      </div>
    </main>
  );
}
