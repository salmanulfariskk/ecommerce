import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import ProductsPage from './pages/Product/ProductPage';
import AddProductPage from './pages/AddProduct/AddProduct';
import EditProductPage from './pages/EditProduct/EditProduct';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/edit" element={<EditProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
