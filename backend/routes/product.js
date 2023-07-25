const {Router} = require('express');
const {productsGetByCategory, productGetOne, productPost} = require('../controllers/products');
const router = Router();

router.route('/:id')
.get(productGetOne)
.post(productPost)

router.route('/byCategory/:categoryName')
.get(productsGetByCategory)


module.exports = router;
