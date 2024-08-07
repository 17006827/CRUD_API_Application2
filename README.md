# Car CRUD API

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server with `node server.js`.
4. Open `public/index.html` in your browser or serve it via a static file server.

## API Endpoints

- `GET /api/mostPopularMake`: Returns the most popular car make.
- `POST /api/car`: Adds a new car to the database.
- `GET /api/car/:reg_number`: Retrieves a car by registration number.
- `PUT /api/car/:reg_number`: Updates a car's details by registration number.
- `DELETE /api/car/:reg_number`: Deletes a car by registration number.

## Chosen Function

The `mostPopularMake` function determines the most frequently occurring car make in the dataset.
