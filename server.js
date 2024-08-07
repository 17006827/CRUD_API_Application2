const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let cars = [];

// Fetch car data from the provided API URL
async function fetchCarData() {
  try {
    const response = await axios.get('https://bootcamp.projectcodex.co/cars.json');
    cars = response.data;
  } catch (error) {
    console.error('Error fetching car data:', error);
  }
}

// Call the function to fetch car data on server start
fetchCarData();

// Function to determine the most popular car make
app.get('/api/mostPopularMake', (req, res) => {
  const makeCount = cars.reduce((acc, car) => {
    acc[car.make] = (acc[car.make] || 0) + 1;
    return acc;
  }, {});

  const mostPopularMake = Object.keys(makeCount).reduce((a, b) => makeCount[a] > makeCount[b] ? a : b);

  res.json({ mostPopularMake });
});

// CRUD Operations
app.post('/api/car', (req, res) => {
  const newCar = req.body;
  cars.push(newCar);
  res.status(201).json(newCar);
});

app.get('/api/car/:reg_number', (req, res) => {
  const regNumber = req.params.reg_number;
  const car = cars.find(c => c.reg_number === regNumber);
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

app.put('/api/car/:reg_number', (req, res) => {
  const regNumber = req.params.reg_number;
  const carIndex = cars.findIndex(c => c.reg_number === regNumber);
  if (carIndex !== -1) {
    cars[carIndex] = { ...cars[carIndex], ...req.body };
    res.json(cars[carIndex]);
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

app.delete('/api/car/:reg_number', (req, res) => {
  const regNumber = req.params.reg_number;
  cars = cars.filter(c => c.reg_number !== regNumber);
  res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
