function generateUniqueRandomNumbers(min, max, count) {
    // Validate input
    if (count > (max - min + 1)) {
        throw new Error("Count exceeds the number of unique values in the range.");
    }

    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < count) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        uniqueNumbers.add(randomNum);
    }

    return Array.from(uniqueNumbers);
}