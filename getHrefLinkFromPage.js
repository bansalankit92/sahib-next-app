const links = document.querySelectorAll("[id='video-title']")
const jsData = [];
for(var i = 0; i< links.length; i++){
    jsData.push({link:links[i].href,title:links[i].title});
}
console.log(JSON.stringify(jsData));

