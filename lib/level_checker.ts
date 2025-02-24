import type { Simu } from "tm_parser?init";

const _levelsNames = [
  "ZERO",
  "MOVE_L",
  "MOVE_R",
  "ZERO_2",
  "COPY_TO_MAIN",
  "COPY_TO_WORK",
  "ADD1",
  "SUB1",
  "NEG",
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
];

const primes = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
  239, 241, 251,
];

function length_syracuse(x: number, acc: number) {
  if (x == 1) return acc;
  else {
    if (x % 2 == 0) return length_syracuse(x / 2, acc + 1);
    else return length_syracuse(3 * x + 1, acc + 1);
  }
}

/**
 * Utility function to implement all level checks.
 * @param level Level to check
 * @param simu Simu object containing the code to run
 * @returns An object with a boolean if the check passed and logs
 */
export function checkLevel(
  level: string,
  simu: Simu,
): { passed: boolean; logs: string[] } {
  let is_ok = true;
  const logs = [];
  switch (level) {
    ////////////////////////////////// ZERO
    case "ZERO":
      {
        for (let i = 0; i < 256; ++i) {
          const input_main = new Uint8Array(
            (i >>> 0)
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c)),
          );
          const input_work = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
          simu.reset(input_main, input_work);

          // Run the machine
          try {
            simu.all_steps();
          } catch (e) {
            console.error(e);
          }

          // Verify test output
          const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
          if (!simu.verify_output(expected)) {
            is_ok = false;
            logs.push(
              `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
            );
          }
        }
      }
      break;
    ////////////////////////////////// MOVE_L
    case "MOVE_L":
      {
        // TODO: do something clean
      }
      break;
    ////////////////////////////////// MOVE_R
    case "MOVE_R":
      {
        // Test 0
        const input_main = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
        const input_work = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
        simu.reset(input_main, input_work);
        simu.all_steps();
        if (!simu.verify_output(input_main) || simu.head_pos_main() != 1) {
          is_ok = false;
          logs.push(
            `Tests failed, expected output: ${input_main.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
          );
        }
        // Test 1
        input_main[0] = 1;
        simu.reset(input_main, input_work);
        simu.all_steps();
        if (!simu.verify_output(input_main) || simu.head_pos_main() != 1) {
          is_ok = false;
          logs.push(
            `Tests failed, expected output: ${input_main.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
          );
        }
      }
      break;
    ////////////////////////////////// ZERO_2
    case "ZERO_2":
      {
        for (let i = 0; i < 256; ++i) {
          const input_main = new Uint8Array(
            (i >>> 0)
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c)),
          );
          for (let j = 0; j < 256; ++j) {
            const input_work = new Uint8Array(
              (j >>> 0)
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c)),
            );
            simu.reset(input_main, input_work);

            // Run the machine
            try {
              simu.all_steps();
            } catch (e) {
              console.error(e);
            }

            // Verify test output
            const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
            if (
              !simu.verify_output(expected) ||
              simu.get_work_tape() == expected
            ) {
              is_ok = false;
              logs.push(
                `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
              );
            }
          }
        }
      }
      break;
    ////////////////////////////////// COPY_TO_MAIN
    case "COPY_TO_MAIN":
      {
        for (let i = 0; i < 256; ++i) {
          const input_main = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1]);
          const input_work = new Uint8Array(
            (i >>> 0)
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([0, 0]),
          );
          simu.reset(input_main, input_work);

          // Run the machine
          try {
            simu.all_steps();
          } catch (e) {
            console.error(e);
          }

          // Verify test output
          const expected = new Uint8Array(
            (i >>> 0)
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([1, 1]),
          );
          if (
            !simu.verify_output(expected) ||
            simu.get_work_tape() != input_work
          ) {
            is_ok = false;
            logs.push(
              `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
            );
          }
        }
      }
      break;
    ////////////////////////////////// COPY_TO_WORK
    case "COPY_TO_WORK":
      {
        for (let i = 0; i < 256; ++i) {
          const input_main = new Uint8Array(
            (i >>> 0)
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([0, 0]),
          );
          const input_work = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1]);
          simu.reset(input_main, input_work);

          // Run the machine
          try {
            simu.all_steps();
          } catch (e) {
            console.error(e);
          }

          // Verify test output
          const expected = new Uint8Array(
            (i >>> 0)
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([1, 1]),
          );
          if (
            !simu.verify_output(input_main) ||
            simu.get_work_tape() != expected
          ) {
            is_ok = false;
            logs.push(
              `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
            );
          }
        }
      }
      break;
    ////////////////////////////////// ADD1
    case "ADD1":
      {
        for (let i = 0; i < 256; ++i) {
          const input_main = new Uint8Array(
            (i >>> 0)
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([0, 0]),
          );
          const input_work = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          simu.reset(input_main, input_work);

          // Run the machine
          try {
            simu.all_steps();
          } catch (e) {
            console.error(e);
          }

          // Verify test output
          const expected = new Uint8Array(
            ((i + 1) % 256 >>> 0)
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([0, 0]),
          );
          if (
            !simu.verify_output(expected) ||
            simu.get_work_tape() != input_work
          ) {
            is_ok = false;
            logs.push(
              `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
            );
          }
        }
      }
      break;
    ////////////////////////////////// SUB1
    case "SUB1":
      {
        for (let i = 0; i < 256; ++i) {
          const input_main = new Uint8Array(
            (i >>> 0)
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([0, 0]),
          );
          const input_work = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          simu.reset(input_main, input_work);

          // Run the machine
          try {
            simu.all_steps();
          } catch (e) {
            console.error(e);
          }

          // Verify test output
          const expected = new Uint8Array(
            ((i - 1) % 256 >>> 0)
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([0, 0]),
          );
          if (
            !simu.verify_output(expected) ||
            simu.get_work_tape() != input_work
          ) {
            is_ok = false;
            logs.push(
              `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
            );
          }
        }
      }
      break;
    ////////////////////////////////// NEG
    case "NEG":
      {
        for (let i = 0; i < 256; ++i) {
          const input_main = new Uint8Array(
            (i >>> 0)
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([0, 0]),
          );
          const input_work = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          simu.reset(input_main, input_work);

          // Run the machine
          try {
            simu.all_steps();
          } catch (e) {
            console.error(e);
          }

          // Verify test output
          const expected = new Uint8Array(
            i
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => 1 ^ parseInt(c))
              .concat([0, 0]),
          );
          for (let j = 7; j >= 0; --j) {
            if (expected[j] == 1) {
              expected[j] = 0;
            } else {
              expected[j] = 1;
              break;
            }
          }
          if (
            !simu.verify_output(expected) ||
            simu.get_work_tape() != input_work
          ) {
            is_ok = false;
            logs.push(
              `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
            );
          }
        }
      }
      break;
    ////////////////////////////////// ADD
    case "ADD":
      {
        for (let i = 0; i < 256; ++i) {
          for (let j = 0; j < 256; ++j) {
            const input_main = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat([0, 0, 0, 0, 0, 0, 0, 0]),
                ),
            );
            const input_work = new Uint8Array([
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0,
            ]);
            simu.reset(input_main, input_work);

            // Run the machine
            try {
              simu.all_steps();
            } catch (e) {
              console.error(e);
            }

            // Verify test output
            const expected = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat(
                      ((i + j) % 256)
                        .toString(2)
                        .padStart(8, "0")
                        .split("")
                        .map((c) => parseInt(c)),
                    ),
                ),
            );
            if (!simu.verify_output(expected)) {
              is_ok = false;
              logs.push(
                `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
              );
            }
          }
        }
      }
      break;
    ////////////////////////////////// SUB
    case "SUB":
      {
        for (let i = 0; i < 256; ++i) {
          for (let j = 0; j < 256; ++j) {
            const input_main = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat([0, 0, 0, 0, 0, 0, 0, 0]),
                ),
            );
            const input_work = new Uint8Array([
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0,
            ]);
            simu.reset(input_main, input_work);

            // Run the machine
            try {
              simu.all_steps();
            } catch (e) {
              console.error(e);
            }

            // Verify test output
            const expected = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat(
                      ((i - j) % 256)
                        .toString(2)
                        .padStart(8, "0")
                        .split("")
                        .map((c) => parseInt(c)),
                    ),
                ),
            );
            if (!simu.verify_output(expected)) {
              is_ok = false;
              logs.push(
                `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
              );
            }
          }
        }
      }
      break;
    ////////////////////////////////// MUL
    case "MUL":
      {
        for (let i = 0; i < 256; ++i) {
          for (let j = 0; j < 256; ++j) {
            const input_main = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat([0, 0, 0, 0, 0, 0, 0, 0]),
                ),
            );
            const input_work = new Uint8Array([
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0,
            ]);
            simu.reset(input_main, input_work);

            // Run the machine
            try {
              simu.all_steps();
            } catch (e) {
              console.error(e);
            }

            // Verify test output
            const expected = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat(
                      ((i * j) % 256)
                        .toString(2)
                        .padStart(8, "0")
                        .split("")
                        .map((c) => parseInt(c)),
                    ),
                ),
            );
            if (!simu.verify_output(expected)) {
              is_ok = false;
              logs.push(
                `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
              );
            }
          }
        }
      }
      break;
    ////////////////////////////////// MOD
    case "MOD":
      {
        for (let i = 0; i < 256; ++i) {
          for (let j = 0; j < 256; ++j) {
            const input_main = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat([0, 0, 0, 0, 0, 0, 0, 0]),
                ),
            );
            const input_work = new Uint8Array([
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0,
            ]);
            simu.reset(input_main, input_work);

            // Run the machine
            try {
              simu.all_steps();
            } catch (e) {
              console.error(e);
            }

            // Verify test output
            const expected = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat(
                      ((i % j) % 256)
                        .toString(2)
                        .padStart(8, "0")
                        .split("")
                        .map((c) => parseInt(c)),
                    ),
                ),
            );
            if (!simu.verify_output(expected)) {
              is_ok = false;
              logs.push(
                `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
              );
            }
          }
        }
      }
      break;
    ////////////////////////////////// DIV
    case "DIV":
      {
        // TODO: check divide by 0 case
        for (let i = 0; i < 256; ++i) {
          for (let j = 1; j < 256; ++j) {
            const input_main = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat([0, 0, 0, 0, 0, 0, 0, 0]),
                ),
            );
            const input_work = new Uint8Array([
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0,
            ]);
            simu.reset(input_main, input_work);

            // Run the machine
            try {
              simu.all_steps();
            } catch (e) {
              console.error(e);
            }

            // Verify test output
            const expected = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat(
                      ((i / j) % 256)
                        .toString(2)
                        .padStart(8, "0")
                        .split("")
                        .map((c) => parseInt(c)),
                    ),
                ),
            );
            if (!simu.verify_output(expected)) {
              is_ok = false;
              logs.push(
                `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
              );
            }
          }
        }
      }
      break;
    ////////////////////////////////// EXP
    case "EXP":
      {
        for (let i = 0; i < 256; ++i) {
          for (let j = 1; j < 256; ++j) {
            const input_main = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat([0, 0, 0, 0, 0, 0, 0, 0]),
                ),
            );
            const input_work = new Uint8Array([
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0,
            ]);
            simu.reset(input_main, input_work);

            // Run the machine
            try {
              simu.all_steps();
            } catch (e) {
              console.error(e);
            }

            // Verify test output
            const expected = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat(
                      (i ** j % 256)
                        .toString(2)
                        .padStart(8, "0")
                        .split("")
                        .map((c) => parseInt(c)),
                    ),
                ),
            );
            if (!simu.verify_output(expected)) {
              is_ok = false;
              logs.push(
                `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
              );
            }
          }
        }
      }
      break;
    ////////////////////////////////// GEQ
    case "GEQ":
      {
        for (let i = 0; i < 256; ++i) {
          for (let j = 1; j < 256; ++j) {
            const input_main = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat([0]),
                ),
            );
            const input_work = new Uint8Array([
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ]);
            simu.reset(input_main, input_work);

            // Run the machine
            try {
              simu.all_steps();
            } catch (e) {
              console.error(e);
            }

            // Verify test output
            const expected = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat([i >= j ? 1 : 0]),
                ),
            );
            if (!simu.verify_output(expected)) {
              is_ok = false;
              logs.push(
                `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
              );
            }
          }
        }
      }
      break;
    ////////////////////////////////// LEQ
    case "LEQ":
      {
        for (let i = 0; i < 256; ++i) {
          for (let j = 1; j < 256; ++j) {
            const input_main = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat([0]),
                ),
            );
            const input_work = new Uint8Array([
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ]);
            simu.reset(input_main, input_work);

            // Run the machine
            try {
              simu.all_steps();
            } catch (e) {
              console.error(e);
            }

            // Verify test output
            const expected = new Uint8Array(
              i
                .toString(2)
                .padStart(8, "0")
                .split("")
                .map((c) => parseInt(c))
                .concat(
                  j
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .map((c) => parseInt(c))
                    .concat([i <= j ? 1 : 0]),
                ),
            );
            if (!simu.verify_output(expected)) {
              is_ok = false;
              logs.push(
                `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
              );
            }
          }
        }
      }
      break;
    ////////////////////////////////// IS_PRIME
    case "IS_PRIME":
      {
        for (let i = 0; i < 256; ++i) {
          const input_main = new Uint8Array(
            i
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([0]),
          );
          const input_work = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ]);
          simu.reset(input_main, input_work);

          // Run the machine
          try {
            simu.all_steps();
          } catch (e) {
            console.error(e);
          }

          // Verify test output
          const expected = new Uint8Array(
            i
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([primes.includes(i) ? 1 : 0]),
          );
          if (!simu.verify_output(expected)) {
            is_ok = false;
            logs.push(
              `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
            );
          }
        }
      }
      break;
    ////////////////////////////////// LEN_SYRACUSE
    case "LEN_SYRACUSE":
      {
        for (let i = 0; i < 256; ++i) {
          const input_main = new Uint8Array(
            i
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat([0, 0, 0, 0, 0, 0, 0, 0]),
          );
          const input_work = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ]);
          simu.reset(input_main, input_work);

          // Run the machine
          try {
            simu.all_steps();
          } catch (e) {
            console.error(e);
          }

          // Verify test output
          const expected = new Uint8Array(
            i
              .toString(2)
              .padStart(8, "0")
              .split("")
              .map((c) => parseInt(c))
              .concat(
                (length_syracuse(i, 0) % 256)
                  .toString(2)
                  .padStart(8, "0")
                  .split("")
                  .map((c) => parseInt(c)),
              ),
          );
          if (!simu.verify_output(expected)) {
            is_ok = false;
            logs.push(
              `Tests failed, expected output: ${expected.toString()} on input ${input_main.toString()} but got ${simu.get_main_tape().toString()}`,
            );
          }
        }
      }
      break;

    default:
      return {
        passed: false,
        logs: [`CHECKER: Unknown level given as argument: ${level}`],
      };
  }

  return { passed: is_ok, logs: logs };
}
