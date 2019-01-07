const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack.config.dev.js');
const webpackCompiler = webpack(webpackConfig);
const cors = require('cors');

// connect to mongo using mongoose
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch(err => console.log(err));

const userRoutes = require('./routes/api/user-routes');
const championRoutes = require('./routes/api/champion-routes');
const itemRoutes = require('./routes/api/item-routes');
const runesReforgedRoutes = require('./routes/api/runes-reforged-routes');
const versionRoutes = require('./routes/api/version-routes');
const buildRoutes = require('./routes/api/build-routes');

// declare express
const app = express();

// use webpack-dev-middleware if in development mode
// if(process.env.NODE_ENV.trim() === 'development'){
// 	console.log('running in development mode...');
// 	app.use(webpackDevMiddleware(webpackCompiler, {
// 		//publicPath: webpackConfig.output.publicPath
// 		publicPath: '/'
// 	}));
// }else{
// 	console.log('running in production mode...');
// }

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

app.use(express.static('dist'));
app.use(express.static('./frontend/src/styles/css'));


// render the main page
app.get('/', (req, res) => {
	res.sendFile('dist/index.html', {root: "./"});
});

// let allowCrossDomain = (req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', 'http://localhost');
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type');
// }

//app.use(allowCrossDomain);

app.use(cors());

// routes
app.use('/api/user', userRoutes);
app.use('/api/ddragon/champions', championRoutes);
app.use('/api/ddragon/items', itemRoutes);
app.use('/api/ddragon/runesreforged', runesReforgedRoutes);
app.use('/api/ddragon/version', versionRoutes);
app.use('/api/user/build', buildRoutes);

// set up port
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
})