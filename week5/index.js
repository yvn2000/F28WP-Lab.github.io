const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

const app = express();
const port = 5000;

//const dotenv = require('require');
dotenv.config({path: './.env'})


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



app.get ("/", (req, res) => {
    res.send("<h1>HOME PAGE</h1>")

});



app.listen(port, () =>{
    console.log(`Server started on port ${port} `);         // ` is backtick

})