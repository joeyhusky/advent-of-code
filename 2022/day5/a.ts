import { getInputData } from "../../utils.ts";

const text = await getInputData();

const lines = text.split("\n");

const diagram = [];
const instructions = [];

for (const line of lines) {
  if (line === "") break;
  diagram.push(line);
}

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

console.log(colLookupMap);

const stacks: string[][] = [];

for (let i = 0; i <= numCols; i++) {
  stacks[i] = [];
}

for (let lineIdx = 0; lineIdx < diagram.length - 1; lineIdx++) {
  const line = diagram[lineIdx];
  console.log(line);
  for (let i = 1; i <= numCols; i++) {
    const index = colLookupMap.get(i);
    const val = line.charAt(index);
    console.log(
      `looking up column index ${i} at position ${index}, found value ${val}`
    );
    if (val !== " ") {
      stacks[i].push(val);
    } else {
      stacks[i].push("null");
    }
  }
}

console.log("stacks ", stacks);
