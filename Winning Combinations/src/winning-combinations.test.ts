import { WinningCombinations } from './winning-combinations';
import { describe, test, expect } from '@jest/globals';

interface TestCase {
  line: number[];
  expected: [number, number[]][];
}

const testCases: TestCase[] = [
  { line: [1, 6, 6, 7, 2, 3], expected: [] },
  { line: [1, 6, 6, 7, 2, 2], expected: [] },
  { line: [1, 2, 6, 6, 6], expected: [[6, [2, 3, 4]]] },
  { line: [3, 3, 3, 8, 6, 3], expected: [[3, [0, 1, 2]]] },
  { line: [3, 3, 3, 8, 8, 8], expected: [[3, [0, 1, 2]], [8, [3, 4, 5]]] },
  { line: [3, 4, 3, 3, 3, 3], expected: [[3, [2, 3, 4, 5]]] },
  { line: [9, 9, 5, 9, 9], expected: [] },
  { line: [9, 5, 5, 9, 9], expected: [] },
  { line: [9, 5, 9, 5, 9], expected: [] },
  { line: [5, 9, 5, 9, 5], expected: [] },
  { line: [6, 6, 3, 0, 6], expected: [] },
  { line: [0, 8, 6, 8, 8], expected: [] },
  { line: [8, 8, 6, 8, 0], expected: [] },
  { line: [0, 0, 0, 0, 0], expected: [[0, [0, 1, 2, 3, 4]]] },
];

describe('WinningCombinations', () => {
  test.each(testCases)(
    'when line is %j returns %j',
    ({ line, expected }) => {
      const received = WinningCombinations.call(line);
      expect(received).toEqual(expected);
    }
  );
});


