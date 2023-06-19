<template>
    <div class="toolbar">
      <div class="toolbar-items">
        <div class="toolbar-player" >
          {{ playerName }}
        </div>
        <div class="toolbar-points">
           {{ playerPoints }} Points
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { useStore } from '../store/store';
    import { computed } from 'vue'

    const store = useStore()
    const playerName = computed({
        get(){ return store.getName; }
    })
    const playerPoints = computed({
        get() { return store.getPoints; }
    })
  </script>
  
  <style scoped>
  .toolbar {
    background-color: #f2f2f2;
    padding: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  
  .toolbar-items {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 700px;
  }
  
  .toolbar-player {
    padding: 8px 16px;
    margin: 0 4px;
    border: none;
    background-color: transparent;
    color: #333;
    border-radius: 4px;
    font-weight: bold;
  }
  .toolbar-points {
    padding: 8px 16px;
    margin: 0 4px;
    border: none;
    background-color: transparent;
    color: #333;
    border-radius: 4px;
    font-weight: bold;
  }
  </style>
  