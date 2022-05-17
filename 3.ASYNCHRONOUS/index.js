const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if(err) reject('Not found file')
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) =>{
    fs.writeFile(file, data, err => {
      if(err) reject('Could not write')
      resolve('success');
    })
  });
}

const getDocPic = async () => {
  try{

  const data = await readFilePro(`${__dirname}/dog.txt`);
  console.log(`Breed: ${data}`);

  const res1Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  const res2Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  const res3Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

  const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
  const imgs = all.map(el => el.body.message)

  await writeFilePro("dog-img.txt", imgs.join('\n'));
  console.log('Saved file')
  }
  catch(err){
    console.log(err);
    throw(err)
  }
  return '2'
};
(async () => {
  try{
    console.log('1');
    const x = await getDocPic();
    console.log(x)
    console.log('3');
  }
  catch(err){
    console.log('ERROR')
  }
})();
/*
console.log('1');
getDocPic().then(x => {
  console.log(x);
  console.log('3');
}).catch(err =>{
  console.log('ERROR')
})
*/
/*
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
  console.log(`Breed: ${data}`);
  return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);

    return writeFilePro("dog-img.txt", res.body.message)

    // fs.writeFile("dog-img.txt", res.body.message, err => {
    //   if (err) return console.log(err.message);
    //   console.log("Write file");
    // });
  })
  .then(() => {
    console.log('Saved file')
  })
  .catch(err => {
    console.log(err)
});
*/