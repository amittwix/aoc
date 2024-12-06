import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.split(/\s+/).map(Number));;

const part1 = (rawInput) => {
  const lists = parseInput(rawInput);

  const left = lists.map((a) => a[0]).sort((a, b) => a - b);
  const right = lists.map((a) => a[1]).sort((a, b) => a - b);

  const deltas = left.map((x, i) => Math.abs(x - right[i]));

  return deltas.reduce((a, b) => a + b);
};

const part2 = (rawInput) => {
  const lists = parseInput(rawInput);

  const left = lists.map(a => a[0]).sort((a, b) => a - b);
  const right = lists.map(a => a[1]).sort((a, b) => a - b);
  const scores = left.map(x => x * right.filter(y => y === x).length);

  return scores.reduce((a, b) => a + b);
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
