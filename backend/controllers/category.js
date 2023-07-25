const Category = require('../models/category');
const mongoose = require('mongoose');

const categoryGetAll = async (req, res) => {

    const categories = await Category.find({});
    res.status(200).json(
        categories
    )
};

const categoryGetOne = async (req, res) => {
    const {id} = req.params;
    const category = await Category.findById(id);
    res.status(200).json({
        category
    })
};


const categoryPost = async (req, res) => {
    const {categoryName, products} = req.body;
    const category = new Category({
        categoryName, products
    })

    const respon = await category.save();

    res.status(200).json({
        msg : respon
    })
};


module.exports = {
    categoryGetAll, categoryGetOne, categoryPost
}