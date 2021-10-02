# Joke sending API
## Task overview
This is an API created using Express.js, Sequelize ORM and MySQL. User auth is done using Json web tokens. The api is used for a user to register and login using their email, after which the user can acces the protected joke sending route. The route uses the ```https://api.icndb.com/jokes/``` API to send a random joke with the user's fname to the user's email. The e-mail is sent using SendGrid, but this can easily be accomplished using nodemailer.

## Quick start
Install node dependencies using ```npm install```      
   
The env file requires the following:  
* DATABASE: database name
* USER: database user  
* DB_PASS: database password
* HOST: database host
* SENDGRID: sendgrid api key
* ACCESS_TOKEN: token key, best to generate using ```require('crypto').randomBytes(64).toString('hex')``` in ```node``` terminal
   
Run the app using ```npm run start``` or use nodemon by hitting ```npm run test```   
  
Make the API requests using REST Client extension for VS Code using the requests.rest file

## Route breakdown
The routes can be tested using Rest client extension for VSCode (rest file is included in project)   
    
POST http://localhost:8080/register - Registers new user    
POST http://localhost:8080/login - Logs user in     
POST http://localhost:8080/getjoke - Sends the joke      


