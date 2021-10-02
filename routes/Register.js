const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();

const app = express();

const User = require('../models/User');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

route.get('/register', (req, res) => {
    res.sendStatus(200);
});

//Post request for adding users into table
route.post('/register', async (req, res) => {

    // Finds user with corresponding email so it can't go through with the registration
    User.findAll({
        where: {
            email: req.body.email
        }
    })
    .then(async (data) => {
        
        try {
            // hashes password to store into database
            var hashedpass = await bcrypt.hash(req.body.password, 10);
            
            //creates user
            await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedpass
                
            }).then(() => {
                res.status(200).send('Registered successfully')
            })
        } catch(err) {
            res.send('The email address is already taken')
        }
        })


});

module.exports = route;