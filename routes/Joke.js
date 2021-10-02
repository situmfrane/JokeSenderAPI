const express = require('express');
const route = express.Router();
const axios = require('axios');
const sgMail = require('@sendgrid/mail')

const app = express();

const authenticateJWT = require('../config/authenticateJWT')
const User = require('../models/User');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


route.post('/getjoke', authenticateJWT, async (req, res) => {

    //Used axios to send get requests to jokes api
    const response = await axios({
        
        // the base url
        url: "https://api.icndb.com/jokes/random?",
        // http method definition
        method: "get",
        // request parameters which are retrieved from the json web token
        params: {
            firstName: req.user.firstName,
            lastName: req.user.lastName
        }
    })

    // sendgrid api setup (api key from .env)
    sgMail.setApiKey(process.env.SENDGRID)
    
    // the sendgrid message setup
    const msg = {
        to: req.user.email,
        from: process.env.SENDER,
        subject: 'Joke sent using API',
        html: response.data.value.joke,
    }

    // method that sends the mail and returns response
    sgMail.send(msg).then(() => {
        res.status(200).send('Joke sent successfully')
    })

});

module.exports = route;