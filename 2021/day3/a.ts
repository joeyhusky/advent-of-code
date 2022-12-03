const text = await Deno.readTextFile("./input.txt");

interface Counts {
  zeros: number;
  ones: number;
}

const binaryToInt = (binary: string): number => {
  let accum = 0;
  let idx = 0;
  for (let i = binary.length - 1; i >= 0; i--) {
    const digit = Number(binary.charAt(i));
    if (digit) accum += Math.pow(2, idx);
    idx++;
  }
  return accum;
};

const counts: Counts[] = [];

const makeOrUpdateCounts = (value: string, idx: number) => {
  const c: Counts = counts[idx] || { zeros: 0, ones: 0 };
  counts[idx] = c;
  if (value === "0") c.zeros++;
  if (value === "1") c.ones++;
};

const lines = text.split("\n");

const iterateLine = (line: string) => {
  for (let i = 0; i < line.length; i++) {
    const c = line.charAt(i);
    makeOrUpdateCounts(c, i);
  }
};

for (const line of lines) {
  iterateLine(line);
}

let gamma = "";
let epsilon = "";
for (const i of counts) {
  if (i.ones > i.zeros) {
    gamma += "1";
    epsilon += "0";
  } else {
    gamma += "0";
    epsilon += "1";
  }
}
console.log("gamma ", gamma);
console.log("epsilon ", epsilon);

console.log(binaryToInt(gamma) * binaryToInt(epsilon));
