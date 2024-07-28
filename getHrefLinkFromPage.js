// get links and title
const links = document.querySelectorAll("[id='video-title-link']")
const jsData = [];
for(var i = 0; i< links.length; i++){
    jsData.push({link:links[i].href,title:links[i].title});
}
console.log(JSON.stringify(jsData));

// reverse arr
const arr=[];
const reverse=[];
arr.forEach(x=>{
    reverse.unshift(x);
})

console.log(JSON.stringify(reverse));