<template>
    <div
      class="card"
      :style="GameCard.getCardStyle(card)"
      :class="{ flipped: card.flipped }"
      @click="handleFlipCard"
    >
      <div>
        <div>{{ card.flipped ? card.number : '?' }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import { GameCard } from '../helpers/game-helpers';

  const props = defineProps({
    card: {
        type: Object,
        required: true
    }
  })
  const emit = defineEmits(['flip-card'])

  const handleFlipCard = () => {
    emit('flip-card', props.card);
  }
  </script>

<style>
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
</style>

  