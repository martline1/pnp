## Context

In computer science, the PIGEON problem in the complexity class PPP (Polynomial Pigeonhole Principle)—is the computational challenge of actually finding
a collision when the **Pigeonhole Principle guarantees one exists**.

While the classic Pigeonhole Principle proves that a solution is guaranteed, it gives you no shortcut to locate it

## The Core Concept

- **The Math Rule (Existence)**. If you put N + 1 pigeons into N holes, at least one hole must end up with at least two pigeons.
- **The Computational Problem (Search)**. Imagine a massive, black-box computer program (a circuit) that takes N + 1 possible inputs ("pigeons") and maps them to N possible outputs ("holes"). You know with 100% mathematical certainty that two different inputs produce the exact same output. Your goal is to find those two specific inputs.

# Why we need it to check the solution?

- Normally, standard NP problems ask a "Yes or No" question where the answer **might not even exist**.
- **The Pigeonhole problem is different because the answer ALWAYS exists and is only ONE**!

A ver, pensemos, necesitamos una máquina/función/algoritmo que genere automáticamente problemas de PIGEON problem que sigan el principio Polynomial Pigeonhole Principle
eso quiere decir que tengan N+1 pigeons y N holes, y que exista sí o sí una solución.

Let's do that en [pigeonProblemGenerator.ts](src/pigeons/pigeonProblemGenerator.ts)

Esta máquina nos permitirá crear problemas sumamente difíciles de resolver, pero que sí tienen una solución correcta,
si the [_3SAT](src/attempts/0006-v1.ts) solves it, we have proved that this algorithm works and that it works in tiempo lineal, voy a ser honesto, no sé de pruebas
matemáticas por lo que no sé escribir esto in LEAN, pero soy un ing de software, por lo que puedo hacerlo con typescript.

Now we need a translator that translates the `GeneratedPigeonProblem` en un problema de 3SAT, vamos a intentar hacer eso en [pigeonProblemTo3Sat.ts](src/pigeons/pigeonProblemTo3Sat.ts)
