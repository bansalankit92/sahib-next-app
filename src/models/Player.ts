export interface PlayerContent {
    type: string,
    url: string,
    title: string,
}

export interface PlayerControls {
    isRandom: boolean;
}

export enum VIDEO_TYPE {
    SATSANG = "SATSANG", BHAJAN = "BHAJAN", SAHIB_BHAJAN = "SAHIB_BHAJAN"
}
