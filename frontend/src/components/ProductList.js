  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { Link } from 'react-router-dom';
  import Loader from './Loader';


  const API_URL = process.env.REACT_APP_API_URL;
  const API_BACK_END = process.env.REACT_APP_BACK_END_URL;

  const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [comboPrice, setComboPrice] = useState(null);
    const [originalPrice, setOriginalPrice] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      axios.get(`${API_URL}/products`)
        .then(response => {
          setProducts(response.data);
        })
        .catch(err => {
          setError('Failed to fetch products');
          console.error(err);
        });
    }, []);

    useEffect(() => {
      handleComboSubmit();
    }, [selectedProducts]);

    const handleProductSelect = (product) => {
      const isSelected = selectedProducts.find(p => p._id === product._id);
      if (isSelected) {
        setSelectedProducts(selectedProducts.filter(p => p._id !== product._id));
      } else {
        setSelectedProducts([...selectedProducts, product]);
      }
    };

    const handleComboSubmit = () => {
      if (selectedProducts.length > 1) {
        setLoading(true);
        const totalOriginalPrice = selectedProducts.reduce((total, product) => total + product.price.mainPrice, 0);
        const totalDiscountedPrice = selectedProducts.reduce((total, product) => total + product.price.discountedPrice, 0);
        
        setOriginalPrice(totalDiscountedPrice);
        
        axios.post(`${API_URL}/combo/calculatePrice`, { productIds: selectedProducts.map(item => item._id) })
        .then(response => {
          let finalPrice = response.data.finalDiscountedPrice;
          const discount = ((totalDiscountedPrice - finalPrice) / totalDiscountedPrice) * 100;
          setDiscountPercentage(discount.toFixed(2)); 
          setComboPrice(finalPrice.toFixed(2));  // Final combo price after any extra discount
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to calculate combo price');
          setLoading(false);
          console.error(err);
        });
      }
    };

    return (
      <div className="flex">
        <div className={`${selectedProducts == 0 ? 'w-full' : 'w-3/4'} p-4`}>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {selectedProducts.length < 2 && (
            <p className="text-lg font-semibold text-green-600 mb-4">
              Buy more than 1 product to unlock the combo offer!
            </p>
          )}
          
          {selectedProducts.length >= 2 && (
            <p className="text-lg font-semibold text-orange-600 mb-4">
              Combo Offer Activated! Check the discounted price on the right panel.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="relative border p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <img 
                  src={`${API_BACK_END}${product.images[0]?.url}`} 
                  alt={product.name} 
                  className="w-full h-48 object-cover mb-4 rounded-lg" 
                />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center mb-4">
                  <span className="text-gray-400 line-through text-lg mr-3">${product.price.mainPrice}</span>
                  <span className="text-red-500 text-xl font-bold">${product.price.discountedPrice}</span>
                </div>
                <Link to={`/products/${product._id}`} className="text-blue-500 mb-4 block">View Details</Link>
                
                <div className="absolute top-4 right-4">
                  <input 
                    type="checkbox" 
                    onChange={() => handleProductSelect(product)} 
                    checked={selectedProducts.find(p => p._id === product._id)} 
                    className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <div className="w-1/4 bg-gray-50 p-4 border-l shadow-lg">
            {selectedProducts.length === 1 && (
              <div className="border p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold">Selected Product:</h2>
                <p>{selectedProducts[0].name}</p>
                <p>Price: ${selectedProducts[0].price.discountedPrice}</p>
                <button 
                  onClick={() => console.log("Add to cart logic here")}
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                >
                  Add to Cart
                </button>
              </div>
            )}

            {selectedProducts.length > 1 && (
              <div>
                <h2 className="text-lg font-bold">Selected Products for Combo:</h2>
                <ul className="list-disc list-inside">
                  {selectedProducts.map(product => (
                    <li key={product._id}>{product.name} - ${product.price.discountedPrice}</li>
                  ))}
                </ul>
                
                {loading ? (
                  <p>Calculating combo price...</p>
                ) : comboPrice && (
                  <div className="mt-4 p-4 border rounded-lg">
                    <h2 className="text-lg font-bold">Combo Offer Price:</h2>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 line-through text-lg mr-3">Original Price: ${originalPrice}</span>
                      <span className="text-green-500 text-xl font-bold">Discounted Price: ${comboPrice}</span>
                    </div>
                    <p className="text-sm text-gray-600">You saved {discountPercentage}% on this combo!</p>
                    <button className="bg-orange-500 text-white py-2 px-4 rounded mt-4">
                      Add Combo to Cart
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  export default ProductList;
