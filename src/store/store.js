import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    name: '',
    points: 0,
  }),
  getters: {
    getName: (state) => state.name,
    getPoints: (state) => state.points,
  },
  actions: {
    updateName(newName) {
      this.name = newName;
    },
    updatePoints(newPoints) {
      this.points = newPoints;
    },
  },
});