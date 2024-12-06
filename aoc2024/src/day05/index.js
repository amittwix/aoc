import run from "aocrunner";

const parseInput = (rawInput) => {
  const lines = rawInput.split("\n");
  const rules = lines
    .toSpliced(lines.indexOf(""))
    .map((v) => v.split("|").map(Number));
  const updates = lines
    .toSpliced(0, lines.indexOf("") + 1)
    .map((v) => v.split(",").map(Number));

  return [rules, updates];
};

const isRuleApplicableForUpdate = (rule, update) =>
  rule.every((page) => update.includes(page));

const isCorrectOrder = (update, rules) => {
  return rules
    .map((rule) => {
      if (isRuleApplicableForUpdate(rule, update)) {
        return update.indexOf(rule[0]) < update.indexOf(rule[1]);
      }

      return true;
    })
    .every(Boolean);
};

const findMedian = (arr) => {
  const middleIndex = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
  } else {
    return arr[middleIndex];
  }
};

const part1 = (rawInput) => {
  const [rules, updates] = parseInput(rawInput);
  const validUpdates = updates.filter((update) =>
    isCorrectOrder(update, rules),
  );

  return validUpdates.reduce((acc, cur) => {
    const median = findMedian(cur);
    acc += median;
    return acc;
  }, 0);
};

const part2 = (rawInput) => {
  const [rules, updates] = parseInput(rawInput);
  const invalidUpdates = updates.filter(
    (update) => !isCorrectOrder(update, rules),
  );

  const fixedUpdates = invalidUpdates.map((update) => {
    return update.sort((a, b) => {
      const rule = rules.find((ruleNums) =>
        ruleNums.every((num) => num === a || num === b),
      );
      return update.indexOf(rule[0]) < update.indexOf(rule[1]) ? 0 : -1;
    });
  });

  return fixedUpdates.reduce((acc, cur) => {
    const median = findMedian(cur);
    acc += median;
    return acc;
  }, 0);
};

const exampleInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
