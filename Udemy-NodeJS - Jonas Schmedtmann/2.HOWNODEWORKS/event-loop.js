const fs = require('fs');
const cryto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log('Timer 1 Finished'), 0);
setImmediate(() => console.log('Immediate 1 Finished'));

fs.readFile('text-file.txt', () => {
    console.log('I/O Finished');
    console.log('------------------')

    setTimeout(() => console.log('Timer 2 Finished'), 0);
    setTimeout(() => console.log('Timer 3 Finished'), 3000);
    setImmediate(() => console.log('Immediate 2 Finished'));

    process.nextTick(() => console.log('Process.nextTick'));

    cryto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted')
    })

    cryto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted')
    })

    cryto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted')
    })

    cryto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted')
    })
})

console.log('Hello from the top-level code');