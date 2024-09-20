const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    mainPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
      },
    },
  ],
  details: {
    weight: String,
    dimensions: String,
    manufacturer: String,
    inStock: {
      type: Boolean,
      default: true,
    },
  },
});

module.exports = mongoose.model('Product', productSchema);
