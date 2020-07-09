const { readFile } = require('fs').promises
const { join } = require('path');
const fetch = require('node-fetch');

const root = './not-public/';

module.exports = async (request, response) => {
  const { path } = request.query;
  const host = request.headers['x-forwarded-host'];
  const proto = request.headers['x-forwarded-proto'];

  console.log(path)
  console.log(request.headers)
  // Vercel doesn't support streaming so right now just read into the buffer.
  try {
    const file = await readFile(join(__dirname, root, path), 'utf8');
    let regexp = /<!--#include(.+)-->/g;
    let index = 0;
    while ((match = regexp.exec(file)) !== null) {
      const matchIndex = match.index;
      response.write(file.slice(index, matchIndex));
      index = matchIndex;

      const params = match[1].match(/(file|virtual)="(.+?)"/);
      if (params && params.length > 0) {
        const type = params[1];
        const value = params[2];
        if (type === 'file') {
          response.write(await readFile(join(__dirname, value), 'utf8'));
        } else if (type === 'virtual') {
          // fetch.
          const fetchResponse = await fetch(new URL(value, `${proto}://${host}`));
          response.write(await fetchResponse.text(), 'utf8');
        } else {
          // Some error of sorts.
          console.log('#include is not valid');
        }
      }
    }
    // Write to the end.
    response.write(file.slice(index));
  } catch (ex) {
    response.write('404');
    response.write(ex.toString());
  }
  response.end();
};