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

  const one   = False;
  const two   = False;
  const three = False;
  const four  = False;
  const five  = False;
  const six   = False;
  const seven = False;
  const eight = False;
  const nine  = False;
  const ten   = False;

  // Para este attempt, supondremos que lo siguiente es verdadero,
  // let's try to define the algorithm with this:

  // if var(var)         -> True
  // if var(False)(True) -> False

  // Problema:
  // (x1 | !x2 | x3) // a
  // & (!x4 | x5 | !x6)
  // & (x7 | x8 | !x9)
  // & (!x10 | x2 | !x5)
  // & (x1 | !x3 | x6)

  const firstClause  = Or(one)(Or(Not(two))(three));      // (x1 | !x2 | x3)
  const secondClause = Or(Not(four))(Or(five)(Not(six))); // (!x4 | x5 | !x6)
  const thirdClause  = Or(seven)(Or(eight)(Not(nine)));   // (x7 | x8 | !x9)
  const fourthClause = Or(Not(ten))(Or(two)(Not(five)));  // (!x10 | x2 | !x5)
  const fifthClause  = Or(one)(Or(Not(three))(six));      // (x1 | !x3 | x6)

  var finalExpression = And
    (firstClause)
    (And
      (secondClause)
      (And
        (thirdClause)
        (And
          (fourthClause)
          (fifthClause))));

  // Prácticamente estamos haciendo beta-reduction, pero no me gustaría llamarla así porque no llegamos hasta el final,
  // sino que deliberadamente llegamos hasta este punto para contar expresiones

  var finalExpression =
  (one
    (one)
    (two(False)(True)
      (two(False)(True))
      (three)))
    (
      (four(False)(True)
        (four(False)(True))
        (five
          (five)
          (six(False)(True))))
        (
          (seven
            (seven)
            (eight
              (eight)
              (nine(False)(True))))
            (
              (ten(False)(True)
                (ten(False)(True))
                (two
                  (two)
                  (five(False)(True))))
                (
                  one
                    (one)
                    (three(False)(True)
                      (three(False)(True))
                      (six))
                )
                (
                  ten(False)(True)
                    (ten(False)(True))
                    (two
                      (two)
                      (five(False)(True)))
                )
            )
            (
              seven
                (seven)
                (eight
                  (eight)
                  (nine(False)(True)))
            )
        )
        (
          four(False)(True)
            (four(False)(True))
            (five
              (five)
              (six(False)(True)))
        )
    )
    (
      one
        (one)
        (two(False)(True)
          (two(False)(True))
          (three))
    );
}

main();
