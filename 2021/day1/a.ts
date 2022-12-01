const text = await Deno.readTextFile("./input.txt");

const measurements = text.split('\n').map((a) => Number(a));

let increases = 0;

for (let i = 0; i < measurements.length - 1; i++) {
  if (measurements[i] < measurements[i + 1]) {
    increases++;
  }
}

console.log('increases: ', increases);