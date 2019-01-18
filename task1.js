console.log('slave pid: ' + process.pid);
process.on('message', function (msg) {
  console.log(`[Slave]# starts calculating...`);
  const start = Date.now();
  const result = fibonacci(msg);
  console.log(`[Slave]# The result of task1 ${process.pid} is ${result}, taking ${Date.now() - start} ms.`);
  process.send({
    key: result,
    extra: 'hidding info',
  });
});

function fibonacci(n) {
  return n === 0 ?
    0 :
    n === 1 ?
    1 :
    fibonacci(n - 1) + fibonacci(n - 2)
}