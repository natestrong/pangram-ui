import {alphabetHashMap, getMissingLetters} from './index';

const THE_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

console.log(Object.keys(alphabetHashMap()).join('') === THE_ALPHABET);

console.log(getMissingLetters('A quick brown fox jumps over the lazy dog').length === 0);
console.log(getMissingLetters('abcdefghijklmnopqrstuvwxy')[0] === 'z');
console.log(getMissingLetters('A quick jumps over the lazy dog').join('') === 'bfnwx');
