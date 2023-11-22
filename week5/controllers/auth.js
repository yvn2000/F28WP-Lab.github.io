
const mysql = require('mysql');
const jwt = require('jsonwebtoken');  //because we're taking data as json files
const { promisify } = require('util');
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

exports.login = async (req, res) => {
    console.log(req.body);

    try {

        const { email, password} = req.body;

        /*
        if ((email=='' || password=='') || (!email || !password)) {
            return res.status(400).render('login', { //stop render
                message: 'Fill all details please'
            })
    
        }*/
        if (!email || !password) {
            return res.status(400).render('login', { //stop render
                message: 'Fill all details please'
            })
    
        }

    
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, result)=> {
    
            console.log(result);
            console.log(!result);

            if (!result || result.length<1) {
                res.status(401).render('login', {
                    message: "Incorrect Email or Password Entered"
                })
            }

            else if (!(await bcrypt.compare(password, result[0].password))) {
                res.status(401).render('login', {
                    message: "Incorrect Password Entered"
                })
            }
    
            /*if ( !result || result==[] || !(await bcrypt.compare(password, result[0].password))) {
                res.status(401).render('login', {
                    message: "Incorrect Email or Password Entered"
                })
            }*/

            else {
                const id = result[0].id;
    
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
    
                console.log("The token is: " + token);
    
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
    
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/profile");
                /*
                return res.status(200).render('profile', {
                    username: result[0].name
                });*/


    
    
            }
    
    
        });

    }
    catch (error) {
        console.log(error);
    }
    
}

exports.logout = async (req, res) => {
    console.log(req.body);

    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    });

    //res.render("index");
    res.status(200).redirect('/');
}


exports.isLoggedIn = async (req, res, next) => {

    if (req.cookies.jwt) {

        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            console.log(decoded);


            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], async (error, result) => {

                req.user = result[0];
                console.log("user is")
                console.log(req.user);

                //return req.user;

                return next();

            });
        }
        catch (error) {
            console.log(error);
            return next(); 

        }
    }
    else {
        next();
    }


}









