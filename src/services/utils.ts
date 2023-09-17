export const getRandomNumber = (min: number, max: number) => {
    // Generate a random number between 0 and 1
    const random = Math.random();

    // Scale the random number to the range between min and max
    const scaled = random * (max - min);

    // Shift the scaled random number to the appropriate range offset by min
    const shifted = scaled + min;

    // Round the shifted random number down to an integer
    const result = Math.floor(shifted);

    return result;
}

export const getParsedText = (text: string) => {
    var r = /\\u([\d\w]{4})/gi;
    return text.replace(r, function (match, grp) {
        return String.fromCharCode(parseInt(grp, 16));
    });
}

export const download = (content: string, mimeType: string, filename: string) => {
    const a = document.createElement('a') // Create "a" element
    const blob = new Blob([content], {type: mimeType}) // Create a blob (file-like object)
    const url = URL.createObjectURL(blob) // Create an object URL from blob
    a.setAttribute('href', url) // Set "a" element link
    a.setAttribute('download', filename) // Set download filename
    a.click() // Start downloading
}
