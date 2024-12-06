import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const result = Array.from(input.matchAll(/mul\((\d+),(\d+)\)/g)).map(
    (match) => match[1] * match[2],
  );

  return result.reduce((a, b) => a + b, 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const result = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g);

  let enabled = true;
  let sum = 0;
  for (const match of result) {
    if (match[0] === "do()") {
      enabled = true;
    }

    if (match[0] === "don't()") {
      enabled = false;
    }

    if (enabled && match[0].startsWith("mul")) {
      sum += match[1] * match[2];
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
