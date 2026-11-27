// Please read [empiric-data.md](src/empiric-data.md)

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

const orDistribution = (clause: [string, string, string]) => ({
  leftLoaded: [ // Or(Or()())()
    clause[0],
    clause[0],
    clause[0],
    clause[0],
    clause[1],
    clause[1],
    clause[2],
  ],
  rightLoaded: [ // Or()(Or()())
    clause[0],
    clause[0],
    clause[1],
    clause[1],
    clause[2],
  ],
});

export const _3SAT = (varsAmount: number, clauses: Clause[]): _3SatResult => {
  clauses = parseInput(varsAmount, clauses); // This adds linear complexity

  if (clauses.length !== 4) {
    throw new Error("Not implemented for clauses.length !== 4");
  }

  const last = clauses.pop();

  // This applies And()(And()(And()(And()())))
  const newClauses = [
    ...clauses,
    ...clauses,
    last,
  ];

  // // This applies And(And()())(And()())
  // const newClauses = [
  //   clauses[0]!,
  //   clauses[0]!,
  //   clauses[0]!,
  //   clauses[0]!,
  //   clauses[1]!,
  //   clauses[1]!,
  //   clauses[2]!,
  //   clauses[2]!,
  //   clauses[3]!,
  // ];

  const votes: VotesPerVariable = {};

  for (const clause of newClauses) {
    const literals = orDistribution(clause!).rightLoaded;

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
    ["not x_1", "x_2", "x_2"],
    ["not x_2", "not x_3", "not x_3"],
    ["x_3", "x_4", "x_4"],
    ["x_1", "x_1", "x_1"]
  ]),
  {
    status: 'satisfiable',
    variables: { x_1: true, x_2: true, x_3: false, x_4: true },
  },
);
