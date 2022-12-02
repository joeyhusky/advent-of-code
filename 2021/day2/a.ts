const text = await Deno.readTextFile("./input.txt");

const instructions = text.split("\n");

let depth = 0;
let horizontal = 0;
let aim = 0;

type Dir = "forward" | "down" | "up";

for (const instruction of instructions) {
  const [direction, n] = instruction.split(" ") as [Dir, string];
  const amount = Number(n);
  console.log(direction, n);
  if (direction === "down") {
    aim += amount;
  } else if (direction === "up") {
    aim -= amount;
  } else {
    horizontal += amount;
    depth += aim * amount;
  }
}

console.log(`dpeth: ${depth}, horizontal: ${horizontal}`);
console.log(`multiplied: ${depth * horizontal}`);
