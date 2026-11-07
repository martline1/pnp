// Objetivo: O(n^k)

// Si conseguimos O(n^1234) sería un logro, pero no sería tan útil
// Si conseguimos O(n^12) el resto de ings y matemáticos lo pueden ir optimizando poco a poco, este es el ideal

// Objetivo: O(n^12)

import * as path from "node:path";

console.log(`Imported: ${path.basename(__filename)}`);

/**
 * @example
 * ```ts
 * _3SAT(
 *   3,
 *   [
 *     ["not a", "b", "c"],
 *     ["b", "not c", "not a"],
 *     ["not c", "not b", "a"]
 *   ]
 * );
 * ```
 */
export const _3SAT = (varsAmount: number, expressions: [string, string, string][]) => {
  if (!Number.isSafeInteger(varsAmount) || varsAmount <= 0) {
    throw new Error("Invalid number of variables, must be a positive safe integer greater than 0");
  }
  if (!Array.isArray(expressions) || expressions.length <= 0) {
    throw new Error("Invalid number of expressions, must be a valid array with length greater than 0");
  }

  const variables = new Set<string>();

  // Si en algún punto observo que hay más variables que las que debería, throw

  // Si en algún punto observo que cada expresión no tiene 3 variables, throw
};

_3SAT(
  3,
  [
    ["not a", "b", "c"],
    ["b", "not c", "not a"],
    ["not c", "not b", "a"],
    ["not a", "a", "not c"]
  ]
);
