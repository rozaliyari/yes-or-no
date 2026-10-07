import test from 'node:test';
import assert from 'node:assert/strict';
import { getAnswer, answers } from '../../src/oracle.js';

test('lower half of the random range returns yes', () => {
  for (const value of [0, 0.1, 0.499999]) assert.equal(getAnswer(() => value), 'yes');
});
test('midpoint and upper half return no', () => {
  for (const value of [0.5, 0.75, 0.999999]) assert.equal(getAnswer(() => value), 'no');
});
test('invalid random values are rejected', () => {
  for (const value of [-1, 1, NaN, Infinity, '0.2']) assert.throws(() => getAnswer(() => value), RangeError);
});
test('every outcome has a Persian title and message', () => {
  for (const key of ['yes', 'no']) {
    assert.ok(answers[key].title);
    assert.ok(answers[key].message);
  }
});
