let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Room Model
let roomSchema = require('../models/Room');

// CREATE Room
router.route('/create-room').post((req, res, next) => {
    roomSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ Rooms
router.route('/').get((req, res) => {
    roomSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update room
router.route('/update-room').put((req, res, next) => {
    roomSchema.findByIdAndUpdate(req.body._id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Updated successfully !')
        }
    })
})

module.exports = router;