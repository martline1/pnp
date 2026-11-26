import { Clause } from "../attempts/0006-v1";
import { GeneratedPigeonProblem } from "./pigeonProblemGenerator";

export const pigeonProblemTo3Sat = (problem: GeneratedPigeonProblem): [number, Clause[]] => {

  // Definir las variables

  const variables: string[] = [];

  const numberOfPigeons = problem.pigeonToHole.size;
  const numberOfHoles   = numberOfPigeons - 1;

  const clauses: Clause[] = [];

  for (let pigeonId = 0; pigeonId < numberOfPigeons; pigeonId++) {
    for (let holeId = 0; holeId < numberOfHoles; holeId++) {
      variables.push(`Pigeon:${pigeonId}_Hole:${holeId}`);

      // All pigeons must be in exactly one hole:
    }
  }

  

  

  return [variables.length, clauses];
};
