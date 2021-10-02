const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const route = express.Router();

const app = express();

const User = require('../models/User');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


route.get('/login', (req, res) => {
    res.sendStatus(200);
});

//Login route
route.post('/login', (req, res) => {

    // Finds user with corresponding email in the table
    User.findOne({
        raw: true,
        where: {
            email: req.body.email
        }
    })
    .then((user) => {
        // Checks if any user is found
        if(user !== null) {
            // Compares the password sent in the request with the hashed password stored in the database
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                
                // Jwt sign method
                function generateAccessToken() {
                    // Signs a web token with data about the user in the payload
                    return jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName }, process.env.ACCESS_TOKEN, { expiresIn: '24h' })
                }
                // if the matching password is found, do this
                if (result) {

                    // generates token and sends it to user in json format
                    const accessToken = generateAccessToken();
                    res.json({ accessToken: accessToken })
                }
            })

        } 
        // If user with that email isn't found
        else {
            res.send('User with that email not found')
        }
    })


});


module.exports = route;