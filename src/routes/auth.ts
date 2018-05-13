import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Users } from "../models/Users";
import {Request, Response, Router} from 'express';
import * as bodyParser from "body-parser"
let config = require('../config');

export const auth = Router();

auth.use(bodyParser.urlencoded({'extended':false}));
auth.use(bodyParser.json());

auth.post('/register', function(req, res) {

    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    Users.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }).then(function (err, user) {

            if (err) return res.status(500).send("Problem occured during the registration")

            let token = jwt.sign({ name: req.body.name }, config.secret, {
                expiresIn: 86400
            });
            res.status(200).send({ auth: true, token: token });
        });
});

auth.get('/ex', function(req, res) {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth : false, message: 'Failed to authenticate token' });

    res.status(200).send(decoded);
    });
});

auth.get('/home', function(req, res){
    if(req.session.key){
        res.status(200).send("ye, got there, safe & sound " + req.session.id + req.session.cookie);

    } else {
        res.status(200).send("nope" + req.session.id + + req.session.cookie);
        res.redirect('/login');
    }
})

auth.post('/login', function(req, res) {

    req.session.key = req.body.email;
    console.log(req.session);

    Users.findOne({ where: { email: req.body.email } }).then((user, err) => {

        if (err) return res.status(500).send('Error');
        if (!user) return res.status(404).send('No user found.');
        
        let passwordisValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordisValid) return res.status(401).send({ auth: false, token: null });

            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400
            });
            res.status(200).send({ auth: true, token: token });

        res.end('aa');
    });
})