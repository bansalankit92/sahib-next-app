import React, {useEffect, useState} from "react";
import {useLocalStorage} from "react-use";
import Button from "@/components/Button";
import ReactPlayer from "react-player";
import {PlayerControls} from "@/models/Player";


interface PlayerProps {
    url: string | undefined;
    onNext?: () => void;
    onRandom?: () => void;
    type?: string
    title?: string;
}

const MediaPlayer: React.FC<PlayerProps> = ({
                                                url,
                                                onNext = () => {
                                                }, onRandom = () => {
    },
                                                type,
                                                title
                                            }) => {
    const [isRandom, setIsRandom] = useState(true)
    const [storageControls, setStorageControls] = useLocalStorage<PlayerControls>("sb-player-controls-ls", {isRandom: true});

    useEffect(() => {
        setStorageControls({
            ...storageControls,
            isRandom
        })
    }, [isRandom]);

    const onNextClick = () => isRandom ? onRandom() : onNext();
    return (
        <div className="">
            <div className="wrapper">
                {url &&
                    (<ReactPlayer url={url} controls={true} playing={true}
                                  className="player"
                                  width='100%'
                                  height='100%'
                                  onEnded={onNextClick}/>)}
            </div>

            <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
                <div>
                    <Button
                        text={`Play ${isRandom ? 'random' : 'next'} ${(type || '').toLowerCase().replace('_', " ")}`}
                        onClick={() => {
                            onNextClick();
                        }}></Button>
                </div>
                <div>
                    <Button text={`${isRandom ? 'Normalize' : 'Randomize'}`} onClick={() => {
                        setIsRandom(!isRandom);
                    }}></Button>
                </div>
            </div>

            <div className="my-8 text-center">
                <a href={url} target="_blank">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Click to open in new tab {title || url}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </a>
            </div>
        </div>
    )
}
export default MediaPlayer;
