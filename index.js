const express = require('express');
const mongoose = require('mongoose');
const db =  mongoose.connection;
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true, useUnifiedTopology: true});
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: '));
db.on('disconnected', () => console.log('mongo disconnected'));


const app = express();
const ejs = require('ejs');
const { resourceUsage } = require('process');
const flash = require('connect-flash');
app.use(flash());
const fileUpload = require('express-fileupload');

app.set('view engine','ejs');

const validateMiddleWare = require('./middleware/validationMiddleware');
const authMiddleWare = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

app.get(validateMiddleWare);

const expressSession = require('express-session');

app.use(expressSession({
    secret: 'there is no fate but what we make for ourselves'
}));


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});
app.listen(4000,()=>{
    console.log('App listening on port 4000')
});

const newPostController = require('./controllers/newPost');
const storePostController = require('./controllers/storePost');
const homeController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

app.get('/', homeController);
app.get('/post/:id', getPostController);
app.post('/posts/store', authMiddleWare, storePostController);
app.get('/posts/new', authMiddleWare, newPostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notFound'));