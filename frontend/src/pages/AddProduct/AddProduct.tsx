import React from 'react';
import Navbar from '../../components/Home/Navbar';
import styles from './AddProduct.module.scss';
import ProductForm from '../../components/ProductFrom/ProductForm';
import Footer from '../../components/Home/Footer';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/products/productSlice';
import Iproduct from '../../interface/product';
import { AppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';

const AddProductPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate=useNavigate()

    const handleAddProduct = async (formData: Iproduct) => {
        try {
            await dispatch(addProduct(formData));
            navigate('/product')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
            toast.error(errorMessage);
        }
    }
    return (
        <div className={styles.addProductPage}>
            <Navbar />
            <section className={styles.addProductSection}>
                <div className={styles.header}>
                    <h1>Add New Product</h1>
                </div>
                <ProductForm
                    onSubmit={handleAddProduct}
                    onCancel={() => (window.location.href = '/products')}
                    initialProduct={null} />
            </section>
            <Footer />
        </div>
    );
};

export default AddProductPage;