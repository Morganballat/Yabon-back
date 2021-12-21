
require('dotenv').config();


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')


const app = express()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');


app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : 'c5613c06f85d2b50',
    cookie : {
        maxAge: 1000 *60 *60 * 24,
        sameSite : true,

    }
}))

const port = process.env.PORT || 5478;

const expressSwagger = require('express-swagger-generator')(app);
let options = require('./swagger-config.json');
options.basedir = __dirname; // __dirname désigne le dossier du point d'entrée

expressSwagger(options);

const router = require('./app/router');




  

app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json());


// le parser JSON qui récupère le payload quand il y en a un et le transforme en objet JS disponible sous request.body
app.use(express.json());

app.use('/v1', router);




// ici, on pourrait aussi écrire notre 404
app.listen(port, () => { console.log(`Listening on http://localhost:${port}`) });