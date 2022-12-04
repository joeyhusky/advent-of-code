const text = await Deno.readTextFile("./input.txt");

const sacks = text.split("\n");

const main = () => {
  const sackPriorities = [];
  for (let i = 0; i < sacks.length; i += 3) {
    const [first, second, third] = [sacks[i], sacks[i + 1], sacks[i + 2]];
    const shared = getShared(first, second, third);
    console.log("shared ", shared);

    if (!shared) continue;

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

const getShared = (first: string, second: string, third: string): string => {
  const [firstSet, secondSet, thirdSet] = [
    new Set<string>(),
    new Set<string>(),
    new Set<string>(),
  ];
  for (const letter of first) {
    firstSet.add(letter);
  }

  for (const letter of second) {
    secondSet.add(letter);
  }
  for (const letter of third) {
    thirdSet.add(letter);
  }

  // find intersection
  const intersection = [...firstSet].filter(
    (a) => secondSet.has(a) && thirdSet.has(a)
  );
  return intersection[0];
};

main();
