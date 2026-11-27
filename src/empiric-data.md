# Empiric Data

This is a set of results and the collection of Church Boolean's distribution and literal's order that solved these problems.

## Problem A, 4, 4

Se solucionó con Church Boolean's Distribution:

- `And(And()())(And()())` - Simétrico
- `Or(Or()())()` - Left loaded AND
- `Or()(Or()())` - Right loaded it works on both left and right loaded distributions!

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

It's solved with Church Boolean's Distribution:
- `And()(And()(And()(And()())))` - Right loaded
- `OR()(OR()())` - Right loaded

```ts
assert.deepStrictEqual(
  _3SAT(4, [
    ["not x_1", "x_2", "x_2"],
    ["not x_2", "not x_3", "not x_3"],
    ["x_3", "x_4", "x_4"],
    ["x_1", "x_1", "x_1"]
  ]),
  {
    status: 'satisfiable',
    variables: { x_1: true, x_2: true, x_3: false, x_4: true },
  },
);
```

## Problem C, 4, 4

Distribution:
- `And()(And()(And()(And()())))` - Right loaded
- `Or(Or()())()` - Left loaded

```ts
assert.deepStrictEqual(
  _3SAT(4, [
    ["x_1", "x_3", "x_3"],
    ["not x_2", "not x_4", "not x_4"],
    ["x_2", "not x_3", "not x_3"],
    ["x_4", "x_4", "x_4"]
  ]),
  {
    status: 'satisfiable',
    variables: { x_1: true, x_3: false, x_2: false, x_4: true }
  },
);
```
