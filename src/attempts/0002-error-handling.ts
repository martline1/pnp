// Objetivo: O(n^12)

// [X] Si en algún punto observo que hay más variables que las que debería, throw
// [X] Si en algún punto observo que cada expresión no tiene 3 variables, throw

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

export const _3SAT = (varsAmount: number, clauses: [string, string, string][]) => {
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
      const isNegated = expression.startsWith("not ");
      const variableKey = isNegated
        ? expression.substring("not ".length)
        : expression;

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
