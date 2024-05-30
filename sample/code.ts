export const code = `
  function add(a: number, b: number): number {
    return a + b;
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < i; j++) {
      for (let k = 0; k < j; k++) {
        console.log(k);
      }
    }
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < i; j++) {
      console.log(j);
    }
  }

  function fibonacci(n) {
    if (n <= 1) {
      return n;
    } else {
      return fibonacci.apply(n - 1) + fibonacci(n - 2);
    }
  }
`