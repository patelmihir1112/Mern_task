const Product = require('../models/productModel');
const path = require("path");
const fs = require("fs");


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, brand, price, description, category,  details } = req.body;

    const imageUrls = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      altText: file.originalname,
    }));

    const product = new Product({
      name,
      brand,
      price,
      description,
      category,
      images: imageUrls,
      details,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.images.forEach(image => {
      const imagePath = path.join(__dirname, '../public', image.url);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error deleting image: ${imagePath}`, err);
        }
      });
    });
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

exports.updateProduct = async (req, res) => {
    try {
      const { name, brand, price, description, category, details } = req.body;
  
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      let imageUrls = product.images; 
  
      if (req.files.length > 0) {
        product.images.forEach(image => {
          const imagePath = path.join(__dirname, '../public', image.url);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(`Error deleting image: ${imagePath}`, err);
            }
          });
        });
  
    
        imageUrls = req.files.map(file => ({
          url: `/uploads/${file.filename}`,
          altText: file.originalname,
        }));
      }
  

      product.name = name || product.name;
      product.brand = brand || product.brand;
      product.price = price || product.price;
      product.description = description || product.description;
      product.category = category || product.category;
      product.details = details || product.details;
      product.images = imageUrls;
  
      await product.save();
  
      res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  };
  

