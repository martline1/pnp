a, b, c, d


(!a, !c, d) -> a:F, c:F, d:T
(b , !b, a) -> b:T, b:F, a:T <!-- l -->
(!d, d !a)  -> d:F, d:V, a:F
(c, a, !b)  -> c:T, a:T, b:F



(c, a, !b)  -> a:T, b:F,     c:T
(b , !b, a) -> a:T, b:T, b:F
(!a, !c, d) -> a:F,          c:F, d:T
(!d, d !a)  -> a:F,               d:F, d:T


a:T
b:T
c:F
d:F


() && () && () && ()

<!-- This approach didn't lead to anything -->
