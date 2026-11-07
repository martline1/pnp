// Objetivo: O(n^12)

import * as path from "node:path";

console.log(`Imported: ${path.basename(__filename)}`);

// @ts-ignore
const True  = x => y => x;
// @ts-ignore
const False = x => y => y;
// @ts-ignore
const Not = a => a(False)(True);

function main() {
  const result = Not(True);

  console.log({
    "result(true)(false)": result(true)(false),
  });
}

main();
