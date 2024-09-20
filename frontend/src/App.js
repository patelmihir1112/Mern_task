import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/products/:id" element={<ProductDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
