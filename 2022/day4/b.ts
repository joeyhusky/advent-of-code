const text = await Deno.readTextFile("./input.txt");

const pairs = text.split("\n");

const main = () => {
  let numOverlap = 0;
  for (const pair of pairs) {
    const [A, B] = pair.split(",");
    const rangeA = A.split("-").map(Number);
    const rangeB = B.split("-").map(Number);
    if (overlaps(rangeA, rangeB)) numOverlap++;
    console.log("first ", rangeA, "\nsecond ", rangeB);
  }
  console.log("num partly overlapping ", numOverlap);
};

const overlaps = (rangeA: number[], rangeB: number[]): boolean => {
  if (rangeA[1] >= rangeB[0] && rangeA[1] <= rangeB[1]) return true;
  if (rangeA[0] >= rangeB[0] && rangeA[0] <= rangeB[1]) return true;
  if (rangeA[0] < rangeB[0] && rangeA[1] > rangeB[1]) return true;
  return false;
};
main();

const test = (rangeA: number[], rangeB: number[], actual: boolean) => {
  // console.log("testing ranges: ", rangeA, rangeB);
  const didFail = overlaps(rangeA, rangeB) != actual;
  console.log(didFail ? "failed" : "PASS");
};

test([1, 5], [5, 6], true);
test([1, 5], [6, 7], false);
test([1, 5], [2, 3], true);
test([1, 5], [0, 3], true);
test([1, 5], [0, 6], true);
test([1, 5], [0, 1], true);
test([1, 5], [5, 5], true);
test([1, 5], [4, 5], true);
