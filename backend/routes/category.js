const {Router} = require('express');
const {categoryGetAll, categoryPost, categoryGetOne} = require('../controllers/category');
const router = Router();

router.route('/')
.get(categoryGetAll)
.post(categoryPost)

router.route('/:id')
.get(categoryGetOne)


module.exports = router;
