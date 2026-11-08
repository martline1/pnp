// Objetivo: O(n^12)

import assert from "node:assert";
import * as path from "node:path";

console.log(`Imported: ${path.basename(__filename)}`);

function main() {
  // Basándonos en los resultados de la tediosa y lenta [prueba manual](src/attempts/0004-8-test-expressions-count.md)
  // estos son los resultados de los conteos de expresiones:

  // - one                6 times
  // - one(False)(True)   0 times
  // - two                4 times
  // - two(False)(True)   4 times
  // - three              2 times
  // - three(False)(True) 2 times
  // - four               0 times
  // - four(False)(True)  4 times
  // - five               4 times
  // - five(False)(True)  2 times
  // - six                1 time
  // - six(False)(True)   2 times
  // - seven              4 times
  // - seven(False)(True) 0 times
  // - eight              4 times
  // - eight(False)(True) 0 times
  // - nine               0 times
  // - nine(False)(True)  2 times
  // - ten                0 times
  // - ten(False)(True)   4 times

  // My logic tells me that, si es cero, es irrelevante? mayor cantidad en positivos, significa que la variable es verdadera?
  // More negative, those that end with (False)(True), means the variable is false? Resultaods iguales, undetermined.

  // Resltados obtenidos with that reasoning:
  const one   = true;
  const two   = undefined;
  const three = undefined;
  const four  = false;
  const five  = true;
  const six   = false;
  const seven = true;
  const eight = true;
  const nine  = false;
  const ten   = false;

  // Problema:
  // (x1 | !x2 | x3)
  // & (!x4 | x5 | !x6)
  // & (x7 | x8 | !x9)
  // & (!x10 | x2 | !x5)
  // & (x1 | !x3 | x6)

  const expression =
    (one || !two || three)
    && (!four || five || !six)
    && (seven || eight || !nine)
    && (!ten || two || !five)
    && (one || !three || six);

  assert(expression);

  // I don't know what to think about this, I coudln't solve 2 out of the 10 variables
  // I provided undefined, which evaluates to false in js, yet it passes the assertion
  // But even if that is the case, maybe this is just a bad problem, I mean, if I change
  // de manera aleatoria, variables to different values, it still passess the assertion

  // I'm going to try with another problem, què tal el:

  // p cnf 3 10
  // 1 -2 -3 0
  // -1 -2 -3 0
  // -1 2 -3 0
  // -1 -2 3 0
  // 1 2 -3 0
  // 1 -2 3 0
  // 1 2 3 0
  // 1 2 0
  // 1 -3 0
  // -2 -3 0

//   (x1 ∨ ¬x2 ∨ ¬x3)
// ∧ (¬x1 ∨ ¬x2 ∨ ¬x3)
// ∧ (¬x1 ∨ x2 ∨ ¬x3)
// ∧ (¬x1 ∨ ¬x2 ∨ x3)
// ∧ (x1 ∨ x2 ∨ ¬x3)
// ∧ (x1 ∨ ¬x2 ∨ x3)
// ∧ (x1 ∨ x2 ∨ x3)
// ∧ (x1 ∨ x2 ∨ x2)
// ∧ (x1 ∨ ¬x3 ∨ ¬x3)
// ∧ (¬x2 ∨ ¬x3 ∨ ¬x3)

  // Según el gimini es una aguja en un pajar
}

main();
