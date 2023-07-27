const {Router} = require('express');
const {ingredientsGetExtra, ingredientGetOne, ingredientPost} = require('../controllers/ingredient');
const router = Router();

router.route('/:id')
.get(ingredientGetOne)
.post(ingredientPost)

router.route('/')
.get(ingredientsGetExtra)


module.exports = router;
