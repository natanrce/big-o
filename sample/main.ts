import { code } from './code';
import { Analyzer } from '../lib/analyzer';

async function calculate() {
  const analyzer = new Analyzer(code, {
    syntax: 'typescript',
    script: true,
  });

  const bigO = await analyzer.process();
  console.log(bigO)
};
calculate();
