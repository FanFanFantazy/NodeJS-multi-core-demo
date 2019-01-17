const cluster = require('cluster')
const numCPUs = require('os').cpus().length
var fork = require('child_process').fork;

if (cluster.isMaster) {
  const seqArr = [40, 41, 42, 43]
  let endTaskNum = 0
  const slaves = [];
  console.time('main')
  console.log(`[Master]# Master starts running. pid: ${process.pid}`)
  for (let i = 0; i < numCPUs; i++) {
    slaves[i] = fork('./slave.js')
    slaves[i].send(seqArr[i]);
    slaves[i].on('exit', () => console.log(`Slave ${slaves[i].pid} is dead`));
    slaves[i].on('message', function (message) {
      console.log(`[Master]# Slave ${slaves[i].pid} got ${message.key}!`);
      endTaskNum++;
      if (endTaskNum === numCPUs) {
        slaves.forEach(element => {
          element.disconnect();
        });
        console.timeEnd('main');
      }
    });
  }
}