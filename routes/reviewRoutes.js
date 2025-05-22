const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReviews);              // GET /api/reviews
router.get('/car/:carId', reviewController.getReviewsByCar);// GET /api/reviews/car/:carId
router.post('/', reviewController.createReview);            // POST /api/reviews
router.put('/show/:id', reviewController.showReviewOnHomepage);// PUT /api/reviews/show/:id
router.delete('/:id', reviewController.deleteReview);       // DELETE /api/reviews/:id

module.exports = router;