import styles from './Footer.module.scss';
import { Facebook, Twitter, Instagram, Linkedin, } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <h3>Exclusive</h3>
          <h4>Subscribe</h4>
          <p>Get 10% off your first order</p>
          <form className={styles.subscribeForm}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2L18 10L10 18L8.6 16.6L14.2 11H2V9H14.2L8.6 3.4L10 2Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>
        </div>

        <div className={styles.footerColumn}>
          <h3>Support</h3>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        <div className={styles.footerColumn}>
          <h3>Account</h3>
          <ul>
            <li><a href="#">My Account</a></li>
            <li><a href="#">Login / Register</a></li>
            <li><a href="#">Cart</a></li>
            <li><a href="#">Wishlist</a></li>
            <li><a href="#">Shop</a></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3>Quick Link</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms Of Use</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3>Download App</h3>
          <p>Save $3 with App New User Only</p>
          <div className={styles.appLinks}>
            <div className={styles.qrCode}>
              <img
                src="https://imgs.search.brave.com/00rypfkTvzFKH_OvN-ux7yV4T7b-Rn_c9DWtdBvGdIs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naXRo/dWIuY29tL2VuZHJv/aWQvcXItY29kZS9y/YXcvbWFpbi8uZ2l0/aHViL2V4YW1wbGUu/cG5n"
                alt="QR Code for Google Play"
              />
            </div>
            <div className={styles.storeButtons}>
              <a href="#">
                <img
                  src="https://imgs.search.brave.com/tRoH29rt20089_SUfudS42Q197Izbu3uo5fz1v1la6Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbGF5/Lmdvb2dsZS5jb20v/aW50bC9lbl91cy9i/YWRnZXMvaW1hZ2Vz/L2dlbmVyaWMvZW5f/YmFkZ2Vfd2ViX2dl/bmVyaWMucG5n"
                  alt="Get it on Google Play"
                />
              </a>
              <a href="#">
                <img
                  src="https://imgs.search.brave.com/zkbUGVgXn1M8tiHBbiwr2UTWR9JF2yfXDK_8aSFwz40/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXZl/bG9wZXIuYXBwbGUu/Y29tL2Fzc2V0cy9l/bGVtZW50cy9iYWRn/ZXMvZG93bmxvYWQt/b24tdGhlLWFwcC1z/dG9yZS5zdmc"
                  alt="Download on the App Store"
                />
              </a>
            </div>
          </div>
          <div className={styles.socialIcons}>
            <a href="#"><Facebook /></a>
            <a href="#"><Twitter /></a>
            <a href="#"><Instagram /></a>
            <a href="#"><Linkedin /></a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; Copyright Rimel 2022. All right reserved</p>
      </div>
    </footer>
  );
};
