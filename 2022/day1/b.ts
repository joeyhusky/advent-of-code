
const text = await Deno.readTextFile("./input.txt");

const items = text.split('\n');

let curCount = 0;
let max = -Infinity;

const foodCounts = [];

for (const food of items) {
  if (food !== '\r') {
    const count = Number(food.substring(0, food.indexOf('\r')));
    curCount += count;
  } else {
    foodCounts.push(curCount);
    max = Math.max(max, curCount);
    curCount = 0;
  }
}

foodCounts.sort((a, b) => b - a);

console.log(foodCounts);

console.log('top three total: ', foodCounts[0] + foodCounts[1] + foodCounts[2])