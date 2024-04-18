const Utils = {
    breakIntoTokensWithSize: ({content = '', size = 10000, separator = '\n'}) => {
        const arr = content.split(separator);
        const batch = [];
        let batchContent = '';
        for (const line of arr) {
            if (batchContent.length + line.length > 10000) {
                batch.push(batchContent + line + separator)
                batchContent = '';
            } else {
                batchContent = batchContent + line + separator;
            }
        }
        return batch;
    },
    getSlugRemovingSpace: (title = '', replaceValue = '-') => title.replace(/\s+/g, replaceValue).toLowerCase(),
    uniqueId: (prefix = '') => prefix + Math.random().toString(16).slice(2),
}

export default Utils;