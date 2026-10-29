// (SAT)isfacibilidad Booleana

// ( _ or _ or _ ) and ( _ or _ or _ ) and ( _ or _ or _ ) ...

const problem = (x1: boolean, x2: boolean, x3: boolean, x4: boolean) =>
	(x1 || !x2 || x3) && (!x1 || x4 || !x3) && (x2 || !x4 || x1);

// Los not, los or, los and y la posición de las variables ya están
// fijos en su lugar por el cliente (el problema).
