const express = require('express');
const brandController = require('../controllers/brandController');

const router = express.Router();

router.route("/")
.post(brandController.createBrand)
.get(brandController.getBrands);

router.route("/:id")
.get(brandController.getBrandById)
.patch(brandController.updateBrand);


module.exports = router;