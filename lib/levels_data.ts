import type { Data } from "./types";

const LevelsData: Data = {
  texts: {
    text0: {
      content: `## Presentation of the grammar of Turing machine

We will present the basics of the grammar chosen here to represent TM with the following example, encoding a TM that writes 01 on all input.

Here Our alphabet is \`{0, 1}\` and the head can move left (\`L\`), right (\`R\`) or can stay still (\`S\`).

\`\`\`
// We start by declaring the START State
START
// Then we declare a rule that reads any bit b and writes a 0 at that same spot,
// Then moves right (R) and goes to the state END to end the execution of the Turing Machine
| 0 -> (0, R), q1
| 1 -> (0, R), q1

q1
|1 -> (1, R), END
|0 -> (1, R), END
\`\`\`

On the above examples, the states are \`START\`, \`END\`, \`ERROR\` (those states always exist, by default) and \`q1\`.

After the declaration of a state, we specify the transitions out of this states, of the form \`read -> (write, move), next_state\``,
      tooltip: "Presentation of the grammar",
      from: undefined,
      to: "Tutorial",
    },
    text1: {
      content: `## Two tapes Turing machine

In the following levels, we will use two tapes: a main tape and a work tape (as it is well known that a machine with a finite number of tapes can be simulated by a TM with one tape in O(n**2); these models are equivalent). They are both assumed semi-infinite on the right.

Here is an example of a code that exchenge the first two bytes of the main and work tape:

\`\`\`
START
  |0, 1 -> (1, R), (0, R), q1
  |1, 0 -> (0, R), (1, R), q1
  |a, b -> (a, R), (a, R), q1
q1
  |0, 1 -> (1, R), (0, R), END
  |1, 0 -> (0, R), (1, R), END
  |a, b -> (a, R), (a, R), END
\`\`\`

here we juste duplicate the actions on the tapes (read, write, move): the first one is for the main tape and the second one for the work tape.`,
      tooltip: "Introduction of 2 tapes",
      from: "Tutorial",
      to: "Tapes",
    },
    text2: {
      content: `## Adding function call

Now we will extend our grammar, by adding functions (\`MOVE_L\`, \`MOVE_R\`, \`WRITE\`).

The general idea of functions here is that we re-use the TM defined in the above levels.

Calling a function is equivalent to "branch" the TM defined in a previous level in out TM. We can branch sevral TM by merging the \`END\` state of one with the \`START\` state of another one.

It enable us to write TM like this (a transition is either a basic transition, or a sequence a function, ie of TM):

\`\`\`
START
  | 0 -> (1, S), q
  | 1 -> (0, S), q
q
  |_ -> [MOVE_R(8), WRITE_M(255), MOVE_L(8)], END
\`\`\`

For now we have three functions: \`MOVE_L(n)\` moves to the left n times, \`MOVE_R(n)\` moves to the right n times, \`WRITE(n)\` writes n, considered as a byte (write on 8 cells).`,
      tooltip: "Presentation of functions",
      from: "Tutorial",
      to: "Basics",
    },
    text3: {
      content: `## Working on bytes

Until now, we worked bit per bit, but we can work byte per byte (it is equivalent to extend our alphabet: we read 8 cell at once and then decide which transition to perform: as we read a constant number of cell at each time, this model is equivalent to the previous one).

We will be working on two tapes, and we will have access to the bitwise functions defined in the previous levels. This way, we sill have the expressivity of the previous levels throught these funtions, but we also abstract to have more powerfull expressions.

Here, the work tape can be used to perform operations. At the beggening on the level, the content of the work tape is arbitrary (\`_\`).

Here we will have two types of funtions:
- the functions named \`FCT_M\` or \`FCT_W\` which respectively acts on the main tape and work tape in place
- the functions named \`FCT\` which read its argument on the main tape, computes using the work tape, and write the result on the main tape. As these functions uses the work tape, after calling them, the content of the work tape on the right of the initial position of the head will be corrupted, so keep that in mind. Moreover, the result of the funtion will be written after the arguments, so this cell will be changed. And the cell after could be corrupted, so put your arguments at the end of the main tape before calling a function.

Here, the main tape must not be used for computation in order not to corrupt it. The main tape is only here to store the arguments of the funtions and the result they return. The main tape and the work tape can be seen as the stack and the head in a real computer.

Here is a simple example of the new syntax:
\`\`\`
START
  |a, _ -> [MOVE_BYTE_M(2), WRITE_M(a), MOVE_BYTE_M(-1)], q
q
  |b, _ -> [MOVE_BYTE_M(1), ADD1_M(b), MOVE_BYTE_M(-2)], END
\`\`\`
It is very similar to the syntax in the previous levels, it is a "merge" of the two syntaxes of the levels above. The main difference is that now the matching is extended on bytes, ie on \`0..255\``,
      tooltip: "Presentation of matching on one byte",
      from: "Tapes",
      to: "Medium",
    },
    text4: {
      content: `## Working on bytes

Until now, we worked bit per bit, but we can work byte per byte (it is equivalent to extend our alphabet: we read 8 cell at once and then decide which transition to perform: as we read a constant number of cell at each time, this model is equivalent to the previous one).

We will be working on two tapes, and we will have access to the bitwise functions defined in the previous levels. This way, we sill have the expressivity of the previous levels throught these funtions, but we also abstract to have more powerfull expressions.

Here, the work tape can be used to perform operations. At the beggening on the level, the content of the work tape is arbitrary (\`_\`).

Here we will have two types of funtions:
- the functions named \`FCT_M\` or \`FCT_W\` which respectively acts on the main tape and work tape in place
- the functions named \`FCT\` which read its argument on the main tape, computes using the work tape, and write the result on the main tape. As these functions uses the work tape, after calling them, the content of the work tape on the right of the initial position of the head will be corrupted, so keep that in mind. Moreover, the result of the funtion will be written after the arguments, so this cell will be changed. And the cell after could be corrupted, so put your arguments at the end of the main tape before calling a function.

Here, the main tape must not be used for computation in order not to corrupt it. The main tape is only here to store the arguments of the funtions and the result they return. The main tape and the work tape can be seen as the stack and the head in a real computer.

Here is a simple example of the new syntax:
\`\`\`
START
  |a, _ -> [MOVE_BYTE_M(2), WRITE_M(a), MOVE_BYTE_M(-1)], q
q
  |b, _ -> [MOVE_BYTE_M(1), ADD1_M(b), MOVE_BYTE_M(-2)], END
\`\`\`
It is very similar to the syntax in the previous levels, it is a "merge" of the two syntaxes of the levels above. The main difference is that now the matching is extended on bytes, ie on \`0..255\``,
      tooltip: "Presentation of matching on one byte",
      from: "Basics",
      to: "Medium",
    },
  },

  groups: {
    Tutorial: {
      label: "Tutorial",
      levels: ["ZERO", "MOVE_L", "MOVE_R"],
      grammar_version: 0,
      requires: [],
    },
    Tapes: {
      label: "Working with 2 tapes",
      levels: ["ZERO_2", "COPY_TO_MAIN", "COPY_TO_WORK"],
      grammar_version: 1,
      requires: ["text1"],
    },
    Basics: {
      label: "Basic Operations",
      levels: ["ADD1", "SUB1", "NEG"],
      grammar_version: 0,
      requires: ["text2"],
    },
    Medium: {
      label: "More Operations",
      levels: [
        "ADD",
        "SUB",
        "MUL",
        "MOD",
        "DIV",
        "EXP",
        "GEQ",
        "LEQ",
        "IS_PRIME",
        "LEN_SYRACUSE",
      ],
      grammar_version: 2,
      requires: ["text3", "text4"],
    },
  },

  levels: {
    ZERO: {
      tooltip: "Writing a 0 on the tape",
      description:
        "An example Turing Machine (TM) to get you started. By default, in the code editor you have a TM that writes 0 on one bit and moves right. We would rather want to write 0 on a whole byte and return in our initial position (for the head). Add states and/or state rules to perform this",
      initial_code:
        "// We start by declaring the START State\nSTART\n// Then we declare a rule that reads any bit b and writes a 0 at that same spot,\n// Then moves right (R) and goes to the state END to end the execution of the Turing Machine\n| 0 -> (0, R), END\n| 1 -> (0, R), END\n",
      in: "*: an arbitrary byte",
      out: "0: a byte with value 0",
      constraints:
        "no overflow allowed, at the end the cursor must return to its initial position",
      ex_in: ".10101010",
      ex_out: ".00000000",
      requires: [],
      unlocks0: ["WRITE"],
      unlocks: ["WRITE_M", "WRITE_W"],
    },
    MOVE_R: {
      tooltip: "Moving head Right",
      description:
        "Write a TM that only moves right and does not modify anything on the tape.",
      initial_code:
        "// Declaring a state:\n// START\n// | read_char -> (written_char, head_move), target_state\n",
      in: "*: an arbitrary byte",
      out: "*: the same byte (unchanged)",
      constraints:
        "no overflow allowed, at the end the cursor must has been moved to the right",
      ex_in: ".00000000",
      ex_out: "0.0000000",
      requires: ["ZERO"],
      unlocks0: ["MOVE_R"],
      unlocks: ["MOVE_R_M", "MOVE_R_W"],
    },
    MOVE_L: {
      tooltip: "Moving head Left",
      description:
        "Write a TM that only moves left and does not modify anything on the tape.",
      initial_code:
        "// Declaring a state:\n// START\n// | read_char -> (written_char, head_move), target_state\n",
      in: "*: an arbitrary byte",
      out: "*: the same byte (unchanged)",
      constraints:
        "no overflow allowed, at the end the cursor must has been moved to the left",
      ex_in: "0000.0000",
      ex_out: "000.00000",
      requires: ["ZERO"],
      unlocks0: ["MOVE_L"],
      unlocks: ["MOVE_L_M", "MOVE_L_W"],
    },
    ZERO_2: {
      tooltip: "Reading and writing with 2 tapes",
      description:
        "Write 0 on both tapes and return the head at its initial position.",
      initial_code: "",
      in: "*, *: two arbitrary bytes",
      out: "0, 0",
      constraints:
        "no overflow allowed, at the end the head must return at its initial position",
      ex_in: "1010101010101010",
      ex_out: "0000000000000000",
      requires: [],
      unlocks0: [],
      unlocks: [],
    },
    COPY_TO_MAIN: {
      tooltip: "Copy to the Main tape",
      description:
        "Copy the content (one byte) of the Working tape to the Main tape.",
      initial_code: "",
      in: "*, b: two arbitrary bytes",
      out: "b, b",
      constraints:
        "no overflow allowed, at the end the head must return at its initial position",
      ex_in: "0000000011100010",
      ex_out: "1110001011100010",
      requires: ["ZERO_2"],
      unlocks0: [],
      unlocks: [],
    },
    COPY_TO_WORK: {
      tooltip: "Copy to the Work tape",
      description: "Copy the content of the Main tape to the Working tape.",
      initial_code: "",
      in: "b, *: two arbitrary bytes",
      out: "b, b",
      constraints:
        "no overflow allowed, at the end the head must return at its initial position",
      ex_in: "1110001000000000",
      ex_out: "1110001011100010",
      requires: ["ZERO_2"],
      unlocks0: [],
      unlocks: [],
    },
    ADD1: {
      tooltip: "Adding 1 to an input modulo 256",
      description:
        "Add 1 to a number written in binary form (modulo 256).\n\nHere, we use the big-endian convention, meaning that the strong bits are the one at the left of a byte, while the least significant byte will be at the right.\n\nSo here, 0|0|0|0|0|0|0|1 represents 1 while 1|0|0|0|0|0|0|0 represents 128.",
      initial_code: "",
      in: "b: number between 0 and 255 in binary form",
      out: "b+1: mod 256",
      constraints:
        "no overflow allowed, at the end the head must return at its initial position",
      ex_in: ".00001011",
      ex_out: ".00001100",
      requires: [],
      unlocks0: ["ADD1"],
      unlocks: ["ADD1_M", "ADD1_W"],
    },
    SUB1: {
      tooltip: "Subtracting 1 to an input modulo 256",
      description:
        "Subtract 1 from a number written in binary form (modulo 256).\n\nHere, we use the big-endian convention, meaning that the strong bits are the one at the left of a byte, while the least significant byte will be at the right.\n\nSo here, 0|0|0|0|0|0|0|1 represents 1 while 1|0|0|0|0|0|0|0 represents 128.",
      initial_code: "",
      in: "b: number between 0 and 255 in binary form",
      out: "b-1: mod 256",
      constraints:
        "no overflow allowed, at the end the head must return at its initial position",
      ex_in: ".00010100",
      ex_out: ".00010011",
      requires: [],
      unlocks0: ["SUB1"],
      unlocks: ["SUB1_M", "SUB1_W"],
    },
    NEG: {
      tooltip: "Negating an input: -x",
      description:
        "Negate a binary number (Two's complement: -a is represented by NOT(a) + 1, where NOT is the bitwise operator) in place.\n\nHere, we use the big-endian convention, meaning that the strong bits are the one at the left of a byte, while the least significant byte will be at the right.\n\nSo here, 0|0|0|0|0|0|0|1 represents 1 while 1|0|0|0|0|0|0|0 represents 128.",
      initial_code: "",
      in: "b: number between -128 and 127 in binary form",
      out: "-b: mod 256 (Two's complement)",
      constraints:
        "no overflow allowed, at the end the head must return at its initial position",
      ex_in: ".00000010",
      ex_out: ".11111110",
      requires: ["ADD1"],
      unlocks0: ["NEG"],
      unlocks: ["NEG_M", "NEG_W"],
    },
    ADD: {
      tooltip: "Adding two numbers",
      description: "Adding two numbers written in binary form (modulo 256).",
      initial_code: "",
      in: "b1|b2|*: numbers between 0 and 255 in binary form (on main tape, and working tape is arbitrary)",
      out: "b1|b2|(b1+b2 mod 256)",
      constraints:
        "overflow only allowed on the right, at the end the head must return at its initial position",
      ex_in: [3, 4, 11],
      ex_out: [3, 4, 7],
      requires: [],
      unlocks: ["ADD"],
    },
    SUB: {
      tooltip: "Subtracting two numbers",
      description:
        "Subtracting two numbers written in binary form (modulo 256).",
      initial_code: "",
      in: "b1|b2|*: numbers between 0 and 255 in binary form (on main tape, and working tape is arbitrary)",
      out: "b1|b2|(b1-b2 mod 256)",
      constraints:
        "overflow only allowed on the right, at the end the head must return at its initial position",
      ex_in: [45, 26, 3],
      ex_out: [45, 26, 19],
      requires: [],
      unlocks: ["SUB"],
    },
    GEQ: {
      tooltip: "Comparing two integers",
      description:
        "Compare two integers written in binary form and write the boolean result.",
      initial_code: "",
      in: "b1|b2|*: numbers between 0 and 255 in binary form (on main tape, and working tape is arbitrary)",
      out: "b1|b2|1 if b1 >= b2 and b1|b2|0 otherwise",
      constraints:
        "overflow only allowed on the right, at the end the head must return at its initial position",
      ex_in: [5, 4, 36],
      ex_out: [5, 4, 1],
      requires: [],
      unlocks: ["GEQ"],
    },
    LEQ: {
      tooltip: "Comparing two integers",
      description:
        "Compare two integers written in binary form and write the boolean result.",
      initial_code: "",
      in: "b1|b2|*: numbers between 0 and 255 in binary form (on main tape, and working tape is arbitrary)",
      out: "b1|b2|1 if b1 <= b2 and b1|b2|0 otherwise",
      constraints:
        "overflow only allowed on the right, at the end the head must return at its initial position",
      ex_in: [5, 4, 36],
      ex_out: [5, 4, "0"], //the "0" is intentional, otherwise js does its thing...
      requires: [],
      unlocks: ["LEQ"],
    },
    MUL: {
      tooltip: "Multiplying two integers",
      description: "Multiply two integers written in binary form (modulo 256).",
      initial_code: "",
      in: "b1|b2|*: numbers between 0 and 255 in binary form",
      out: "b1|b2|(b1*b2 mod 256)",
      constraints:
        "overflow only allowed on the right, at the end the head must return at its initial position",
      ex_in: [5, 7],
      ex_out: [5, 7, 35],
      requires: ["ADD"],
      unlocks: ["MUL"],
    },
    MOD: {
      tooltip: "Compute the modulo of two integers",
      description:
        "Compute the modulo of two (non-negative) integers written in binary form.\n\nReturn an error if the second integer is null.",
      initial_code: "",
      in: "b1|b2|*: numbers between 0 and 255 in binary form",
      out: "b1|b2|(b1%b2) where % is the modulo operator",
      constraints:
        "overflow only allowed on the right, at the end the head must return at its initial position",
      ex_in: [34, 5],
      ex_out: [34, 5, 4],
      requires: ["LEQ", "GEQ", "SUB"],
      unlocks: ["MOD"],
    },
    DIV: {
      tooltip: "Integer division",
      description:
        "Divide two (non-negative) integers written in binary form (euclidian division).\n\nReturn an error if the second integer is null.",
      initial_code: "",
      in: "b1|b2|*: numbers between 0 and 255 in binary form",
      out: "b1|b2|(b1/b2) where / is the euclidian division",
      constraints:
        "overflow only allowed on the right, at the end the head must return at its initial position",
      ex_in: [34, 5],
      ex_out: [34, 5, 6],
      requires: ["LEQ", "GEQ", "SUB"],
      unlocks: ["DIV"],
    },
    EXP: {
      tooltip: "Compute the power of an integer",
      description: "Given two integers a and b compute a^b (modulo 256).",
      initial_code: "",
      in: "b1|b2|*: numbers between 0 and 255 in binary form",
      out: "b1|b2|(b1^b2 mod 256)",
      constraints:
        "overflow only allowed on the right, at the end the head must return at its initial position",
      ex_in: [3, 4],
      ex_out: [3, 4, 81],
      requires: ["MUL"],
      unlocks: ["EXP"],
    },
    IS_PRIME: {
      tooltip: "Deciding wheather an integer is prime or not",
      description:
        "Given a (positive) integer, decide wheather this integer is prime or not.",
      initial_code: "",
      in: "b|*: integer between 1 and 255 in binary form",
      out: "b|1 if b is prime, b|0 otherwise",
      constraints:
        "overflow only allowed on the right, at the end the head must return at its initial position",
      ex_in: [121],
      ex_out: [121, 0],
      requires: ["MOD"],
      unlocks: [],
    },
    LEN_SYRACUSE: {
      tooltip: "Computing the time length of a syracuse sequence",
      description:
        "Given a starting point b, the goal id to find the smallest n (modulo 256) such that the nth term of the syracuse sequence beginning at b is equal to 1.\n\nRecall u_0 = b and u_{n+1} = u_n/2 if u_n is even and 3*u_n+1 if u_n odd.",
      initial_code: "",
      in: "b|*: integer between 0 and 255 in binary form",
      out: "b|n where n is the smallest integer such that syracuse(b, n) = 1",
      constraints:
        "overflow only allowed on the right, at the end the head must return at its initial position",
      ex_in: [4],
      ex_out: [4, 2],
      requires: ["MUL", "MOD", "DIV"],
      unlocks: [],
    },
  },
};

export { LevelsData };
