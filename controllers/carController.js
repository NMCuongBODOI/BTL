const { Car } = require('../models');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');
exports.getAllCars = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const result = await Car.paginate(page, limit);
        res.json({ totalItems: result.totalItems, totalPages: result.totalPages, currentPage: result.currentPage, cars: result.data });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching cars', error: err });
    }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching car', error: err });
    }
};

exports.createCar = async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json(car);
    } catch (err) {
        res.status(400).json({ message: 'Error creating car', error: err });
    }
};

exports.updateCar = async (req, res) => {
    try {
        console.log('ID nhận được:', req.params.id);
        const [updated] = await Car.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Car not found' });
        const car = await Car.findByPk(req.params.id);
        res.json(car);
    } catch (err) {
        res.status(400).json({ message: 'Error updating car', error: err });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        const deleted = await Car.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Car not found' });
        res.json({ message: 'Car deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting car', error: err });
    }
};
exports.searchCarsByName = async (req, res) => {
    try {
        const name = req.query.name || '';
        console.log('name nhận được:', name);

        const cars = await Car.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });

        res.json(cars);
    } catch (err) {
        console.error('Lỗi khi tìm kiếm xe:', err); // ← log lỗi chi tiết
        res.status(500).json({ message: 'Error searching for cars', error: err.message });
    }
};
exports.getFilterOptions = async (req, res) => {
    try {
        const types = await Car.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('type')), 'type']],
        });

        const colors = await Car.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('color')), 'color']],
        });

        const brands = await Car.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('brand')), 'brand']],
        });

        res.json({
            status: "success",
            data: {
                types: types.map(item => item.get('type')),
                colors: colors.map(item => item.get('color')),
                brands: brands.map(item => item.get('brand')),
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
};
exports.filterCars = async (req, res) => {
    try {
        const { type, color, brand, minPrice, maxPrice } = req.query;
        const whereClause = {};

        if (type && type !== 'all') whereClause.type = type;
        if (color && color !== 'all') whereClause.color = color;
        if (brand && brand !== 'all') whereClause.brand = brand;

        if (minPrice || maxPrice) {
            whereClause.price = {};
            if (minPrice && !isNaN(minPrice)) whereClause.price[Op.gte] = parseInt(minPrice);
            if (maxPrice && !isNaN(maxPrice)) whereClause.price[Op.lte] = parseInt(maxPrice);
        }

        const cars = await Car.findAll({ where: whereClause });
        res.json({ status: "success", data: cars });
    } catch (error) {
        console.error("Lỗi filterCars:", error);
        res.status(500).json({ status: "error", message: "Server error", error: error.message });
    }
};
