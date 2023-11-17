const express = require('express');
const app = express();
const port = 5000;


app.get ("/", (req, res) => {
    res.send("<h1>HOME PAGE</h1>")

});



app.listen(port, () =>{
    console.log(`Server started on port ${port} `);         // ` is backtick

})