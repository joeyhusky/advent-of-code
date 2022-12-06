import { getInputData } from "../../utils.ts";

const text = await getInputData();
const lines = text.split("\n");

const getDiagramAndInstructions = (lines: string[]): [string[], string[]] => {
  const diagram = [];
  const instructions = [];
  let isInstructions = false;
  for (const line of lines) {
    if (line === "") {
      isInstructions = true;
      continue;
    }

    if (isInstructions) {
      instructions.push(line);
    } else {
      diagram.push(line);
    }
  }
  return [diagram, instructions];
};

const [diagram, instructions] = getDiagramAndInstructions(lines);

const lastLineOfDiagram = diagram[diagram.length - 1];
const colLookupArray = lastLineOfDiagram.split(" ").map(Number);
const numCols: number = colLookupArray.reduce(
  (prev, cur) => Math.max(prev, cur),
  0
);

const getColumnLookupIdx = (idx: number) =>
  lastLineOfDiagram.split("").map(Number).indexOf(idx);
const colLookupMap = new Map();
for (let i = 1; i <= numCols; i++) {
  colLookupMap.set(i, getColumnLookupIdx(i));
}

const stacks: string[][] = [];

// initialize stacks
for (let i = 0; i <= numCols; i++) {
  stacks[i] = [];
}

for (let lineIdx = 0; lineIdx < diagram.length - 1; lineIdx++) {
  const line = diagram[lineIdx];
  for (let i = 1; i <= numCols; i++) {
    const index = colLookupMap.get(i);
    const val = line.charAt(index);

    if (val !== " ") {
      stacks[i].unshift(val);
    }
  }
}

const iterateInstructions = (instructions: string[]) => {
  for (const instruction of instructions) {
    const [, count, , fromIdx, , toIdx] = instruction.split(" ").map(Number);
    parseInstruction(fromIdx, toIdx, count);
  }
};

const parseInstruction = (fromIdx: number, toIdx: number, count: number) => {
  const block = [];
  for (let i = 0; i < count; i++) {
    const popped = stacks[fromIdx].pop();
    if (popped) block.unshift(popped);
  }
  stacks[toIdx].push(...block);
};
iterateInstructions(instructions);

let answer = "";
stacks.shift(); // pop off first empty stack used to make indexing easier
stacks.forEach((s) => (answer += s.pop()));

console.log("answer", answer);
