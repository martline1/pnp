// Objetivo: O(n^12)

import * as path from "node:path";

console.log(`Imported: ${path.basename(__filename)}`);

class Variables {
  private readonly data = new Set<string>();

  constructor(
    private readonly maxSize: number,
  ) {}

  public push(value: string): void {
    if (this.data.has(value)) return;

    if (this.data.size === this.maxSize) {
      throw new Error(`Max number of variables already reached, cannot push extra variable: ${value}`);
    }

    this.data.add(value);
  }
}

export const _3SAT = (varsAmount: number, clauses: [string, string, string][]) => { // Current complexity O(3n) "n" being clauses.length
  if (!Number.isSafeInteger(varsAmount) || varsAmount <= 0) {
    throw new Error("Invalid number of variables, must be a positive safe integer greater than 0");
  }
  if (!Array.isArray(clauses) || clauses.length <= 0) {
    throw new Error("Invalid number of clauses, must be a valid array with length greater than 0");
  }

  const variables = new Variables(varsAmount);

  for (let i = 0; i < clauses.length; i++) {
    const clause = clauses[i];

    if (!Array.isArray(clause) || clause.length !== 3) {
      throw new Error(`Each clause must be an array of 3 items, received ${clause?.join?.(", ")} at clauses[${i}]`);
    }

    for (const expression of clause) {
      if (typeof expression !== "string" || !expression) {
        throw new Error(`Each expression inside a clause must be a not empty string, received ${expression} at clauses[${i}]`);
      }

      const isNegated = expression.startsWith("not ");
      const variableKey = isNegated
        ? expression.slice("not ".length)
        : expression;

      if (!variableKey) {
        throw new Error(`Received empty variable name at clauses[${i}]`);
      }

      variables.push(variableKey);
    }
  }
};

_3SAT(
  3,
  [
    ["not a", "b", "c"],
    ["b", "not c", "not a"],
    ["not c", "not b", "a"],
    ["not a", "a", "not c"],
  ]
);
