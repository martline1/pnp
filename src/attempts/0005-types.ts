export type ChurchBoolean = (x: any) => (y: any) => ChurchBoolean;

// =======================================================
// Church boolean expressions to test type implementation:
// =======================================================

const True: ChurchBoolean  = x => y => x;
const False: ChurchBoolean = x => y => y;
const Not = (a: ChurchBoolean) => a(False)(True);

var Or  = (x: ChurchBoolean) => (y: ChurchBoolean) => x(x)(y);
var And = (x: ChurchBoolean) => (y: ChurchBoolean) => x(y)(x);

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

const firstClause  = Or(one)(Or(Not(two))(three));      // (x1 | !x2 | x3)
const secondClause = Or(Not(four))(Or(five)(Not(six))); // (!x4 | x5 | !x6)
const thirdClause  = Or(seven)(Or(eight)(Not(nine)));   // (x7 | x8 | !x9)
const fourthClause = Or(Not(ten))(Or(two)(Not(five)));  // (!x10 | x2 | !x5)
const fifthClause  = Or(one)(Or(Not(three))(six));      // (x1 | !x3 | x6)

And
  (firstClause)
  (And
    (secondClause)
    (And
      (thirdClause)
      (And
        (fourthClause)
        (fifthClause))));