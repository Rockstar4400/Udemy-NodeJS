
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>', 
    process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {
  console.log('Connected!');
});

// Source
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

// Import data to DB
const importData = async () => {
    try{
        await Tour.create(JSON.parse(tours));
        console.log('Data imported!');
    }
    catch(err){
        console.log(err);
    }
    process.exit();
}

// Delete data
const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data Deleted!')
    }
    catch(err){
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import'){
    importData();
}else if (process.argv[2] === '--delete'){
    deleteData();
}