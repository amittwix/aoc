import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(""));

const nextNodeByDirection = (node, direction) => {
  const [y, x] = node;

  if (direction === "up") {
    return [y - 1, x];
  }

  if (direction === "down") {
    return [y + 1, x];
  }

  if (direction === "left") {
    return [y, x - 1];
  }

  if (direction === "right") {
    return [y, x + 1];
  }
};

const turnMap = {
  up: "right",
  down: "left",
  left: "up",
  right: "down",
};

const travel = (matrix, startPosition, obstaclePosition) => {
  const visited = new Set();
  const turns = new Set();

  if (obstaclePosition) {
    matrix[obstaclePosition[0]][obstaclePosition[1]] = "#";
  }

  let [curY, curX] = startPosition;
  matrix[curY][curX] = ".";

  visited.add(`${curY},${curX}`);

  let nextNode = [curY - 1, curX];
  let nextNodeValue = matrix?.[nextNode[0]]?.[nextNode[1]];
  let direction = "up";

  while (nextNodeValue) {
    nextNodeValue = matrix?.[nextNode[0]]?.[nextNode[1]];
    if (!nextNodeValue) {
      return obstaclePosition ? undefined : visited;
    }

    if (nextNodeValue === ".") {
      curY = nextNode[0];
      curX = nextNode[1];
      visited.add(`${curY},${curX}`);

      nextNode = nextNodeByDirection([curY, curX], direction);
    }

    if (nextNodeValue === "#") {
      direction = turnMap[direction];
      nextNode = nextNodeByDirection([curY, curX], direction);

      const turnKey = `${curY},${curX},${direction}`;
      if (turns.has(turnKey)) {
        return turns;
      }
      turns.add(turnKey);
    }
  }
};

const getStartPosition = (input) => {
  const startY = input.findIndex((line) => line.includes("^"));
  const startX = input[startY].indexOf("^");

  return [startY, startX];
};

const part1 = (rawInput) => {
  const matrix = parseInput(rawInput);
  const startPosition = getStartPosition(matrix);

  return travel(matrix, startPosition).size;
};

const part2 = (rawInput) => {
  const matrix = parseInput(rawInput);
  const startPosition = getStartPosition(matrix);

  let sum = 0;
  travel(parseInput(rawInput), startPosition).forEach((pos) => {
    const [y, x] = pos.split(",").map(Number);

    const loop = travel(parseInput(rawInput), startPosition, [y, x]);
    if (loop) {
      sum++;
    }
  });

  return sum;
};

const exampleInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
