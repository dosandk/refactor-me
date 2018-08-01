function riba (arr) {
  return arr.length === 2 || !arr.length ? null : arr[0];
}

function foo (arr) {
  return arr.length && arr.length !== 2 ? arr[0] : null;
}

console.assert(foo([1, 2]) === null, 'should return null');
console.assert(foo([1, 2, 3]) === 1, 'should return 1');
