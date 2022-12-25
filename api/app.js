const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require("body-parser");


// Load Config
dotenv.config({path: './config/config.env'})

const app = express()

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/*Enable Cors */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "x-access-token, x-refresh-token, _id");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PATCH, PUT, GET,POST, DELETE');
        return res.status(200).json({});
    }
    next();
  });

// Routes
require('./routes/list.route.js')(app)
require('./routes/user.route')(app)

// Connection
const PORT = process.env.PORT || 5000

connectDB().then(
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port:${PORT}`)
    })
).catch(err => {
    console.error('unable to connect ', err.message)
})