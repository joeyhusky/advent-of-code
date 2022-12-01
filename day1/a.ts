const text = await Deno.readTextFile("./input.txt");

const items = text.split('\n');

let idx = 0;
let curCount = 0;
let max = -Infinity;

for (const food of items) {
  if (food !== '\r') {
    const count = Number(food.substring(0, food.indexOf('\r')));
    curCount += count;
  } else {
    max = Math.max(max, curCount);
    // elfFoodMap.set(idx, curCount);
    idx++;
    curCount = 0;
  }
}

console.log('max: ', max);