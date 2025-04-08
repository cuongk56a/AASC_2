const readline = require('readline')

function fib(n) {
  if (n === 0) return 0n
  let a = 0n,
    b = 1n
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b]
  }
  return b
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Nhập n: ', (input) => {
  let n = parseInt(input)
  console.time('fib')
  const result = fib(n)
  console.timeEnd('fib')
  console.log(`Fibonacci thứ ${n} là:`, result.toString())
  rl.close()
})
