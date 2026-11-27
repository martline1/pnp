import assert from "node:assert";
import { parseInput } from "./parseInput";
import { Clause } from "./types";

type VotesPerVariable = {
  [variableName: string]: {
    positiveVotes: number;
    negativeVotes: number;
  };
};

export type _3SatResult =
  {
    status: "unsatisfiable";
    because: string[];
  } | {
    status: "satisfiable";
    variables: {
      [variableName: string]: boolean;
    };
  };

export const _3SAT = (varsAmount: number, clauses: Clause[]): _3SatResult => {
  clauses = parseInput(varsAmount, clauses); // This adds linear complexity

  if (clauses.length !== 4) {
    throw new Error("Not implemented for clauses.length !== 4");
  }

  // This applies AND(AND(clause0)(clause1))(AND(clause2)(clause3))
  const newClauses = [
    clauses[0]!,
    clauses[0]!,
    clauses[0]!,
    clauses[0]!,
    clauses[1]!,
    clauses[1]!,
    clauses[2]!,
    clauses[2]!,
    clauses[3]!,
  ];

  const votes: VotesPerVariable = {};

  for (const clause of newClauses) {
    const literals = [
      clause[0],clause[0],clause[1],clause[1],clause[2] // Aplies OR
    ];

    for (const literal of literals) {
      const isNegated = literal.startsWith("not ");
      const variableName = isNegated
        ? literal.slice("not ".length)
        : literal;

      if (!(variableName in votes)) {
        votes[variableName] = {
          positiveVotes: 0,
          negativeVotes: 0,
        };
      }

      if (isNegated) {
        votes[variableName]!.negativeVotes += 1;
      } else {
        votes[variableName]!.positiveVotes += 1;
      }
    }
  }

  const notSatBecause: string[] = [];
  const variablesResult: Record<string, boolean> = {};

  for (const [variableName, { positiveVotes, negativeVotes }] of Object.entries(votes)) {
    if (positiveVotes === negativeVotes) {
      notSatBecause.push(variableName);
      continue;
    }

    variablesResult[variableName] = positiveVotes > negativeVotes;
  }

  if (notSatBecause.length > 0) {
    return {
      status: "unsatisfiable",
      because: notSatBecause,
    };
  }

  return {
    status: "satisfiable",
    variables: variablesResult,
  };
};

assert.deepStrictEqual(
  _3SAT(4, [
    ["not x_1", "not x_1", "not x_1"],
    ["x_1", "not x_2", "not x_2"],
    ["x_2", "x_3", "x_3"],
    ["not x_3", "not x_4", "not x_4"]
  ]),
  { x_1: false, x_2: false, x_3: true, x_4: false }
);
