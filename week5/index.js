const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

const app = express();
const port = 5000;

//const dotenv = require('require');
dotenv.config({path: './.env'})
const path = require('path');


const db = mysql.createConnection({
    /*host : "localhost",
    user : "root",
    password : '',
    database : 'user_auth'*/
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});


db.connect((error)=>{
    if (error){
        console.log(error)
    }
    else {
        console.log("MySQL Connected...")
    }
});

//to ensure that it takes css and js files from public folder directory
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Define routes
app.use('/', require('./routes/pages'));

app.use('/auth', require('./routes/auth'));



app.listen(port, () =>{
    console.log(`Server started on port ${port} `);         // ` is backtick

})