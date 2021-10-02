require('dotenv').config()

const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

//Mehtod that authenticates the passed token
//The header consists of the bearer and the token
const authenticateJWT = (req, res, next) => {

    //Checks authorization in http request exists
    if (req.headers.authorization) {

        //Splits the bearer and token and gets the token without bearer
        let token = req.headers['authorization'].split(' ')[1];

        if (token == null) return res.sendStatus(401)
        
        //Verifies user and stors the user info into token payload
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {

            if (err) return res.sendStatus(403);
            req.user = user;
            next();
            
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT