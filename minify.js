const fs = require('fs');

let ctr;
const file = './dist/app.min.js', letters = 'opqrstuvwyxz';
const isFree = (letter, string) => !new RegExp(
  'function ' + letter + '\\(|function(?: [a-z0-9_]+)?\\((?:[a-z],)*?' + letter +
  '(?:,[a-z])*?\\)|var (?:[a-z][^,;]*?,)*?' + letter + '[^a-z:]'
).exec(string);
const put = string => {
  ctr = 0;
  return () => {
    ctr++;
    return string;
  };
};

function* safeVar(string) {
  for (let i = -1; i < letters.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      const letter = letters.charAt(i) + letters.charAt(j);
      if (isFree(letter, string))
        yield letter;
    }
  }
}

const rename = [
  'React.createElement',
  'Object.defineProperty',
  'Object.setPrototypeOf',
  'Object.getPrototypeOf',
  'Symbol.iterator',
  'Array.isArray',
  'Object.create',
  'Object'
];

fs.readFile(file, 'utf8', (_, js) => {
  js = js.replace(/throw new .*?Error\((["'].*?["'](\+.*?)?)+\)/g, put('throw null'));
  console.log('Removed', ctr, 'Error Throws');
  const generate = safeVar(js);
  rename.forEach((oldName, index) => {
    const newName = generate.next().value;
    js = `${newName}=${oldName}${index ? ',' : ';'}` + js.replace(new RegExp(oldName, 'g'), put(newName));
    console.log('Replaced', ctr, oldName);
  });
  fs.writeFile(file, js.trimEnd(), 'utf8', () => { });
});
