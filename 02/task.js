/*
  Task

  Read file with text (200-400 words).
  Write all words with odd number of letters in file out-odd.txt
  Write all words with even number of letters in file out-even.txt

  Implement different cases as separate small programs:
  1) use sync file read API
  2) use async file read API with callbacks (only callbacks)
  3) use async file read API with promises (use API that returns promises, all callbacks should be wrapped in promises if needed)
  4) use async file read API with async/await functions (use API that returns promises, only async/await should be used to interact with promises)
*/

const fs = require('fs');

/* 1) use sync file read API */ 
try {
  const textData = fs.readFileSync('text.txt', 'utf-8');

  const words = textData.split(/\s+/);
  const oddWords = words.filter(word => word.length % 2 !== 0);
  const evenWords = words.filter(word => word.length % 2 === 0);

  fs.writeFileSync('out-odd_1.txt', oddWords.join(' '), 'utf-8');
  console.log('out-odd_1.txt was written');
  
  fs.writeFileSync('out-even_1.txt', evenWords.join(' '), 'utf-8');
  console.log('out-even_1.txt was written');
} catch (err) {
  console.error(err);
}

/* 2) use async file read API with callbacks (only callbacks) */
fs.readFile('text.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const words = data.split(/\s+/);
  const oddWords = words.filter(word => word.length % 2 !== 0);
  const evenWords = words.filter(word => word.length % 2 === 0);

  fs.writeFile('out-odd_2.txt', oddWords.join(' '), 'utf-8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('out-odd_2.txt was written');
  });

  fs.writeFile('out-even_2.txt', evenWords.join(' '), 'utf-8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('out-even_2.txt was written');
  });
});

/* 3) use async file read API with promises (use API that returns promises, all callbacks should be wrapped in promises if needed) */
const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

const writeFile = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

readFile('text.txt')
  .then((data) => { 
    const words = data.split(/\s+/);
    const oddWords = words.filter(word => word.length % 2 !== 0);
    const evenWords = words.filter(word => word.length % 2 === 0);

    return Promise.all([
      writeFile('out-odd_3.txt', oddWords.join(' ')),
      writeFile('out-even_3.txt', evenWords.join(' '))
    ]);
  })
  .then(() => {
    console.log('out-odd_3.txt and out-even_3.txt were written');
  })
  .catch((err) => {
    console.error(err);
  });

/* 4) use async file read API with async/await functions (use API that returns promises, only async/await should be used to interact with promises) */
const main = async () => {
  try {
    const data = await readFile('text.txt');

    const words = data.split(/\s+/);
    const oddWords = words.filter(word => word.length % 2 !== 0);
    const evenWords = words.filter(word => word.length % 2 === 0);

    await Promise.all([
      writeFile('out-odd_4.txt', oddWords.join(' ')),
      writeFile('out-even_4.txt', evenWords.join(' '))
    ]);

    console.log('out-odd_4.txt and out-even_4.txt were written');
  } catch (err) {
    console.error(err);
  } 
}

main();