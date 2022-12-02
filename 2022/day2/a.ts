const text = await Deno.readTextFile("./input.txt");

const rounds = text.split('\n');
// console.log(rounds);
for (const round of rounds) {
  const [enemy, _, me] = round;
  // check for win conditions
}

const map = {
  X: 'rock',
  Y: 'paper',
  Z: 'scissors'
} as const;

const enemyMap = {
  A: 'rock',
  B: 'paper',
  C: 'scissors'
} as const;
