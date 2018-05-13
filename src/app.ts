import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { orders } from './routes/orders';
import { auth } from './routes/auth';
import * as bodyParser from "body-parser"
import session from "express-session";
import redis from "redis";

let redisStore = require('connect-redis')(session);
let client = redis.createClient();

export const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
    secret: 'asdasdas',
    store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 360000 }
}));


app.use(express.json());
app.use(bodyParser.urlencoded({'extended':false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/orders', orders);
app.use('/api/auth', auth);