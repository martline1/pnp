type PigeonId = number;
type HoleId   = number;

export type GeneratedPigeonProblem = {
  holeWithTwoPigeons: number;
  pigeonToHole: Map<number, number>;
}

export const pigeonProblemGenerator = (numberOfHoles: number): GeneratedPigeonProblem => {
  if (!Number.isSafeInteger(numberOfHoles) || numberOfHoles <= 0) {
    throw new Error("numberOfHoles must be an integer greater than 0");
  }

  const numberOfPigeons = numberOfHoles + 1;
  const pigeons: PigeonId[] = shuffle(
    Array.from({ length: numberOfPigeons }).map((_, index) => index)
  );

  const pigeonToHole = new Map<PigeonId, HoleId>();

  // For the first N pigeons, assign them to a hole
  // because pigeons.length is N + 1, there's a remaining pigeon
  // at the last position
  for (let holeId = 0; holeId < numberOfHoles; holeId++) {
    const pigeonId: PigeonId = pigeons[holeId]!;

    pigeonToHole.set(pigeonId, holeId);
  }

  const remainingPigeon = pigeons[pigeons.length - 1]!;

  // The objective of the _3SAT solver for this scenario would be to find this hole:
  // This is a random hole from the set of holes.
  const holeWithTwoPigeons: HoleId = Math.floor(Math.random() * numberOfHoles);

  pigeonToHole.set(remainingPigeon, holeWithTwoPigeons);

  return {
    holeWithTwoPigeons,
    pigeonToHole,
  };
};

const shuffle = <T>(arr: T[]) => {
  return arr
    .map(value => ({
      value,
      weight: Math.random(),
    }))
    .sort((a, b) => a.weight - b.weight)
    .map(({ value }) => value);
};
