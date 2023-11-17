
const mysql = require('mysql');
const jwt = require('jsonwebtoken');  //because we're taking data as json files
const bcrypt = require('bcryptjs');     //password hashing

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});


//export the data that comes from register
exports.register = (req, res) => {
    console.log(req.body);

    /*
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    */

    const {name, email, password, passwordConfirm} = req.body;     //middleware body parser

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result)=> {

        if (error) {
            console.log(error);
        }
        if (result.length > 0) {
            return res.render('register'), { //stop render
                message: 'This email is already in use...'
            }
        }
        else if (password !== passwordConfirm){
            return res.render('register', { //stop render
                message: 'Passwords do not match'
            })
        }

        //await used because hasing takes time, 8 is the number of rounds/times password is hashed
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results)=> {
            if (error) {
                console.log(error);
            }
            else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                });
            }

        
         })


    });


    res.send("form submitted");
}






