/*
  Task 2
  Check two strings if they are anagrams of one another.
  Use object to count string letters. 
  Use cycle for-in to compare count of letters.

  // access to object props can be done via [] operator
  const letters = {};
  letters["a"] = 1;

  // if same letter is present again increase counter
  let letter = "b";
  letters[letter] += 1;
*/

const str1 = "olia";
const str2 = "liao";

if (str1.length !== str2.length) {
  console.log("Strings are not anagrams");
} else {
  const letters = {};

  for (const letter in str1) {
    letters[letter] = (letters[letter] || 0) + 1;
  }

  for (const letter in str2) {
    if (!letters[letter]) {
      console.log("Strings are not anagrams");
      break;
    }

    letters[letter]--;
    if (letters[letter] < 0) {
      console.log("Strings are not anagrams");
      break;
    }
  }

  console.log("Strings are anagrams");
}
