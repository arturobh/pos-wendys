const Ingredient = require('../models/ingredient');
const mongoose = require('mongoose');

const ingredientsGetExtra = async (req, res) => {
    const ingredients = await Ingredient.find({'isExtra': true});
    res.status(200).json(
        ingredients
    )
};

const ingredientGetOne = async (req, res) => {
    const {id} = req.params;
    const ingredient = await Ingredient.findById(id);
    res.status(200).json(
        ingredient
    )
};


const ingredientPost = async (req, res) => {
    const {name, unit, imagePath, isExtra} = req.body;
    const ingredient = new Ingredient({
        name, unit, imagePath, isExtra
    })

    const respon = await ingredient.save();

    res.status(200).json({
        msg : respon
    })
};


module.exports = {
    ingredientsGetExtra, ingredientGetOne, ingredientPost
}