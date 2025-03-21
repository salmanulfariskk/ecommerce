import React from 'react';
import styles from './Banner.module.scss';
import { ChevronRight } from 'lucide-react';

// Define the props interface for TypeScript
interface BannerProps {
  logo?: string | React.ReactNode; // Logo can be a string (emoji) or a React node (e.g., an SVG)
  title: string; // e.g., "iPhone 14 Series"
  subtitle: string; // e.g., "Up to 10% off Voucher"
  ctaText: string; // e.g., "Shop Now"
  ctaLink: string; // e.g., "#"
  imageSrc: string; // e.g., URL for the banner image
  imageAlt: string; // e.g., "iPhone 14 Series"
  bannerHeight: string;
  carouselDots?: number; // Number of carousel dots
  activeDot?: number; // Index of the active dot (0-based)
}

const Banner: React.FC<BannerProps> = ({
  // logo = '🍎', // Default logo
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageSrc,
  imageAlt,
  bannerHeight,
  // carouselDots = 4, // Default to 4 dots
  // activeDot = 2, // Default active dot
}) => {
  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: bannerHeight,
      }}
      role="img"
      aria-label={imageAlt}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <div className={styles.textContent}>

            <h2>{title}</h2>
            <p>{subtitle}</p>
            <a href={ctaLink} className={styles.shopNow}>
              {ctaText} <ChevronRight />
            </a>
          </div>
          {/* <div className={styles.carouselDots}>
            {Array.from({ length: carouselDots }).map((_, index) => (
              <span
                key={index}
                className={index === activeDot ? styles.dotActive : styles.dot}
              ></span>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;