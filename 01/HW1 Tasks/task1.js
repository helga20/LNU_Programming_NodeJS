/*
  Task 1
  Calculate solutions for a quadratic equation (квадратне рівняння).
  Predict 3 cases - 2, 1, 0 solutions.

  const a = 2, b = 3, c = -5; // expected x1 = -2.5, x2 = 1
*/

const a = 2,
  b = 3,
  c = -5;

const D = Math.pow(b, 2) - 4 * a * c;

const x1 = (-b + Math.sqrt(D)) / (2 * a);
const x2 = (-b - Math.sqrt(D)) / (2 * a);

const x = -b / (2 * a);

if (D > 0) {
  console.log("2 solutions: x_1 = %s, x_2 = %s", x1, x2);
} else if (D === 0) {
  console.log("1 solution: x = %s", x);
} else {
  console.log("No solutions");
}
