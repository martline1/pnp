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
var Or = x => y => x(x)(y); // m
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

  const one   = True;
  const two   = False;
  const three = True;
  const four  = False;
  const five  = False;

  const result = And
    (Or(Not(one))(Or(four)(Not(three))))
    (Or(Not(five))(Or(one)(Not(two))));

  console.log({ result: toBoolean(result) });


  // Let's start analyzing the first clause: (Or(Not(one))(Or(four)(Not(three))))

  (Or
    (Not(one))
    (Or
      (four)
      (Not(three))));

  // After evaluating "Or"

  Not(one)
    (Not(one))
    (four(four)(Not(three)));


  // After evaluating "Not"

  one(False)(True)
    (one(False)(True))
    (four(four)(three(False)(True)));

  // Now let's analyze the second clause: (Or(Not(five))(Or(one)(Not(two))))

  (Or
    (Not(five))
    (Or(one)(Not(two))));

  // After evaluating "Or"

  Not(five)
    (Not(five))
    (one(one)(Not(two)));

  // After evaluating "Not"

  five(False)(True)
    (five(False)(True))
    (one(one)(two(False)(True)));

  // Joining the two resolved clauses is:

  And
    (
      one(False)(True)
        (one(False)(True))
        (four(four)(three(False)(True)))
    )
    (
      five(False)(True)
        (five(False)(True))
        (one(one)(two(False)(True)))
    );

  // After evaluating "And"

  (one(False)(True)
        (one(False)(True))
        (four(four)(three(False)(True))))
    (
      five(False)(True)
        (five(False)(True))
        (one(one)(two(False)(True)))
    )
    (
      one(False)(True)
        (one(False)(True))
        (four(four)(three(False)(True)))
    );

  // I'm noticing many repetitions, let's count them:

  one(False)(True)   // 4 times _
  four(four)         // 2 times __
  five(False)(True)  // 2 times ___
  three(False)(True) // 2 times ____
  one(one)           // 1 time  _____
  two(False)(True)   // 1 time  ______

  // (_
  //       (_)
  //       (__(____)))
  //   (
  //     ___
  //       (___)
  //       (_____(______))
  //   )
  //   (
  //     _
  //       (_)
  //       (__(____))
  //   );
}

main();
