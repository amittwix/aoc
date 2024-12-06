import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const matrix = parseInput(rawInput);

  let sum = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const results = [
        // left
        [
          matrix[row][col],
          matrix[row + 1]?.[col],
          matrix[row + 2]?.[col],
          matrix[row + 3]?.[col],
        ],
        // down
        [
          matrix[row][col],
          matrix[row]?.[col + 1],
          matrix[row]?.[col + 2],
          matrix[row]?.[col + 3],
        ],
        // right up
        [
          matrix[row][col],
          matrix[row + 1]?.[col + 1],
          matrix[row + 2]?.[col + 2],
          matrix[row + 3]?.[col + 3],
        ],
        // left up
        [
          matrix[row][col],
          matrix[row - 1]?.[col + 1],
          matrix[row - 2]?.[col + 2],
          matrix[row - 3]?.[col + 3],
        ],
      ]
        .map((result) => result.join(""))
        .filter((result) => result === "XMAS" || result === "SAMX").length;

      sum += results;
    }
  }

  return sum;
};

const part2 = (rawInput) => {
  const matrix = parseInput(rawInput);

  let sum = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const validResult = [
        [
          matrix[row][col],
          matrix[row + 1]?.[col + 1],
          matrix[row + 2]?.[col + 2],
        ],
        [
          matrix[row][col + 2],
          matrix[row + 1]?.[col + 1],
          matrix[row + 2]?.[col],
        ],
      ]
        .map((result) => result.join(""))
        .every((result) => result === "MAS" || result === "SAM");

      if (validResult) {
        sum++;
      }
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
