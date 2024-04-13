const convert = function (input) {
    /**
     * Checks if a key is available in an object
     * Checks if a value is in an array
     * @param object|array list
     * @return bool
     */
    function isInIt(list, val) {
        if (!Array.isArray(list)) {
            list = Object.keys(list);
        }

        return list.indexOf(val) !== -1;
    }

    /* eslint-disable object-property-newline */
    const dictionary = {
        अ: "a",
        आ: "aa",
        इ: "i",
        ई: "e",
        उ: "u",
        ऊ: "u",
        ऋ: "rri",
        ए: "e",
        ऐ: "ai",
        ओ: "o",
        औ: "au",
        "ं": "n",
        "ಃ": "h",
        क: "k",
        ख: "kh",
        ग: "g",
        घ: "gh",
        ङ: "ng",
        च: "ch",
        छ: "chh",
        ज: "j",
        झ: "jhh",
        ञ: "nj",
        ट: "T",
        ठ: "th",
        ड: "d",
        ढ: "dh",
        ण: "N",
        त: "t",
        थ: "Th",
        द: "D",
        ध: "Dh",
        न: "n",
        प: "p",
        फ: "ph",
        ब: "b",
        भ: "bh",
        म: "m",
        य: "y",
        र: "r",
        ल: "l",
        व: "v",
        ष: "sh",
        श: "sh",
        स: "s",
        ह: "h",
        ಳ: "L",
        "ृ": "rri",
        "ा": "aa",
        "ि": "i",
        "ी": "i",
        "ु": "u",
        "ू": "oo",
        "े": "e",
        "ॆ": "e",
        "ै": "ai",
        "ो": "o",
        "ॊ": "o",
        "ौ": "au",
        "क्ष": "ksh",
        "त्र": "tr",
        "ज्ञ": "jn",
        "ऑ": "O",
        "ॉ": "O",
        "।": ".",
        "़": "",
        "ँ": "n",
        "ः": "",
        "ड़": 'd',
        "ढ़": 'dh',
    };

    const numerals = {
        "१": "1",
        "२": "2",
        "३": "3",
        "೪": "4",
        "५": "5",
        "६": "6",
        "७": "7",
        "८": "8",
        "९": "9",
        "०": "0",
    };

    const vowels = ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ"];

    const vowelSigns = [
        "ा",
        "ि",
        "ी",
        "ु",
        "ू",
        "ृ",
        "े",
        "ॆ",
        "ै",
        "ो",
        "ॊ",
        "ौ",
        "ं",
        "ಃ",
    ];

    var virama = "्";
    var anuswara = "ं";

    const inputLength = input.length;
    let index = 0;
    let output = "";

    while (index < inputLength) {
        const currentCharacter = input[index];
        const nextCharacter = input[index + 1];

        /**
         * If current charachter is a punctuation symbol skip it.
         * Added to avoid getting extra 'a' to the begining
         * of word next to punctuation symbol
         */
        if (currentCharacter.match(/^[.,:!?]/)) {
            output += currentCharacter;
            index++;
            continue;
        }

        if (currentCharacter === virama) {
            index++;
            continue;
        }

        // Get english equivalaent of the charachter.
        if (isInIt(dictionary, currentCharacter)) {
            output += dictionary[currentCharacter];
        } else if (isInIt(numerals, currentCharacter)) {
            // Transliterate numerals
            output += numerals[currentCharacter];
        } else {
            output += currentCharacter;
        }

        if (
            index + 1 < inputLength &&
            !isInIt(vowelSigns, nextCharacter) &&
            isInIt(dictionary, currentCharacter) &&
            isInIt(dictionary, nextCharacter) &&
            !isInIt(vowels, currentCharacter) &&
            !isInIt(vowelSigns, currentCharacter)
        ) {
            output += "a";
        }

        /**
         * Add 'a' at end of characters that are alone
         * क => ka
         * क्रि क में => kri ka mem
         * क्रि का में => kri ka mem
         */
        if (
            isInIt(dictionary, currentCharacter) &&
            (index + 1 === inputLength || nextCharacter === " ") &&
            (index - 1 < 0 || input[index - 1] === " ") &&
            currentCharacter !== "अ" &&
            currentCharacter !== "आ"
        ) {
            output += "a";
        }

        // Handle am sign
        if (
            index + 1 < inputLength &&
            nextCharacter === anuswara &&
            !isInIt(vowelSigns, currentCharacter)
        ) {
            output += "a";
        }

        index++;
    }

    return output;
};

const hi2en =(txt)=>{
return convert(txt).replaceAll("th", "t")
    .replaceAll("aa", "a")
        .replaceAll(" .a ", " ")
        .toLowerCase()
}
export default hi2en;