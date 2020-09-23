const mongoose = require('mongoose');
const express = require('express');
const Car = require('./models/car.js');

const app = express();

app.use(express.json());

// Connect to Mongo DB
mongoose
    .connect('mongodb://localhost:27017')
    .then(() => {
        console.log('Connected to Database');
    })
    .catch((error) => {
        console.log('Connection failed!');
    });

app.get('/', (req, res) => {
    res.send('Car Showroom Project!');
});

// GET cars
app.get('/cars', (req, res) => {
    Car.find().then((cars) => {
        return res.send(cars);
    });
});

// POST cars
app.post('/cars', (req, res) => {
    const car = new Car({
        name: req.body.name,
        price: req.body.price,
        available_quantity: req.body.available_quantity,
    });
    car.save();

    res.send(car);
});

// PUT cars
app.put('/cars', (req, res) => {

    Car.findOneAndUpdate({
        _id: req.body._id
    },
    {
		name: req.body.name,
		price: req.body.price,
		available_quantity: req.body.available_quantity
    },
        function (error, result) {
			if (error) return res.status(404).send(error);
			else return res.send(result);
        }
    );
});

// DELETE cars
app.delete('/cars', (req, res) => {
    Car.findOneAndDelete({
        _id: req.body._id
    },
		function (error, result) {
			if (error) return res.status(404).send(error);
			else return res.send(result);
		}
    );
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Express app Listening on Port ${port}`);
});

module.exports = server;