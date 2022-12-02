const main = async () => {
  const text = await Deno.readTextFile("./input.txt");
  const rounds = text.split("\n");
  let overallScore = 0;

  for (const round of rounds) {
    const [enemy, _, me] = round;
    if (!enemy || !me) continue;
    const enemyPlay = enemyMap[enemy];
    const expectedOutcome = expectedOutcomeMap[me];
    const myPlay = determinePlay(expectedOutcome, enemyPlay);
    const score = calculateScore(myPlay!, enemyPlay);
    overallScore += score;
  }
  console.log("overall score: ", overallScore);
};

const expectedOutcomeMap: { [input: string]: Outcome } = {
  X: "loss",
  Y: "draw",
  Z: "win",
} as const;

const enemyMap: MoveDecoder = {
  A: "rock",
  B: "paper",
  C: "scissors",
} as const;

const calculateScore = (me: Move, enemy: Move): number => {
  let curScore = scoringValues[me];
  const outcome = determineWinner(me, enemy);
  curScore += roundScore[outcome];
  return curScore;
};

const scoringValues = {
  rock: 1,
  paper: 2,
  scissors: 3,
} as const;

const roundScore: Record<Outcome, number> = {
  win: 6,
  draw: 3,
  loss: 0,
};

type Move = keyof typeof scoringValues;
type MoveDecoder = { [code: string]: Move };

const possibleOutcomes = ["win", "loss", "draw"] as const;
type Outcome = typeof possibleOutcomes[number];

const determineWinner = (me: Move, enemy: Move): Outcome => {
  switch (me) {
    case "paper":
      if (enemy === "rock") return "win";
      if (enemy === "scissors") return "loss";
      return "draw";
    case "rock":
      if (enemy === "scissors") return "win";
      if (enemy === "paper") return "loss";
      return "draw";
    case "scissors":
      if (enemy === "paper") return "win";
      if (enemy === "rock") return "loss";
      return "draw";
    default:
      return unreachable(me);
  }
};

const determinePlay = (outcome: Outcome, enemy: Move): Move | undefined => {
  if (outcome === "draw") return enemy;
  switch (enemy) {
    case "paper":
      if (outcome === "win") return "scissors";
      if (outcome === "loss") return "rock";
    /* falls through */
    case "rock":
      if (outcome === "win") return "paper";
      if (outcome === "loss") return "scissors";
      break;
    case "scissors":
      if (outcome === "win") return "rock";
      if (outcome === "loss") return "paper";
      break;
    default:
      unreachable(enemy);
  }
};

function unreachable(_: never): never {
  throw new Error("this shouldnt be reachable");
}

main();
