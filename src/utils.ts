export const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const setLocalStorage = (name: string, score: number) => {
    const lsItem = localStorage.getItem('highscores');
    const initialData = lsItem ? JSON.parse(lsItem) : [];
    const updatedItem = initialData.find((i: any) => {
        return i.name === name
    });
    if (updatedItem) {
        updatedItem.score = score
    } else {
        initialData.push({
            name: name,
            score: score
        });
    }
    localStorage.setItem('highscores', JSON.stringify(initialData));
};

export const getLocalStorage = () => {
    const lsItem = localStorage.getItem('highscores');
    if (lsItem) {
        const initialData = JSON.parse(lsItem) || [];
        // return initialData.find((i: any) => i.name === name);
        return initialData;
    }
    return null;
};