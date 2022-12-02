const text = await Deno.readTextFile("./example.txt");

const instructions = text.split("\n");

for (const instruction of instructions) {
  const [direction, n] = instruction.split(" ");
  console.log(`direction ${direction}, amount ${n}`);
}
