//assuming all names start with Capital if not a simple toUpperCase() would be used on name[0]
function getSortedList(royalnames) {
  //helper function to convert roman to numbers
  if (royalnames.length <= 1) return; //no point to continue
  function romanToNum(roman) {
    if (roman === "")           return 0;
    if (roman.startsWith("L"))  return 50 + romanToNum(roman.substr(1));
    if (roman.startsWith("XL")) return 40 + romanToNum(roman.substr(2));
    if (roman.startsWith("X"))  return 10 + romanToNum(roman.substr(1));
    if (roman.startsWith("IX")) return 9  + romanToNum(roman.substr(2));
    if (roman.startsWith("V"))  return 5  + romanToNum(roman.substr(1));
    if (roman.startsWith("IV")) return 4  + romanToNum(roman.substr(2));
    if (roman.startsWith("I"))  return 1  + romanToNum(roman.substr(1));
    return 0;
  }
  //split method inside helper returns roman numeral
  const sortedByAlph = royalnames.sort();

  let alphBuckets = {};
  for (let name of sortedByAlph) {
    if (!alphBuckets[name[0]]) { //access first letter and store it as its array
      alphBuckets[name[0]] = [name];
    } else {
      alphBuckets[name[0]].push(name);
    }
  }
  //https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order/38218582#38218582
  //Object.getOwnPropertyNames > Object.keys since the former guarantees order(explicitly stated)
  for (let startingAlph of Object.getOwnPropertyNames(alphBuckets)) {
    alphBuckets[startingAlph] = alphBuckets[startingAlph].sort((a,b) => {
      romanToNum(a.split(" ").slice(-1)[0]) - romanToNum(b.split(" ").slice(-1)[0]);
    })
  }
  //output at this point: { K: [ 'King I', 'King II', 'King III', 'King X' ], Q: [ 'Queen IX' ] }
  //finally join them together NOTE: Current Language Spec (since ES2015) Object insertion order is preserved, except in the case of keys that parse as integers (eg "7" or "99")
  //since we sorted first, the object will loop through in alphabetical order
  let finalResult = [];
  for (let startingAlph of Object.getOwnPropertyNames(alphBuckets)) {
    finalResult = finalResult.concat(alphBuckets[startingAlph]); //combines array
  }
  return finalResult;
}
//i am aware of the method where you can return everything in one line but for this case i feel breaking it up into different for loops is easier to understand and allows insertion of appropriate comments. It enhances readability.
//After each for loop a console.log statement can be inserted to check for correctness.

//In comparison one Can do this: Time complexity is the same O(N), space complexity is O(1) which is better than the solution i gave since i had to create a new object with the same number of elements in the arrayO(n)
/* 
return royalnames.map((n) => ({name: n, num: romanToNum(n.split(" ").pop())}))
.sort((a, b) => (a.num - b.num))
.map(({name, num}) => name)
*/

console.log(getSortedList(["King X","King I","King III", "King II", "Queen IX"]))