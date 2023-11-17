
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

    if (name=='' || email=='' || password=='' || passwordConfirm=='') {
        return res.render('register', { //stop render
            message: 'Fill all details please'
        })

    }


    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result)=> {

        if (error) {
            console.log(error);
        }
        else if (result.length > 0) {
            return res.render('register', { //stop render
                message: 'This email is already in use...'
            })
        }
        else if (password !== passwordConfirm){
            return res.render('register', { //stop render
                message: 'Passwords do not match'
            })
        }

        //await used because hashing takes time, 8 is the number of rounds/times password is hashed
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results)=> {
            if (error) {
                console.log(error);
            }
            else {
                console.log(results);
                /*
                return res.render('register', {
                    message: 'User registered'
                });*/
                return res.render('profile', {
                    username: name,
                    signed: true
                });
            }

            //res.render("profile");

        
         })


    });


    //res.send("form submitted");
}

exports.login = (req, res) => {
    console.log(req.body);

    const {email, password} = req.body;     //middleware body parser

    if (email=='' || password=='') {
        return res.render('login', { //stop render
            message: 'Fill all details please'
        })

    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, result)=> {

        console.log(result);
        const foundName = result[0].name;
        console.log(foundName);

        if (error) {
            console.log(error);
        }
        else if (result.length > 0) {
            return res.render('profile', {
                username: foundName,
                signed: true
            })
        }

        else if (result.length == 0) {
            return res.render('login', {
                message: 'Incorrect email and password'
            })
        }

    });


    //res.send("form submitted");
}

exports.logout = (req, res) => {
    console.log(req.body);

    res.render("index");

    

    //res.send("form submitted");
}









