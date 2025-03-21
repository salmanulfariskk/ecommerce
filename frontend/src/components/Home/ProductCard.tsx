import React from 'react';
import styles from './ProductCard.module.scss';
import { Eye, Heart } from 'lucide-react'; // For icons

// Define the props interface for TypeScript
interface ProductCardProps {
  imageSrc: string;
  imageAlt: string;
  discount?: number; // e.g., 40 for 40%
  title: string;
  originalPrice: number;
  discountedPrice: number;
  rating: number; // e.g., 4.5
  reviewCount: number; // e.g., 88
  onAddToCart?: () => void; // Optional callback for "Add to Cart"
  showEditButton:boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  imageAlt,
  discount,
  title,
  originalPrice,
  discountedPrice,
  rating,
  reviewCount,
  onAddToCart,
  // showEditButton,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starFilled : styles.star}>
          ★
        </span>
      );
    }
    return stars;
  };
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
        {discount && <span className={styles.discountBadge}>-{discount}%</span>}
        <div className={styles.overlay}>
          <button className={styles.iconButton}>
            <Heart size={20} />
          </button>
          <button className={styles.iconButton}>
            <Eye size={20} />
          </button>
        </div>
        <button className={styles.addToCart} onClick={onAddToCart}>
          Add To Cart
        </button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.price}>
          <span className={styles.discountedPrice}>${discountedPrice}</span>
          <span className={styles.originalPrice}>${originalPrice}</span>
        </div>
        <div className={styles.rating}>
          {renderStars(rating)}
          <span className={styles.reviewCount}>({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;