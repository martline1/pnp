import assert from "node:assert";

type VotesPerVariable = {
  [variableName: string]: {
    positiveVotes: number;
    negativeVotes: number;
  };
};

export type Clause = [string, string, string];

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

/**
 * Verifies input is of the expected shape, variables count is exactly the expected amount,
 * ignores duplicate clauses, each variable is a string identifier with length > 0 and less than
 * or equal to 255.
 *
 * This algorithmn is linear, let n be clauses.length:
 * - Each clause, contains 3 literals which it iterates     | + 3 actions per clause
 * - Each clause is sorted, which is at most 3 comparissons | + 3 actions per clause
 * With 6 actions per clause that leaves the time complexity of this algorithmn as O(n*6)
 */
const parseInput = (varsAmount: number, clauses: Clause[]): Clause[] => {
  if (!Number.isSafeInteger(varsAmount) || varsAmount <= 0) {
    throw new Error("Invalid number of variables, must be a positive safe integer greater than 0");
  }
  if (!Array.isArray(clauses) || clauses.length <= 0) {
    throw new Error("Invalid number of clauses, must be a valid array with length greater than 0");
  }

  const seenVariables = new Set<string>();
  const pushToSeenVariables = (value: string) => {
    if (seenVariables.has(value)) return;

    if (seenVariables.size === varsAmount) {
      throw new Error(`Max number of variables already reached, cannot push extra variable: ${value}`);
    }

    seenVariables.add(value);
  };

  const seenClauses = new Set<string>();

  const finalCluases: Clause[] = [];

  for (let i = 0; i < clauses.length; i++) {
    const clause = clauses[i]!;
    const clausePositionKey = `clauses[${i}]`;

    if (!Array.isArray(clause) || clause.length !== 3) {
      throw new Error(`Each clause must be an array of 3 items, received ${clause?.join?.(", ")} at ${clausePositionKey}`);
    }

    for (const literal of clause) {
      if (!literal || typeof literal !== "string") {
        throw new Error(`Each literal inside a clause must be a non empty string, received ${literal} at ${clausePositionKey}`);
      }

      const variableName = literal.startsWith("not ")
        ? literal.slice("not ".length)
        : literal;

      if (!variableName) {
        throw new Error(`Received empty variable name at ${clausePositionKey}`);
      }
      if (variableName.length > 255) {
        throw new Error(`The name of any given variable must be under 255 characters, received ${variableName} at ${clausePositionKey}`);
      }

      pushToSeenVariables(variableName);
    }

    const joinedClause = clause.sort().join(""); // constant time in practice, due to the fixed arr size (3), at most 3 string comparissons

    if (seenClauses.has(joinedClause)) continue;

    seenClauses.add(joinedClause);
    finalCluases.push(clause);
  }

  if (seenVariables.size !== varsAmount) {
    throw new Error(`Expected to have ${varsAmount} instead we found ${seenVariables.size}`);
  }

  return finalCluases;
};

export const _3SAT = (varsAmount: number, clauses: Clause[]): _3SatResult => {
  clauses = parseInput(varsAmount, clauses); // This adds linear complexity

  if (clauses.length < 2) {
    throw new Error("Not implemented for clauses.length < 2");
  }

  const last = clauses.pop()!;

  clauses = [...clauses, ...clauses, last]; // Aplies AND

  const votes: VotesPerVariable = {};

  for (const clause of clauses) {
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
  _3SAT(4,
    [
      ["not x1", "x2", "x3"],
      ["x4", "x2", "not x1"],
      ["not x3", "not x2", "x1"],
      ["x2", "not x4", "x1"],
      ["x3", "not x2", "x1"],
      ["not x3", "not x1", "not x1"],
      ["not x3", "x2", "x1"],
      ["x4", "not x1", "x3"],
      ["not x4", "not x2", "not x1"],
      ["not x3", "not x2", "not x3"],
      ["x1", "not x3", "x4"],
      ["x1", "x2", "x3"],
    ]
  ),
  {
    status: 'unsatisfiable',
    because: [ 'x4' ],
  },
);

assert.deepStrictEqual(
  _3SAT(4,
    [
      ["not x1", "x2", "x3"],
      ["x4", "x2", "not x1"],
      ["not x3", "not x2", "x1"],
      ["x2", "not x4", "x1"],
      ["x3", "x2", "x1"],
      ["not x3", "not x1", "not x1"],
      ["not x3", "x2", "x1"],
      ["x4", "not x1", "x3"],
      ["not x4", "not x2", "not x1"],
      ["not x3", "not x2", "not x3"],
      ["x1", "not x3", "x4"],
      ["x1", "x2", "x3"],
    ]
  ),
  {
    status: 'satisfiable',
    variables: { x1: false, x2: true, x3: false, x4: false },
  },
);
