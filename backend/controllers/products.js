const Product = require('../models/product');
const mongoose = require('mongoose');

const productsGetByCategory = async (req, res) => {
    const {categoryName} = req.params;
    const products = await Product.find({'type': categoryName});
    res.status(200).json(
        products
    )
};

const productGetOne = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(
        product
    )
};


const productPost = async (req, res) => {
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
    productsGetByCategory, productGetOne, productPost
}