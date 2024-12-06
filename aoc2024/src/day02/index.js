import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(" ").map(Number));

const isSafe = (line) => {
  const result = line.map((num, i) => i > 0 && num - line[i - 1]).slice(1);

  return (
    result.every((num) => num >= 1 && num <= 3) ||
    result.every((num) => num <= -1 && num >= -3)
  );
};

const part1 = (rawInput) => {
  const lines = parseInput(rawInput);

  return lines.filter(isSafe).length;
};

const part2 = (rawInput) => {
  const lines = parseInput(rawInput);

  return lines.filter((line) =>
    line.map((_x, i) => line.toSpliced(i, 1)).find(isSafe),
  ).length;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
