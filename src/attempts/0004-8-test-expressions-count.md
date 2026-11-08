# Conteo de expresiones

Recordemos la regla que definí como supuesta verdad:

- `if var(var)         -> True`
- `if var(False)(True) -> False`

Expresiones:

- one                6 times
- one(False)(True)   0 times
- two                4 times
- two(False)(True)   4 times
- three              2 times
- three(False)(True) 2 times
- four               0 times
- four(False)(True)  4 times
- five               4 times
- five(False)(True)  2 times
- six                1 time
- six(False)(True)   2 times
- seven              4 times
- seven(False)(True) 0 times
- eight              4 times
- eight(False)(True) 0 times
- nine               0 times
- nine(False)(True)  2 times
- ten                0 times
- ten(False)(True)   4 times

```ts
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
```