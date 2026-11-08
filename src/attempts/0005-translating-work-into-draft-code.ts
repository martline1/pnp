// Objetivo: O(n^12)

import assert from "node:assert";
import * as path from "node:path";

console.log(`Imported: ${path.basename(__filename)}`);

// @ts-ignore
const True  = x => y => x;
// @ts-ignore
const False = x => y => y;
// @ts-ignore
const Not = a => a(False)(True);
// @ts-ignore
var Or = x => y => x(True)(y);
// @ts-ignore
var Or = x => y => x(x)(y);
// @ts-ignore
var And = x => y => x(y(True)(False))(False);
// @ts-ignore
var And = x => y => x(y)(x);

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

// @ts-ignore
const toBoolean = a => a(true)(false);

function main() {
  assert(toBoolean(Not(True)) === false);
  assert(toBoolean(Not(False)) === true);

  assert(toBoolean(Or(True)(True)) === true);
  assert(toBoolean(Or(True)(False)) === true);
  assert(toBoolean(Or(False)(True)) === true);
  assert(toBoolean(Or(False)(False)) === false);

  assert(toBoolean(And(True)(True)) === true);
  assert(toBoolean(And(True)(False)) === false);
  assert(toBoolean(And(False)(True)) === false);
  assert(toBoolean(And(False)(False)) === false);

  // Problema de la [página anterior](src/attempts/0004-8-test-results-draw-conclusions.ts) // a

  //   (x1 || !x2 || !x3)
  // && (!x1 || !x2 || !x3)
  // && (!x1 || x2 || !x3)
  // && (!x1 || !x2 || x3)
  // && (x1 || x2 || !x3)
  // && (x1 || !x2 || x3)
  // && (x1 || x2 || x3)
  // && (x1 || x2 || x2)
  // && (x1 || !x3 || !x3)
  // && (!x2 || !x3 || !x3)

  _3SAT(
    3,
    [
      ["x1", "not x2", "not x3"],
      ["not x1","not x2","not x3"],
      ["not x1", "x2", "not x3"],
      ["not x1", "not x2", "x3"],
      ["x1", "x2", "not x3"],
      ["x1", "not x2", "x3"],
      ["x1", "x2", "x3"],
      ["x1", "x2", "x2"],
      ["x1", "not x3", "not x3"],
      ["not x2", "not x3", "not x3"],
    ]
  );
}

main();
