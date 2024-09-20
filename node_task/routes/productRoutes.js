const express = require('express');
const { getProducts, getProductById, createProduct , updateProduct, deleteProduct } = require('../contollers/productController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', upload.array('images', 5), createProduct);
router.put('/:id', upload.array('images', 5), updateProduct);
router.delete('/:id', deleteProduct);


module.exports = router;
