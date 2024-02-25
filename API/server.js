const mongoose = require('mongoose');
const helmet = require('helmet');
const Joi = require('joi');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const route = require('./routes/userRoute')
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const mongoString = process.env.DATABASE_URL;
const app = express();

if (process.env.NODE_ENV == 'development') {
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", "http://localhost:8000", "http://localhost:3000"],
            scriptSrc: ["'self'", "http://localhost:3000", "http://localhost:8000"],
            imgSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            objectSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            scriptSrcElem: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            workerSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'",],
            manifestSrc: ["'self'"],
            upgradeInsecureRequests: [],
        }
    }));
} else if (process.env.NODE_ENV == 'preprod') {
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://vicopo.selfbuild.fr/", "http://localhost:8080", "https://localhost:3000", "https://www.google-analytics.com/", "https://www.googletagmanager.com"],
            scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://localhost:3000", "http://localhost:8080", "https://www.googletagmanager.com", "https://www.google-analytics.com/analytics.js"],
            imgSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "www.googletagmanager.com", "https:/ssl.gstatic.com", "https:/www.gstatic.com"],
            objectSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            scriptSrcElem: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            workerSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'",],
            manifestSrc: ["'self'"],
            upgradeInsecureRequests: [],
        }
    }));
} else {
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://vicopo.selfbuild.fr/", "http://localhost:8080", "https://localhost:3000", "https://www.googletagmanager.com", "https://www.google-analytics.com/analytics.js", "https://analytics.google.com/"],
            scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://localhost:3000", "http://localhost:8080", "https://www.googletagmanager.com", "https://www.google-analytics.com/analytics.js"],
            imgSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "www.googletagmanager.com", "https:/ssl.gstatic.com", "https:/www.gstatic.com"],
            objectSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            scriptSrcElem: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://www.google-analytics.com/analytics.js", , "https://analytics.google.com/"],
            workerSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'",],
            manifestSrc: ["'self'"],
            upgradeInsecureRequests: [],
        }
    }));
}
/******* end protection CSR *******/
app.disable('x-powered-by');


app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ strict: false }));


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, GET, POST, DELETE, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

app.use('/apiConnect', route);
app.use('/api', routes);
// Connexion à la base de données (MongoDB)
mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((data) => {
        console.log(`Database connected`)
    })

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});


// Démarrage du serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});