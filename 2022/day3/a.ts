const text = await Deno.readTextFile("./input.txt");

const sacks = text.split("\n");

const main = () => {
  const sackPriorities = [];
  for (const sack of sacks) {
    const [first, second] = [
      sack.slice(0, sack.length / 2),
      sack.slice(sack.length / 2, sack.length),
    ];
    const shared = getShared(first, second);
    if (!shared) return;

    const value = calculateValue(shared);
    sackPriorities.push(value);
  }

  const sum = sackPriorities.reduce((prev, cur) => prev + cur, 0);
  console.log(sum);
};

const calculateValue = (letter: string): number => {
  if (
    letter.charCodeAt(0) >= "A".charCodeAt(0) &&
    letter.charCodeAt(0) <= "Z".charCodeAt(0)
  ) {
    return letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
  } else {
    return letter.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
};

const getShared = (first: string, second: string) => {
  const contents = new Set();
  for (const letter of first) {
    contents.add(letter);
  }
  for (const letter of second) {
    if (contents.has(letter)) return letter;
  }
  return null;
};

main();
