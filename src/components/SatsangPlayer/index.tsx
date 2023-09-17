"use client";

import React, {useEffect, useState} from "react";
import {getRandomNumber} from "@/services/utils";
import MediaService from "@/services/mediaService";
import {PlayerContent, VIDEO_TYPE} from "@/models/Player";
import MediaPlayer from "@/components/MediaPlayer";

interface PlayerProps {
    type: VIDEO_TYPE,
    default?: PlayerContent
}

const SatsangBhajanPlayer: React.FC<PlayerProps> = ({type = VIDEO_TYPE.SATSANG}) => {

    const [mediaList, setMediaList] = useState<PlayerContent[]>([]);
    const [media, setMedia] = useState<PlayerContent>();
    const [currentIndex, setCurrentIndex] = useState<number>();

    async function fetchInitialData() {
        let data = [];
        switch (type) {
            case VIDEO_TYPE.SATSANG:
                data = await MediaService.fetchSatsangs();
                break;
            case VIDEO_TYPE.BHAJAN:
                data = await MediaService.fetchBhajans();
                break;
            case VIDEO_TYPE.SAHIB_BHAJAN:
                data = await MediaService.fetchSahibBhajans();
                break;
        }
        console.log(data,type
        )
        setMediaList(data);
        const index = getRandomNumber(0, data.length);
        setCurrentIndex(index);
        setMedia(data[index]);
    }

    useEffect(() => {
        fetchInitialData();
    }, []);


    const selectRandomVideo = () => {
        const index = getRandomNumber(0, mediaList.length);
        setCurrentIndex(index);
        setMedia(mediaList[index]);
    };

    const selectNextVideo = () => {
        if (currentIndex) {
            const index = currentIndex + 1;
            setCurrentIndex(index);
            setMedia(mediaList[index]);
        } else {
            selectRandomVideo();
        }
    };

    return (
        <section>
            {media && (<MediaPlayer type={media?.type} url={media?.url}
                                    onNext={selectNextVideo}
                                    onRandom={selectRandomVideo}
                                    title={media?.title}
            />)}
        </section>
    );
}

export default SatsangBhajanPlayer;