import {PlayerContent, VIDEO_TYPE} from "@/models/Player";
import {MEDIA_PATH_JSON} from "@/services/AppConstants";


const MediaService = {
    fetchSatsangs: async (): Promise<PlayerContent[]> => {
        const res = await fetch(MEDIA_PATH_JSON.SATSANG_PATH)
        const result = await res.json();
        return result.map((r: any) => ({...r, type: VIDEO_TYPE.SATSANG}))
    },
    fetchBhajans: async (): Promise<PlayerContent[]> => {
        const res = await fetch(MEDIA_PATH_JSON.BHAJAN_PATH)
        const result = await res.json()
        return result.map((r: any) => ({...r, type: VIDEO_TYPE.BHAJAN}))
    },
    fetchSahibBhajans: async (): Promise<PlayerContent[]> => {
        const res = await fetch(MEDIA_PATH_JSON.SAHIB_BHAJAN_PATH)
        const result = await res.json()
        return result.map((r: any) => ({...r, type: VIDEO_TYPE.SAHIB_BHAJAN}))
    }

}

export default MediaService;