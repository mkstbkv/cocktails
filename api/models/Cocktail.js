const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
})

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    is_published: {
        type: Boolean,
        required: true,
        default: false,
    },
    ingredients: [
        IngredientSchema
    ],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;