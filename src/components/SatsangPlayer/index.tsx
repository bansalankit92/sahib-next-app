"use client";

import React, {useEffect, useState} from "react";
import {getRandomNumber} from "@/services/utils";
import MediaService from "@/services/mediaService";
import {PlayerContent, VIDEO_TYPE} from "@/models/Player";
import MediaPlayer from "@/components/MediaPlayer";

interface PlayerProps {
    type: VIDEO_TYPE,
    defaultContent?: PlayerContent,
    contentList: PlayerContent[],
    onNextClick?: (playerContent: PlayerContent) => void,
}

const SatsangBhajanPlayer: React.FC<PlayerProps> = ({
                                                        type = VIDEO_TYPE.SATSANG,
                                                        defaultContent,
                                                        contentList,
                                                        onNextClick = () => {
                                                        }
                                                    }) => {

    const [mediaList, setMediaList] = useState<PlayerContent[]>([]);
    const [media, setMedia] = useState<PlayerContent>();
    const [currentIndex, setCurrentIndex] = useState<number>();

    async function fetchInitialData() {
        setMediaList(contentList);
        let index = getRandomNumber(0, contentList.length);
        if (defaultContent) {
            index = contentList.findIndex(x => x.url === defaultContent.url)
        }
        setCurrentIndex(index);
        onPlayingNext(contentList[index]);
    }

    useEffect(() => {
        if (defaultContent) {
            onPlayingNext(defaultContent);
        }
    }, [defaultContent]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const onPlayingNext = (playerContent: PlayerContent) => {
        setMedia(playerContent)
        onNextClick(playerContent);
    }

    const selectRandomVideo = () => {
        const index = getRandomNumber(0, mediaList.length);
        setCurrentIndex(index);
        onPlayingNext(mediaList[index]);
    };

    const selectNextVideo = () => {
        if (currentIndex) {
            const index = currentIndex + 1;
            setCurrentIndex(index);
            onPlayingNext(mediaList[index]);
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