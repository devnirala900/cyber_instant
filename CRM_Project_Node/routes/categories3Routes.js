const express = require('express');
const { addCategories, getAllCategories, getCategoriesById, updateCategoryById, deleteCategoriesById, searchCategories } = require('../controller/categories3Controller');
const route = express.Router()

route.post('/add_categories', addCategories);
route.get('/get_all_categories', getAllCategories);
route.get('/get_categories/by_uid', getCategoriesById);
route.put('/update_categories/:_id', updateCategoryById);
route.delete('/delete_categories/:_id', deleteCategoriesById);
route.get('/search/all/categories', searchCategories);


module.exports = route