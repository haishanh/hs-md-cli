'use strict';

const prog = require('commander');

const fs = require('fs');
const unified = require('unified');
const createStream = require('unified-stream');
const parse = require('remark-parse');
const tocPlug = require('remark-toc');
const html = require('remark-html');
const stringify = require('remark-stringify');
const styleGuide = require('remark-preset-lint-markdown-style-guide');

prog.version('0.0.1', '-v, --version');

prog
  .command('toc')
  .description('insert TOC for markdown')
  .option('-i, --input <file>', 'Input file, default stdin')
  .option('-o, --output <file>', 'Output file, default stdout')
  .action(toc);

prog
  .command('render')
  .description('render markdown')
  .option('-i, --input <file>', 'Input file, default stdin')
  .option('-o, --output <file>', 'Output file, default stdout')
  .action(render);

// type Options = { input?: string, output?: string }
// type Action = (cmd: Options) => {}

prog.parse(process.argv);

/////////////

function toc({ input, output }) {
  const rs = input ? fs.createReadStream(input) : process.stdin;
  const ws = output ? fs.createWriteStream(output) : process.stdout;

  const processor = unified()
    .use(parse)
    .use(styleGuide)
    .use(tocPlug)
    .use(stringify);
  rs.pipe(createStream(processor)).pipe(ws);
}

function render({ input, output }) {
  const rs = input ? fs.createReadStream(input) : process.stdin;
  const ws = output ? fs.createWriteStream(output) : process.stdout;

  const processor = unified()
    .use(parse)
    .use(html);
  rs.pipe(createStream(processor)).pipe(ws);
}
