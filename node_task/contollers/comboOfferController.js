const Product = require('../models/productModel');

exports.getCalculatePrice = async (req, res) => {
    try {
        const { productIds } = req.body;
        if (productIds.length < 2) {
          return res.status(400).json({ message: 'Select more than 2 products to apply discount.' });
        }
    
        const products = await Product.find({ _id: { $in: productIds } });
        let totalMainPrice = 0;
        let totalDiscountedPrice = 0;
    
        products.forEach(product => {
          totalMainPrice += product.price.mainPrice;
          totalDiscountedPrice += product.price.discountedPrice;
        });

        if (totalDiscountedPrice > 5000) {
          totalDiscountedPrice *= 0.90; 
        } else if (totalDiscountedPrice > 1000) {
          totalDiscountedPrice *= 0.95; 
        }
    
        res.json({
          totalMainPrice,
          finalDiscountedPrice: totalDiscountedPrice,
          message: 'Discount applied successfully!'
        });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
  };