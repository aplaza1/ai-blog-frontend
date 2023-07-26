export const toTitleCase = (text: string) => {
    const exceptions = ["the", "a", "an", "in", "on", "at", "and", "but", "or", "for", "nor", "to", "so", "yet"];
    let words = text.split('-');
    for (let i = 0; i < words.length; i++) {
        if (i === 0 || !exceptions.includes(words[i])) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
    }
    return words.join(' ');
};
