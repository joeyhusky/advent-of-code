const text = await Deno.readTextFile("./input.txt");

const pairs = text.split('\n');

const main = () => {
  let numOverlap = 0;
  for (const pair of pairs) {
    const [A, B] = pair.split(',');
    const rangeA = A.split('-').map(Number);
    const rangeB = B.split('-').map(Number);
    if (fullyContains(rangeA, rangeB)) numOverlap++;
    console.log('first ', rangeA, '\nsecond ', rangeB);
  }
  console.log('num overlapping ', numOverlap);
}

const fullyContains = (rangeA: number[], rangeB: number[]): boolean => {
  if (rangeA[0] >= rangeB[0] && rangeA[1] <= rangeB[1]) return true;
  if (rangeB[0] >= rangeA[0] && rangeB[1] <= rangeA[1]) return true;
  return false;
}
main();