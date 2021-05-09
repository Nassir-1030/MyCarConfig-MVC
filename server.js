// HTTP CODES: https://httpstatuses.com/

const express = require('express');
const routes = require('./config/routes');
const session = require('express-session');
const authenticationCheck = require('./app/middlewares/authentication');

const app = express();
const path = require('path');


// MIDDLEWARES
// Order is important here!

// parse application/x-www-form-urlencoded
// https://expressjs.com/en/api.html#express.urlencoded
// Why extended? uses a different library, the other one seems to be not recommended
app.use(express.urlencoded({extended:true}));

// Middleware defining a static folder containing images, stylesheets(css)
// https://expressjs.com/en/api.html#express.static
app.use(express.static('public'));

// https://stackoverflow.com/questions/45903473/set-the-lookup-path-of-view-folder-of-ejs-in-express
app.set('views', path.join(__dirname, './app/views'))

// Why use a session?
// A session allows you to store information server-side, rather than in a cookie that is insecure, 
// store in browser, sent with every requests and tiny (can hold a maximum of 4kb)

// Session id is stored in a cookie and represents the link between the user and the server.
// This id allows the server to recognize an authenticated user.
app.use(session({
    secret: 'EEtV6mRbJFXzmbDbzqEpcHabhhuCSx65',
    resave: false,          // force the session to be saved back to the session store, even if the store has not been modified
    saveUninitialized: true // Keep a uninitialized session (when it is new but not modified)
}));

// Authentication middleware, must be placed after the session middleware
app.use(authenticationCheck);

// Check routes and lead to matching controller
app.use('/', routes);

// LISTENNING on port 3000
app.listen(3001);