
export const GameGenerator = {
    /**
     * Niveles de dificultad del juego, con la info de cada uno.
     */
    difficultyLevels: {
        low: { label: "Bajo", time: 10, points: 10, numbersToFind: 1 },
        medium: { label: "Medio", time: 5, points: 20, numbersToFind: 1 },
        high: { label: "Alto", time: 2, points: 30, numbersToFind: 1 },
        extreme: { label: "Extremo", time: 10, points: 50, numbersToFind: 3 }
    },
    /**
     * Genera un array para el tablero del juego.
     * @returns {Array} Array de cards generadas.
     */
    generateCards: () => {
        const numbers = GameGenerator.shuffleNumbers();
        return numbers.map((number, index) => ({
            id: index,
            number,
            flipped: true
        }));
    },
    /**
     * Baraja los números del 1 al 9.
     * @returns {Array} Array de números ordenados aleatoriamente.
     */
    shuffleNumbers: () => {
        const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
        for (let index = numbers.length - 1; index > 0; index--) {
            const rand = Math.floor(Math.random() * (index + 1));
            [numbers[index], numbers[rand]] = [numbers[rand], numbers[index]];
        }
        return numbers;
    },
    /**
     * Genera `n` números aleatorios entre 1 y 9 sin repetición.
     * @param {number} n - Cantidad de números aleatorios a generar.
     * @returns {Array} Array de números aleatorios generados.
     */
    getNRandomNumbers: (n) => {
        if (n > 9) n = 9;
        if (n < 0) n = 1;

        const numbers = [];

        while (numbers.length < n) {
            const random = Math.floor(Math.random() * 9) + 1;
            if (!numbers.includes(random)) {
                numbers.push(random);
            }
        }

        return numbers;
    },
}

export const GameCard = {
    /**
     * Obtiene el estilo CSS para una card determinada.
     * @param {Object} card - La card para la cual se debe obtener el estilo.
     * @returns {string} El estilo CSS correspondiente a la card.
     */
    getCardStyle: (card) => {
        if (card.flipped && card.ok) {
            return card.ok === 'ok' ? 'background-color: green' : 'background-color: red';
        }
        return '';
    }
}