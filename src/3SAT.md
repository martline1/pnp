# (SAT)isfacibilidad Booleana

> ( _ or _ or _ ) and ( _ or _ or _ ) and ( _ or _ or _ ) ...

*_ quiere decir variable o variable negada e.g. "x" o "not x"*

Los "not", los "or", los "and" y la **posición de las variables** ya están
fijos en su lugar por el cliente (el problema).

**Encontrar los argumentos correctos para invocar esa función y que retorne True es el problema de 3SAT**

Puede haber:

- Variables repetidas dentro de la misma cláusula e.g. (x1 or x1 or not x2)
- Cláusulas repetidas varias veces en la fórmula general unidas por and. e.g. (x or x or x) and (x or x or x) ...
