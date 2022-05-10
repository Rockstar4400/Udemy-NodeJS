const fs = require('fs')
const http = require('http');
const url = require('url');

//////////////////// ReadWrite ////////////////////////////////
// Bloking, synchronous way
// const textIn = fs.readFileSync('./input.txt', 'utf-8');
// //console.log(textIn);
// const textOut = `This is what we know: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./output.txt', textOut);
// console.log('File written');

// No-blocking, asynchrous way
// fs.readFile('./start.txt', 'utf-8', (err, data1)=> {
    
//     if(err) return console.log('ERROR!')

//     fs.readFile(`./${data1}.txt`, 'utf-8', (err, data2)=> {
//         console.log(data2);
//         fs.readFile(`./append.txt`, 'utf-8', (err, data3)=> {
//             console.log(data3);

//             fs.writeFile('./final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Written')
//             })
//         });
//     });
// });

// console.log('Will read file!');

//////////////////// Server ////////////////////////////////
const server = http.createServer((req, resp) => {
    //console.log(req.url);

    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview'){
        resp.end('This is the OVERVIEW');
    } else if (pathName === '/product'){
        resp.end('This is the PRODUCT');
    }else {
        resp.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        resp.end('<h1>Not found!</h1>');
    }
    //resp.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listen')
});