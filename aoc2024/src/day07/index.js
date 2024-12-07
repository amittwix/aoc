import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => {
    const [res, nums] = line.split(":");

    return [Number(res), nums.trim().split(" ").map(Number)];
  });

const findPermutations = (variables, operators) => {
  let res = [];
  const permutations = Math.pow(operators.length, variables.length - 1);

  for (let combIndex = 0; combIndex < permutations; combIndex++) {
    let current = variables[0];
    let num = combIndex;

    for (let varIndex = 1; varIndex < variables.length; varIndex++) {
      const op = operators[num % operators.length];
      if (op === "+") {
        current += variables[varIndex];
      }
      if (op === "*") {
        current *= variables[varIndex];
      }
      if (op === "||") {
        current = "" + current + variables[varIndex];
        current = Number(current);
      }
      num = Math.floor(num / operators.length);
    }

    res[combIndex] = current;
  }

  return res;
};

const isValidTestValue = (res, nums, ops) => {
  const combs = findPermutations(nums, ops);
  return combs.some((comb) => comb === res);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input
    .filter(([res, nums]) => isValidTestValue(res, nums, ["+", "*"]))
    .map(([res]) => res)
    .reduce((acc, cur) => (acc += cur), 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return input
    .filter(([res, nums]) => isValidTestValue(res, nums, ["+", "*", "||"]))
    .map(([res]) => res)
    .reduce((acc, cur) => (acc += cur), 0);
};

const exampleInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
