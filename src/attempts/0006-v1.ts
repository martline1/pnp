import * as path from "node:path";
import assert from "node:assert";

console.log(`Imported: ${path.basename(__filename)}`);

export type Clause = [string, string, string];
export type Results = {
  [variableName: string]: {
    positiveVotes: number;
    negativeVotes: number;
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

/**
 * This is a sat solver in linear time
 */
export const _3SAT = (varsAmount: number, clauses: Clause[]): Results => {
  clauses = parseInput(varsAmount, clauses); // This adds linear complexity

  if (clauses.length < 2) {
    throw new Error("Not implemented for clauses.length < 2");
  }

  const last = clauses.pop()!;

  clauses = [...clauses, ...clauses, last]; // Aplies AND

  const results: Results = {};

  for (const clause of clauses) {
    const literals = [ // Aplies OR
      clause[0],clause[0],clause[1],clause[1],clause[2]
    ];

    for (const literal of literals) {
      const isNegated = literal.startsWith("not ");
      const variableName = isNegated
        ? literal.slice("not ".length)
        : literal;
      
      if (!(variableName in results)) {
        results[variableName] = {
          positiveVotes: 0,
          negativeVotes: 0,
        };
      }

      if (isNegated) {
        results[variableName]!.negativeVotes += 1;
      } else {
        results[variableName]!.positiveVotes += 1;
      }
    }
  }

  return results;
};

function test() {
  // Let's try with an unsatisfiable one:

  // (!x1 || x2 || x3)
  // && (x4 || x2 || !x1)
  // && (!x3 || !x2 || x1)
  // && (x2 || !x4 || x1)
  // && (x3 || !x2 || x1)
  // && (!x3 || !x1 || !x1)
  // && (!x3 || x2 || x1)
  // && (x4 || !x1 || x3)
  // && (!x4 || !x2 || !x1)
  // && (!x3 || !x2 || !x3)
  // && (x1 || !x3 || x4)
  // && (x1 || x2 || x3)

  const resultsUnsatisfiable = _3SAT(4, 
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
  );

  console.log(resultsUnsatisfiable);
  // {
  //   x1: { positiveVotes: 20, negativeVotes: 24 }, // Not equal
  //   x2: { positiveVotes: 14, negativeVotes: 16 }, // Not equal
  //   x3: { positiveVotes: 9, negativeVotes: 20 },  // Not equal
  //   x4: { positiveVotes: 6, negativeVotes: 6 }    // EQUAL!
  // }

  // If we make it satisfiable:

  // (!x1 || x2 || x3)
  // && (x4 || x2 || !x1)
  // && (!x3 || !x2 || x1)
  // && (x2 || !x4 || x1)
  // && (x3 || x2 || x1)
  // && (!x3 || !x1 || !x1)
  // && (!x3 || x2 || x1)
  // && (x4 || !x1 || x3)
  // && (!x4 || !x2 || !x1)
  // && (!x3 || !x2 || !x3)
  // && (x1 || !x3 || x4)
  // && (x1 || x2 || x3)

  const resultsSatisfiable = _3SAT(4, 
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
  );

  console.log(resultsSatisfiable);
  // {
  //   x1: { positiveVotes: 16, negativeVotes: 24 }, // Not equal!
  //   x2: { positiveVotes: 16, negativeVotes: 12 }, // Not equal!
  //   x3: { positiveVotes: 8, negativeVotes: 18 },  // Not equal!
  //   x4: { positiveVotes: 5, negativeVotes: 6 }    // Not equal!
  // }

  // let's test that:
  const x1 = false;
  const x2 = true;
  const x3 = false;
  const x4 = false;

  assert( // This compiles and runs no problem...
    (!x1 || x2 || x3)
    && (x4 || x2 || !x1)
    && (!x3 || !x2 || x1)
    && (x2 || !x4 || x1)
    && (x3 || x2 || x1)
    && (!x3 || !x1 || !x1)
    && (!x3 || x2 || x1)
    && (x4 || !x1 || x3)
    && (!x4 || !x2 || !x1)
    && (!x3 || !x2 || !x3)
    && (x1 || !x3 || x4)
    && (x1 || x2 || x3)
  );
}

test();
