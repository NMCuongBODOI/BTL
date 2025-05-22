const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.get('/search', carController.searchCarsByName);  // GET /api/cars/search
router.get('/filter', carController.filterCars);        // GET /api/cars/filter
router.get('/options', carController.getFilterOptions); // GET /api/cars/options


router.get('/', carController.getAllCars);              // GET /api/cars
router.post('/', carController.createCar);              // POST /api/cars
router.get('/:id', carController.getCarById);           // GET /api/cars/:id
router.put('/:id', carController.updateCar);            // PUT /api/cars/:id
router.delete('/:id', carController.deleteCar);         // DELETE /api/cars/:id

module.exports = router;
