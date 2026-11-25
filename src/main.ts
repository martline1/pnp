import assert from "node:assert";

import { _3SAT } from "./attempts/0006-v1";

function main() {
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
  //   x1: { positiveVotes: 20, negativeVotes: 24 },
  //   x2: { positiveVotes: 14, negativeVotes: 16 },
  //   x3: { positiveVotes: 9, negativeVotes: 20 },
  //   x4: { positiveVotes: 6, negativeVotes: 6 }
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
  //   x1: { positiveVotes: 16, negativeVotes: 24 },
  //   x2: { positiveVotes: 16, negativeVotes: 12 },
  //   x3: { positiveVotes: 8, negativeVotes: 18 },
  //   x4: { positiveVotes: 5, negativeVotes: 6 }
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

main();
