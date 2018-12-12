const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

// connect to mongo using mongoose
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch(err => console.log(err));

const userRoutes = require('./routes/api/user-routes');

// declare express
const app = express();

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
    secret: 'secret',
    saveUnitialized: true,
    resave: true
}))

// passport init
app.use(passport.initialize());
app.use(passport.session());

// express validator, taken from github
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        const namespace = param.split('.'),
            root = namespace.shift(0),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// routes 
app.use('/user', userRoutes);

// lset up port
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
})