# Empiric Data

This is a set of results and the collection of Church Boolean's distribution and literal's order that solved these problems.

## Problem A, 4, 4

Se solucionó con Church Boolean's Distribution:

- `AND(AND()())(AND()())` - Simétrico
- `OR(OR()())()` - Left loaded

Orden de variables:
- Doesn't matter

```ts
assert.deepStrictEqual(
  _3SAT(4, [
    ["not x_1", "not x_1", "not x_1"],
    ["x_1", "not x_2", "not x_2"],
    ["x_2", "x_3", "x_3"],
    ["not x_3", "not x_4", "not x_4"]
  ]),
  {
    status: 'satisfiable',
    variables: {
      x_1: false,
      x_2: false,
      x_3: true,
      x_4: false
    }
  },
);
```

## Problem B, 4, 4

```ts
console.log(
  _3SAT(4, [
    ["not x_1", "x_2", "x_2"],
    ["not x_2", "not x_3", "not x_3"],
    ["x_3", "x_4", "x_4"],
    ["x_1", "x_1", "x_1"]
  ])
);
```