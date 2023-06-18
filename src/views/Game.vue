<template>
    <div class="game">
      <select v-model="difficulty">
        <option value="bajo">Bajo</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
      </select>
      <button v-if="!showTimer" @click="startGame">Comenzar juego</button>

      
    
        <div v-if="showTimer" class="timer">
        Tiempo restante: {{ timer }}
        </div>
        <div v-if="numberToFind">
            Encuentra el {{ numberToFind }}
        </div>
        <div class="cards-container">
            <div
                v-for="card in cards"
                :key="card.id"
                class="card"
                :style="card.flipped && card.ok && card.ok == 'ok' ? 'background-color: green' : card.flipped && card.ok && card.ok == 'no' ? 'background-color: red' : '' "
                :class="{ flipped: card.flipped }"
                @click="flipCard(card)"
            >
                <div>
                    <div>{{ card.flipped ? card.number : '?' }}</div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Game",
    data() {
      return {
        username: "",
        points: 0,
        difficulty: "bajo",
        cards: [],
        showTimer: false,
        timer: 0,
        difficultyLevels: {
          bajo: { time: 10, points: 10 },
          medio: { time: 5, points: 20 },
          alto: { time: 2, points: 30 },
        },
        numberToFind: null
      };
    },
    methods: {
      startGame() {
        this.points = 0;
        this.showTimer = true;
        this.timer = this.difficultyLevels[this.difficulty].time;
        this.generateCards();
        this.startTimer();
      },
      generateCards() {
        const numbers = this.shuffleNumbers();
        this.cards = numbers.map((number, index) => ({
          id: index,
          number,
          flipped: true
        }));
      },
      shuffleNumbers() {
        const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
        for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        return numbers;
      },
      startTimer() {
        this.numberToFind = null
        const interval = setInterval(() => {
          this.timer--;
          if (this.timer === 0) {
            clearInterval(interval);
            this.showTimer = false;
            this.cards.map(card => card.flipped = false)
            this.numberToFind = this.getRandomNumber()
            // Lógica de ocultar las tarjetas y finalizar el juego
          }
        }, 1000);
      },
      flipCard(card) {
        if (this.showTimer) return 
        if (!this.numberToFind) return
        
        card.flipped = true
        if(card.number == this.numberToFind) {
            card.ok = "ok"
            this.points += this.difficultyLevels[this.difficulty].points
            this.numberToFind = null
            setTimeout(() => {
                this.startGame()
            }, 5000)
        } else {
            card.ok = "no"
            this.numberToFind = null
            setTimeout(() => {
                this.points = 0;
                this.cards = [];
                this.timer = 0;
            }, 5000)
            
        }
      },
      getRandomNumber() {
        return Math.floor(Math.random() * 9) + 1;
      }
    },
  };
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

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100px;
  border: 1px solid #ccc;
  font-size: 24px;
  cursor: pointer;
  perspective: 1000px;
  transition: transform 0.6s;
}

.card-inner {
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card .card-front,
.card .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card .card-front {
  background-color: #fff;
}

.card .card-back {
  background-color: #ccc;
  transform: rotateY(180deg);
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
</style>

  
  