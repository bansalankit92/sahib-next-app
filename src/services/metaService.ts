import {parser} from "html-metadata-parser";


const MetaService = {
    getMetadata: async (url: string) => await parser(url),
}

export default MetaService;