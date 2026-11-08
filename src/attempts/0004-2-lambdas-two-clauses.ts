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

  // Based on the repetitions of [before](src/attempts/0004-1-lambdas-two-clauses.ts)
  // We assign values to the variables if var(var) -> True, if var(False)(True) -> False ??
  // a

  const one   = False;
  const two   = False;
  const three = False;
  const four  = True;
  const five  = False;

  one(False)(True)   // !one   4 times _
  four(four)         // four   2 times __
  five(False)(True)  // !five  2 times ___
  three(False)(True) // !three 2 times ____
  one(one)           // one    1 time  _____
  two(False)(True)   // !two   1 time  ______

  const clauses = And
    (Or(Not(one))(Or(four)(Not(three))))
    (Or(Not(five))(Or(one)(Not(two))));

  // Well it works for this example, but I'm not sure if this could cover more complex scenarios
  // or if this is even proof of anything...

  // The following line runs successfully:
  assert(toBoolean(clauses) === true);
}

main();
