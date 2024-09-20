import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const API_URL = process.env.REACT_APP_API_URL;
const API_BACK_END = process.env.REACT_APP_BACK_END_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/products/${id}`).then(response => {
      setProduct(response.data);
      setSelectedImage(response.data.images[0].url); 
    });
  }, [id]);

  if (!product) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex flex-row md:flex-col md:w-1/6 space-x-2 md:space-x-0 md:space-y-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={`${API_BACK_END}${image.url}`}
              alt={product.name}
              className={`w-20 h-20 object-cover cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 rounded-lg shadow-md ${selectedImage === image.url ? 'border-4 border-orange-500' : ''}`}
              onClick={() => setSelectedImage(image.url)} 
            />
          ))}
        </div>

        <div className="md:w-2/3 bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={`${API_BACK_END}${selectedImage}`}
            alt={product.name}
            className="w-full h-80 md:h-[500px] object-cover"
          />
        </div>


        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg space-y-6">
          <div className="product-info">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4 leading-relaxed">{product.description}</p>

            <div className="flex items-center mb-4">
              <span className="text-gray-400 line-through text-xl mr-3">
                ${product.price.mainPrice}
              </span>
              <span className="text-red-500 text-3xl font-bold">
                ${product.price.discountedPrice}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Product Overview</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Weight:</strong> {product.details.weight}</li>
                <li><strong>Dimensions:</strong> {product.details.dimensions}</li>
                <li><strong>Manufacturer:</strong> {product.details.manufacturer}</li>
                <li><strong>In Stock:</strong> {product.details.inStock ? 'Yes' : 'No'}</li>
              </ul>
            </div>

            <div className="mt-6 flex space-x-4">
              <button className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition duration-300">
                Add to Cart
              </button>
              <button className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
