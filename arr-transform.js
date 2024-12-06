const arr = [];

const reverse = [];
arr.forEach(x => {
    reverse.unshift(x);
})

console.log(JSON.stringify(reverse));
