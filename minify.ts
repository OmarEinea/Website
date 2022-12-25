import fs from 'fs';

let ctr = 0;
const file = './dist/app.min.js';
const letters = 'opqrstuvwyxz';
const isFree = (letter: string, text: string) => !new RegExp(
  'function ' + letter + '\\(|function(?: [a-z0-9_]+)?\\((?:[a-z],)*?' + letter +
  '(?:,[a-z])*?\\)|var (?:[a-z][^,;]*?,)*?' + letter + '[^a-z:]'
).exec(text);
const put = (text: string) => {
  ctr = 0;
  return () => {
    ctr++;
    return text;
  };
};

function* safeVar(text: string) {
  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      const letter = letters.charAt(i) + letters.charAt(j);
      if (isFree(letter, text))
        yield letter;
    }
  }
}

const replace = [
  // 'React.createElement',
  'Object.defineProperty',
  // 'Object.setPrototypeOf',
  // 'Object.create',
  // 'Object.getPrototypeOf',
  'Object',
  'Symbol.iterator',
  // 'Array.isArray',
];

const originalJs = fs.readFileSync(file, 'utf8');

let updatedJs = originalJs.replace(/throw new .*?Error\((["'].*?["'](\+.*?)?)+\)/g, put('throw null'));
console.log('Removed', ctr, 'Error Throws');
const generate = safeVar(updatedJs);
replace.forEach((oldName, index) => {
  const newName = generate.next().value;
  if (!newName) return;
  updatedJs = `${newName}=${oldName}${index ? ',' : ';'}` + updatedJs.replace(new RegExp(oldName, 'g'), put(newName));
  console.log('Replaced', ctr, oldName);
});

fs.writeFileSync(file, updatedJs.trimEnd(), 'utf8');