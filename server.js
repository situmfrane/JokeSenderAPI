const cors = require('cors');
const express = require('express');
const app = express();
const port = 8080;
const sequelize = require('./config/database');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const User = require('./models/User');

sequelize.sync();

//Including routes
const registerRoute = require('./routes/Register');
const loginRoute = require('./routes/Login');
const jokesRoute = require('./routes/Joke');

// Basic routing setup
app.get('/', (req, res) => {
    res.send('Server running')
})

app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', jokesRoute);


app.listen(port, () => {
    console.log('Server running on port 8080')
})