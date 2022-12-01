const text = await Deno.readTextFile("./input.txt");

const measurements = text.split('\n').map((a) => Number(a));

let increases = 0;
const slidingWindow: number[] = [];

let lastWindowSum = null;
for (let i = 0; i < measurements.length; i++) {
  slidingWindow.push(measurements[i]);
  if (slidingWindow.length === 3) {
    const thisWindowSum = slidingWindow.reduce((prev, curr) => prev + curr, 0);  
    console.log(thisWindowSum);
    if (lastWindowSum && lastWindowSum < thisWindowSum) increases++;
    lastWindowSum = thisWindowSum;
    slidingWindow.shift();
  }
}

console.log('increases: ', increases);