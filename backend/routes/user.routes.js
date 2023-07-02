const express = require('express');
const statuscodes = require('http-status-codes').StatusCodes;

const model = require('../models/user.model');

const router = express.Router();

router.get('/', (req, res) => {
    model.find().then(docs => {
        return res.status(statuscodes.OK).send(docs);
    }).catch(err => {
        return res.status(statuscodes.INTERNAL_SERVER_ERROR).send({
            message: err
        })
    });
});

router.get('/:username/:password', (req, res) => {
    model.find({username: req.params.username}).then(docs => {
        if (docs.length == 0) {
            return res.status(statuscodes.BAD_REQUEST).send({
                message: `${req.params.username} does not exist!`
            });
        }
        if (docs[0].password !== req.params.password) {
            return res.status(statuscodes.BAD_REQUEST).send({
                message: `Invalid password!`
            });
        }
        return res.status(statuscodes.OK).send(docs[0]);
    }).catch(err => {
        return res.status(statuscodes.INTERNAL_SERVER_ERROR).send({
            message: err
        })
    });
});

router.post('/', (req, res) => {
    const body = req.body;
    body.autoStart = false;
    body.totalRests = 0;
    body.interval = 20;
    model.find({username: body.username}).then(docs => {
        if (docs.length != 0){
            return res.status(statuscodes.BAD_REQUEST).send({
                message: `${body.username} already exists!`
            });
        }
        else {
            model.create(body).then(doc => {
                return res.status(statuscodes.CREATED).send(doc);
            }).catch(err => {
                return res.status(statuscodes.INTERNAL_SERVER_ERROR).send({
                    message: err
                });
            });
        }
    }).catch(err => {
        return res.status(statuscodes.INTERNAL_SERVER_ERROR).send({
            message: err
        })
    });    
});

module.exports = router;