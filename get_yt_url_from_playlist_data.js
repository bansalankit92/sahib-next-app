
const fs = require('fs');
const  playlist = require('./playlist1000_1100.json');


const contents = 
(playlist.contents.twoColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content) ? playlist.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents
: playlist.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems
console.log(contents[0], contents[0].playlistVideoRenderer.videoId);

const urls = contents.map((c)=> c.playlistVideoRenderer?.videoId || '')
.filter(x=>x)
.map(c=> 'https://www.youtube.com/watch?v='+c)
.join('\n') + '\n';

console.log(urls);

fs.appendFileSync('yturl.csv', urls);
