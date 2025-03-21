
import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { CircleX, Heart, Menu, Search, ShoppingCart } from 'lucide-react';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <p className={styles.promo}>
          Summer Sale for all Suits and Free Express Delivery - OFF 50%!{' '}
          <a href="#" className={styles.shopNow}>
            Shop Now
          </a>
        </p>
        <div className={styles.languageSelector}>
          <select defaultValue="English">
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>Exclusive</h1>

        {/* Hamburger Icon for Mobile */}
        <button className={styles.hamburger} onClick={toggleMenu}>
          {isMenuOpen ? <CircleX />:<Menu />}
        </button>

        {/* Navigation Links */}
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/product">Product</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/signup">Sign Up</a></li>
        </ul>

        {/* Actions (Search, Favorites, Cart) */}
        <div className={styles.actions}>
          <div className={styles.searchBar}>
            <input type="text" placeholder="What are you looking for?" />
            <span className={styles.searchIcon}><Search/></span>
          </div>
          <button className={styles.iconButton}>
            <span className={styles.favoriteIcon}><Heart/></span>
          </button>
          <button className={styles.iconButton}>
            <span className={styles.cartIcon}><ShoppingCart/></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;