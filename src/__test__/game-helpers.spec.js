import { GameGenerator, GameCard } from '../helpers/game-helpers';
import { test, expect } from 'vitest';

test('generateCards should return an array of cards', () => {
  const cards = GameGenerator.generateCards();
  expect(Array.isArray(cards)).toBe(true);
});

test('shuffleNumbers should return an array of shuffled numbers', () => {
  const numbers = GameGenerator.shuffleNumbers();
  expect(Array.isArray(numbers)).toBe(true);
});

test('getNRandomNumbers should return an array of n random numbers', () => {
  const n = 3;
  const numbers = GameGenerator.getNRandomNumbers(n);
  expect(Array.isArray(numbers)).toBe(true);
  expect(numbers.length).toBe(n);
});

test('getCardStyle should return the CSS style for a card', () => {
  const card1 = { flipped: true, ok: 'ok' };
  const card2 = { flipped: true, ok: 'not-ok' };
  const card3 = { flipped: false, ok: 'ok' };
  const card4 = { flipped: false, ok: 'not-ok' };

  expect(GameCard.getCardStyle(card1)).toBe('background-color: green');
  expect(GameCard.getCardStyle(card2)).toBe('background-color: red');
  expect(GameCard.getCardStyle(card3)).toBe('');
  expect(GameCard.getCardStyle(card4)).toBe('');
});
