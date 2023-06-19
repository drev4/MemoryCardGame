<template>
    <div class="game">
        <select v-model="difficulty" v-if="showStartBtn" class="game-input">
            <option v-for="level in getDifficultyLevels" :key="level.value" :value="level.value">
                {{ level.data.label }}
            </option>
        </select>
        <button 
            v-if="!showTimer && showStartBtn" 
            @click="handleStartGame" 
            class="main-button"
        >Comenzar juego</button>

        <div v-if="restartingGame">Reiniciando...</div>
        <div v-if="nextLevel">Genial. Cargando siguiente...</div>
        <div v-if="showTimer" class="timer">Tiempo restante: {{ timer }}</div>
        <div v-if="numberToFind.length">Encuentra el número {{ numberToFind.join(", ") }}</div>

        <div class="cards-container" v-if="getCards && getCards.length">
            <NumberCard 
                v-for="card in getCards"
                :key="card.id"
                :card="card"
                @flip-card="onFlipCard"
            />
        </div>
    </div>
</template>
  
<script setup>
import { computed, ref, watch } from 'vue';
import { GameGenerator } from '../helpers/game-helpers';
import { useStore } from '../store/store';

import NumberCard from '../components/NumberCard.vue';

const gameStore = useStore()
const points = ref(0);
const difficulty = ref('low');
const cards = ref([]);
const showTimer = ref(false);
const timer = ref(0);
const numberToFind = ref([]);
const difficultyLevels = GameGenerator.difficultyLevels;
const showStartBtn = ref(true);
const restartingGame = ref(false);
const nextLevel = ref(false);
const countNumberToFind = ref(1);

const getCards = computed(() => cards.value);
const getDifficultyLevels = computed(() => Object.entries(difficultyLevels).map(([key, value]) => ({
        value: key,
        data: value,
    }))
);

const handleStartGame = () => {
    points.value = 0;
    generateNewGameBoard();
};

const generateNewGameBoard = () => {
    showTimer.value = true;
    timer.value = difficultyLevels[difficulty.value].time;
    countNumberToFind.value = difficultyLevels[difficulty.value].numbersToFind
    showStartBtn.value = false;
    cards.value = GameGenerator.generateCards();
    startTimer();
}

const startTimer = () => {
    numberToFind.value = [];
    const interval = setInterval(() => {
        timer.value--;
        if (timer.value === 0) {
            clearInterval(interval);
            showTimer.value = false;
            cards.value.map((card) => (card.flipped = false));
            numberToFind.value = GameGenerator.getNRandomNumbers(difficultyLevels[difficulty.value].numbersToFind);
        }
    }, 1000);
};

const onFlipCard = (card) => {
    if (showTimer.value) return;
    if (!numberToFind.value.length) return;

    card.flipped = true;
    if (numberToFind.value.includes(card.number) && countNumberToFind.value <= 1) {
        card.ok = 'ok';
        points.value += difficultyLevels[difficulty.value].points;
        numberToFind.value = [];
        nextLevel.value = true;
        setTimeout(() => {
            generateNewGameBoard();
            nextLevel.value = false;
        }, 2000);
    }
    else if (numberToFind.value.includes(card.number) && countNumberToFind.value > 1) {
        card.ok = 'ok';
        countNumberToFind.value--;
    }
    else if (!numberToFind.value.includes(card.number)) {
        card.ok = 'no';
        numberToFind.value = [];
        restartingGame.value = true;

        if ('vibrate' in navigator) {
            // Vibra durante 1000 milisegundos (1 segundo) Si el navegador es compatible
            navigator.vibrate(1000);
        }

        setTimeout(() => {
            points.value = 0;
            cards.value = [];
            timer.value = 0;
            showStartBtn.value = true
            restartingGame.value = false;
            countNumberToFind.value = 1;
        }, 2000);
    }
};

watch(points, () => {
  gameStore.updatePoints(points.value);
})

</script>
  

<style>
.cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    grid-auto-rows: 5rem;
    margin-top: 20px;
    width: 100%;
}

.timer {
    margin-top: 20px;
}

.game {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    max-width: 500px;
}
.game-input {
    width: 30vw;
    padding: 12px;
}
</style>

  
  