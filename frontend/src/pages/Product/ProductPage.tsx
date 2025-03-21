import React, { useCallback, useEffect } from 'react';
import Navbar from '../../components/Home/Navbar';
import ProductCard from '../../components/Home/ProductCard';
import styles from './ProductPage.module.scss'
import { Edit2, Trash2 } from 'lucide-react';
import Footer from '../../components/Home/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { deleteProduct, fetchProductById, fetchProducts } from '../../features/products/productSlice';
import { useNavigate } from 'react-router-dom';


const ProductsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {products,loading,error} = useSelector((state: RootState) => state.products);
    const navigate = useNavigate()

    const fetchProductsMemoized = useCallback(() => {
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        fetchProductsMemoized();
    }, [fetchProductsMemoized]);

    const handleRemoveProduct = (productId: string) => {
        dispatch(deleteProduct(productId));
    };
    const handleEditProduct = (productId: string) => {
        dispatch(fetchProductById(productId))
        navigate(`/edit`)
    };

    const handleAddProduct = () => {
        navigate('/add')
    }
    if (loading) return <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
    </div>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className={styles.productsPage}>
            <Navbar />

            <section className={styles.productsSection}>
                <div className={styles.header}>
                    <h1>Products ({products.length})</h1>
                    <button className={styles.addProductButton} onClick={handleAddProduct} >
                        Add Product
                    </button>
                </div>
                <div className={styles.productItems}>
                    {products.map((product) => (
                        <div key={product._id} className={styles.productItem}>
                            <button
                                className={styles.deleteButton}
                                onClick={() => handleRemoveProduct(product._id as string)}
                            >
                                <Trash2 />
                            </button>
                            <button
                                className={styles.editButton}
                                onClick={() => handleEditProduct(product._id as string)}
                            >
                                <Edit2 />
                            </button>
                            <ProductCard
                                key={product._id}
                                imageSrc={product.imageUrl}
                                imageAlt={product.imageUrl}
                                discount={40}
                                title={product.title}
                                originalPrice={product.price}
                                discountedPrice={product.price}
                                rating={product.rating}
                                reviewCount={product.rating}
                                onAddToCart={() => alert(`Added ${product.title} to cart!`)}
                                showEditButton={false}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProductsPage;