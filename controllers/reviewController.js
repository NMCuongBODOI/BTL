const { Review } = require('../models');

exports.getAllReviews = async (req, res) => {
    try { const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const result = await Review.paginate(page, limit);
        res.json({ totalItems: result.totalItems, totalPages: result.totalPages, currentPage: result.currentPage, reviews: result.data }); }
    catch (err) { res.status(500).json({ message: 'Error fetching reviews', error: err }); }
};

exports.getReviewsByCar = async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { CarId: req.params.carId } });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching reviews by car', error: err });
    }
};

exports.createReview = async (req, res) => {
    try { res.status(201).json(await Review.create(req.body)); }
    catch (err) { res.status(400).json({ message: 'Error creating review', error: err }); }
};

exports.showReviewOnHomepage = async (req, res) => {
    try {
        const [updated] = await Review.update({ showOnHomepage: true }, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Review not found' });
        res.json(await Review.findByPk(req.params.id));
    } catch (err) {
        res.status(400).json({ message: 'Error updating review', error: err });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const deleted = await Review.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting review', error: err });
    }
};
