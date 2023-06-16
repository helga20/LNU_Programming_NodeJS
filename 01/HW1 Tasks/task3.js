/*
  Task 3
  Sort array via quick sort algorithm.
  const arr = [25, 4, 18, 14, 2, 9];
*/

function quickSort(myArr) {
  if (myArr.length <= 1) {
    return myArr;
  } else {
    var left = [];
    var right = [];
    var newArray = [];
    var pointer = myArr.pop();
    var length = myArr.length;

    for (var i = 0; i < length; i++) {
      if (myArr[i] <= pointer) {
        left.push(myArr[i]);
      } else {
        right.push(myArr[i]);
      }
    }

    return newArray.concat(quickSort(left), pointer, quickSort(right));
  }
}

const arr = [25, 4, 18, 14, 2, 9];

console.log("Before sorting: %s ", arr);
var sortedArr = quickSort(arr);
console.log("After sorting: %s", sortedArr);
