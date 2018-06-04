
export const cloneObject = obj => {
    return JSON.parse(JSON.stringify(obj));
}

export const uuid = () => {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += "-"
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & (3 | 8)) : random)).toString(16);
    }
    return uuid;
}

console.log(uuid())


