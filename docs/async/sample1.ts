import { FuncA, FuncB, FuncC, FuncD, FuncE, FuncF } from './common';

const Answer1 = async () => {  
  const a = await FuncA();
  const b = await FuncB();
  const c = await FuncC();
  const d = await FuncD(a, b);
  const e = await FuncE(b, c);
  return await FuncF(d, e);
}

const Answer2 = async () => {
  const [a, b, c] = await Promise.all([FuncA(), FuncB(), FuncC()]); 
  const d = await FuncD(a, b);
  const e = await FuncE(b, c);
  return await FuncF(d, e);
}

const Answer3 = async () => {
  const [a, b, c] = await Promise.all([FuncA(), FuncB(), FuncC()]); 
  const [d, e] = await Promise.all([FuncD(a,b), FuncE(b,c)]);
  return await FuncF(d, e);
}

const Answer4 = async () => {
  const b = await FuncB();
  const [d, e] = await Promise.all([
    FuncA().then(a => FuncD(a, b)), 
    FuncC().then(c => FuncE(b, c))
  ]);
  return FuncF(d, e);
}

const Answer5 = async () => {
  const promiseA = FuncA();
  const promiseC = FuncC();
  const b = await FuncB();
  const [d, e] = await Promise.all([
    promiseA.then(a => FuncD(a, b)), 
    promiseC.then(c => FuncE(b, c))
  ]);
  return FuncF(d, e);
}

const timer = async (p: Promise<any>) => {
  const now = Date.now();
  const result = await p;
  return { time: Date.now() - now, ...result };
}

const main = async () => {
  console.log(await timer(Answer1()));
  console.log(await timer(Answer2()));
  console.log(await timer(Answer3()));
  console.log(await timer(Answer4()));
  console.log(await timer(Answer5()));
};

if (process.argv[1] === __filename) {
  main();
}
  