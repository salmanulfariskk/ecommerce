import React from 'react';
import Navbar from '../../components/Home/Navbar';
import styles from './EditProduct.module.scss';
import ProductForm from '../../components/ProductFrom/ProductForm';
import Footer from '../../components/Home/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import Iproduct from '../../interface/product';
import { updateProduct } from '../../features/products/productSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EditProductPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate=useNavigate()
    const selectedProduct=useSelector((state:RootState)=>state.products.selectedProduct)
    const handleEditProduct = async (formData: Iproduct) => {
        try {
            await dispatch(updateProduct(formData));
            navigate('/product')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
            toast.error(errorMessage);
        }
    }
    return (
        <div className={styles.editProductPage}>
            <Navbar />
            <section className={styles.editProductSection}>
                <div className={styles.header}>
                    <h1>Edit Old Product</h1>
                </div>
                <ProductForm
                initialProduct={selectedProduct}
                    onSubmit={handleEditProduct}
                    onCancel={() => (window.location.href = '/products')}
                />
            </section>
            <Footer />
        </div>
    );
};

export default EditProductPage;