function capitalText(str: string) {
    let words = str.split(" ");
    let capitalizedWords = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(" ");
}


export default capitalText