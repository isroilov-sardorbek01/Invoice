export function generateId() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "12345678910";
    let id = "";

    for (let i = 0; i < 6; i++) {
        if (Math.random() < 0.5) {
            id += letters[Math.floor(Math.random() * letters.length)];
        } else {
            id += numbers[Math.floor(Math.random() * numbers.length)];
        }
    }

    return id;
}
