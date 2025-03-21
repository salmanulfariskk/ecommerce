import React, { useState, useEffect } from 'react';
import styles from './ProductForm.module.scss';
import Iproduct from '../../interface/product';



interface ProductFormProps {
  initialProduct: Iproduct|null;
  onSubmit: (product: Iproduct) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, onSubmit, onCancel }) => {
  const [product, setProduct] = useState<Iproduct>(
    initialProduct || {
      title: '',
      description: '',
      price: 0, 
      imageUrl: '',
      category: '',
      rating: 0,
    }
  );
  console.log(initialProduct,"selectedproduct")
  const [imagePreview, setImagePreview] = useState<string>(initialProduct?.imageUrl || '');
  const [useFileUpload, setUseFileUpload] = useState<boolean>(false);

  // Update image preview when initialProduct changes
  useEffect(() => {
    if (initialProduct?.imageUrl) {
      setImagePreview(initialProduct.imageUrl);
    }
  }, [initialProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'rating' ? Number(value) : value,
    }));

    // If the user changes the image URL, update the preview
    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setProduct((prev) => ({
          ...prev,
          imageUrl: base64String, 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
  };

  const toggleImageInputMethod = () => {
    setUseFileUpload(!useFileUpload);
    setImagePreview(product.imageUrl || '');
    setProduct((prev) => ({
      ...prev,
      imageUrl: '',
    }));
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formLeft}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="rating">Rating (0-5)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              required
            />
          </div>
        </div>

        <div className={styles.formRight}>
          <div className={styles.imageSection}>
            <label>Product Image</label>
            {imagePreview ? (
              <div className={styles.imagePreviewContainer}>
                <img src={imagePreview} alt="Product Preview" className={styles.imagePreview} />
                <button
                  type="button"
                  className={styles.changeImageButton}
                  onClick={() => setImagePreview('')}
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className={styles.imageInput}>
                <div className={styles.toggleMethod}>
                  <button
                    type="button"
                    onClick={toggleImageInputMethod}
                    className={useFileUpload ? styles.active : ''}
                  >
                    {useFileUpload ? 'Use URL Instead' : 'Upload File Instead'}
                  </button>
                </div>
                {useFileUpload ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={!initialProduct}
                  />
                ) : (
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    required={!initialProduct}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit">{initialProduct ? 'Update Product' : 'Add Product'}</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;