function generateStrict3SATPigeonhole(pigeons) {
    const holes = pigeons - 1;
    const rawClauses = [];

    // Helper to map (pigeon, hole) to a unique variable ID
    const getVar = (p, h) => p * holes + h + 1;

    // 1. Build the original variable-length clauses
    for (let p = 0; p < pigeons; p++) {
        const clause = [];
        for (let h = 0; h < holes; h++) {
            clause.push(getVar(p, h));
        }
        rawClauses.push(clause);
    }

    for (let h = 0; h < holes; h++) {
        for (let p1 = 0; p1 < pigeons; p1++) {
            for (let p2 = p1 + 1; p2 < pigeons; p2++) {
                rawClauses.push([-getVar(p1, h), -getVar(p2, h)]);
            }
        }
    }

    // 2. Convert every clause into strict 3-literal clauses
    let nextVar = pigeons * holes + 1;
    const strict3Clauses = [];

    for (const c of rawClauses) {
        if (c.length === 3) {
            strict3Clauses.push(c);
        } else if (c.length === 2) {
            // Pad 2-literal clauses using a dummy variable (d) and (-d)
            const d = nextVar++;
            strict3Clauses.push([c[0], c[1], d]);
            strict3Clauses.push([c[0], c[1], -d]);
        } else if (c.length > 3) {
            // Chain long clauses using helper variables (Tseitin split)
            let prevHelper = nextVar++;
            strict3Clauses.push([c[0], c[1], prevHelper]);

            for (let i = 2; i < c.length - 2; i++) {
                const currHelper = nextVar++;
                strict3Clauses.push([-prevHelper, c[i], currHelper]);
                prevHelper = currHelper;
            }

            strict3Clauses.push([-prevHelper, c[c.length - 2], c[c.length - 1]]);
        }
    }

    // 3. Output in DIMACS CNF format
    const totalVars = nextVar - 1;
    console.log(`p cnf ${totalVars} ${strict3Clauses.length}`);
    for (const clause of strict3Clauses) {
        console.log(`${clause.join(' ')}`);
    }
}

// Try N = 15 (outputs 3,315 strict 3-literal clauses)
generateStrict3SATPigeonhole(15);
