import { Camera, ChevronLeft, ChevronRight, Gamepad, Headphones, Menu, Monitor, ShieldCheck, Smartphone, Truck, Watch } from "lucide-react";
import Navbar from "../../components/Home/Navbar";
import styles from "./HomePage.module.scss"
import { useCallback, useEffect, useRef, useState } from "react";
import Banner from "../../components/Home/Banner";
// import { useSelector } from "react-redux";
import ProductCard from "../../components/Home/ProductCard";
import Footer from "../../components/Home/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchProducts } from "../../features/products/productSlice";


// interface Product {
//     _id: string;
//     title: string;
//     description: string;
//     price: number;
//     imageUrl: string;
//     category: string;
//     rating: number;
// }

// interface ProductsState {
//     products: Product[];
//     loading: boolean;
//     error: string | null;
// }
interface Category {
    name: string;
    icon: React.ReactNode;
    isHighlighted?: boolean;
}

const fashonCategories = [
    "Women's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
];
export default function HomePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 23,
        minutes: 19,
        seconds: 56,
    });

    const fetchProductsMemoized = useCallback(() => {
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        fetchProductsMemoized();
    }, [fetchProductsMemoized]);

    // Countdown Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }
                if (hours < 0) {
                    hours = 23;
                    days--;
                }
                if (days < 0) {
                    clearInterval(timer);
                    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    console.log(products)
    if (loading) return <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
    </div>;
    if (error) return <p>Error: {error}</p>;

    const categories: Category[] = [
        { name: 'Phones', icon: <Smartphone size={40} /> },
        { name: 'Computers', icon: <Monitor size={40} /> },
        { name: 'SmartWatch', icon: <Watch size={40} /> },
        { name: 'Camera', icon: <Camera size={40} /> },
        { name: 'Headphones', icon: <Headphones size={40} /> },
        { name: 'Gaming', icon: <Gamepad size={40} /> },
    ];
    const services = [
        {
            icon: <Truck />,
            title: 'FREE AND FAST DELIVERY',
            description: 'Free delivery for all orders over $140',
        },
        {
            icon: <Headphones />,
            title: '24/7 CUSTOMER SERVICE',
            description: 'Friendly 24/7 customer support',
        },
        {
            icon: <ShieldCheck />,
            title: 'MONEY BACK GUARANTEE',
            description: 'We return money within 30 days',
        },
    ];

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -300, // Adjust based on card width
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: 300, // Adjust based on card width
                behavior: 'smooth',
            });
        }
    };
    return (
        <>
            <Navbar />
            <section className={styles.sidebarSection}>

                <div className={styles.sidebarWrapper}>
                    <button className={styles.sidebarToggle} onClick={toggleSidebar}>
                        <Menu />
                    </button>
                    <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
                        <ul className={styles.categoryList}>
                            {fashonCategories.map((category, index) => (
                                <li key={index} className={styles.categoryItem}>
                                    <a href={`#${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                                        {category}
                                        {index < 2 && <ChevronRight className={styles.arrowIcon} />}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
                <div className={styles.sideBanner}>
                    <Banner
                        logo="🍎"
                        title="iPhone 14 Series"
                        subtitle="Up to 10% off Voucher"
                        ctaText="Shop Now"
                        ctaLink="#"
                        bannerHeight="350px"
                        imageSrc="https://about.att.com/ecms/dam/snr/2022/september2022/storylevelbanner/iconic_STORY_LEVEL_BANNER_1600x483.jpg"
                        imageAlt="iPhone 14 Series"
                        carouselDots={4}
                        activeDot={2}
                    />
                </div>
            </section>
            {/* Flash Sales Section */}
            <section className={styles.flashSales}>
                <div className={styles.todayHeader}>
                    <div className={styles.todayTitleWrapper}>
                        <span className={styles.todayIndicator}></span>
                        <h2>Today's</h2>
                    </div>
                </div>
                <div className={styles.header}>
                    <div className={styles.combain}>
                        <div className={styles.titleWrapper}>
                            <span className={styles.indicator}></span>
                            <h2>Flash Sales</h2>
                        </div>
                        <div className={styles.timer}>
                            <div>
                                <span>Days</span>
                                <h3>{String(timeLeft.days).padStart(2, '0')}</h3>
                            </div>
                            <span className={styles.colon}>:</span>
                            <div>
                                <span>Hours</span>
                                <h3>{String(timeLeft.hours).padStart(2, '0')}</h3>
                            </div>
                            <span className={styles.colon}>:</span>
                            <div>
                                <span>Minutes</span>
                                <h3>{String(timeLeft.minutes).padStart(2, '0')}</h3>
                            </div>
                            <span className={styles.colon}>:</span>
                            <div>
                                <span>Seconds</span>
                                <h3>{String(timeLeft.seconds).padStart(2, '0')}</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.arrows}>
                        <button><ChevronLeft /></button>
                        <button><ChevronRight /></button>
                    </div>
                </div>
                <div className={styles.products}>
                    {products.map((product, index) => (
                        (index < 4 && <ProductCard
                            key={index}
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
                        />)
                    ))}
                </div>
                <div className={styles.viewAll}>
                    <button className={styles.viewAllButton}>View All Products</button>
                </div>
            </section>

            <div className={styles.line}></div>

            <section className={styles.categorySection}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <span className={styles.indicator}></span>
                        <h2>Categories</h2>
                    </div>
                    <div className={styles.combainWrapper}>
                        <h1>Browse By Category</h1>
                        <div className={styles.arrows}>
                            <button onClick={scrollLeft} aria-label="Scroll left">
                                <ChevronLeft />
                            </button>
                            <button onClick={scrollRight} aria-label="Scroll right">
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.carousel} ref={carouselRef}>
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={styles.categoryCard}
                        >
                            {category.icon}
                            <p>{category.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className={styles.line}></div>

            <section className={styles.bestSelling}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <span className={styles.indicator}></span>
                        <h2>This Month</h2>
                    </div>
                    <div className={styles.combainWrapper}>
                        <h1>Best Selling Products</h1>
                        <button className={styles.viewAllButton}>View All</button>
                    </div>
                </div>
                <div className={styles.products}>
                    {products.map((product, index) => (
                        (index < 4 && <ProductCard
                            key={index}
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
                        />)
                    ))}
                </div>
            </section>
            <section className={styles.fullBanner}>
                <Banner
                    logo="🍎"
                    title="iPhone 14 Series"
                    subtitle="Up to 10% off Voucher"
                    ctaText="Shop Now"
                    ctaLink="#"
                    bannerHeight="400px"
                    imageSrc="https://www.businessmobiles.com/wp-content/uploads/2022/09/Bottom-image-iPhone-14-Available.jpg"
                    imageAlt="iPhone 14 Series"
                    carouselDots={4}
                    activeDot={2}
                />
            </section>

            <section className={styles.explore}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <span className={styles.indicator}></span>
                        <h2>This Month</h2>
                    </div>
                    <div className={styles.combainWrapper}>
                        <h1>Best Selling Products</h1>
                        <div className={styles.arrows}>
                            <button onClick={scrollLeft} aria-label="Scroll left">
                                <ChevronLeft />
                            </button>
                            <button onClick={scrollRight} aria-label="Scroll right">
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.products}>
                    {products.map((product, index) => (
                        (index < 8 && <ProductCard
                            key={index}
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
                        />)
                    ))}
                </div>
                <div className={styles.viewAll}>
                    <button className={styles.viewAllButton}>View All Products</button>
                </div>
            </section>



            <section className={styles.featured}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <span className={styles.indicator}></span>
                        <h2>Featured</h2>
                    </div>
                    <div className={styles.combainWrapper}>
                        <h1>New Arrival</h1>
                    </div>
                </div>
                <div className={styles.featuredgrid}>
                    <div className={styles.featuredCard1}>
                        <Banner
                            title="PlayStation 5"
                            subtitle="Black and White version of the PS5 coming out on sale."
                            ctaText="Shop Now"
                            ctaLink="#"
                            bannerHeight="100%"
                            imageSrc="https://imgs.search.brave.com/pm39mjBi5nmvFt5VL4DgpDiFSjuF_fYgnBfBUvBzSbM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ib2wu/aW1hZ2VzLmNvbnRl/bnRzdGFjay5ldS92/My9hc3NldHMvYmx0/ZjgxNGU5Zjc4YmU1/MmI5My9ibHRiYzc0/MjRjNGIzMDliYWMy/LzY1YjM4MDg3OGEy/OGNiMDQwYTBiOTQ1/Zi9CT0xfUFM1LVNs/aW14Mi5wbmc_ZW52/aXJvbm1lbnQ9Ymx0/MGZiMTJhZWIzOGM3/NjExMyZsb2NhbGU9/bmwtbmwmZm9ybWF0/PXBqcGcmcXVhbGl0/eT04MCZhdXRvPXdl/YnAmd2lkdGg9NjQw/JmNyb3A9MTox"
                            imageAlt="PlayStation 5"
                        />
                    </div>
                    <div className={styles.featuredCard}>
                        <Banner
                            title="Women’s Collections"
                            subtitle="Featured woman collections that give you another vibe."
                            ctaText="Shop Now"
                            ctaLink="#"
                            bannerHeight="100%"
                            imageSrc="https://imgs.search.brave.com/a4bhh9cgaKvKxBwtR8i0wDwGca-fddPkX1qfYwQx3To/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzk2LzY2LzA4/LzM2MF9GXzk2NjYw/ODYwX1lQT2R5TnhI/dDY3Q3k3Sno0Sndv/RWhwQWh2MHBYNjl2/LmpwZw"
                            imageAlt="Women’s Collections"
                        />
                    </div>
                    <div className={styles.bottomRightContainer}>
                        <div className={styles.featuredCard}>
                            <Banner
                                title="Speakers"
                                subtitle="Amazon wireless speakers"
                                ctaText="Shop Now"
                                ctaLink="#"
                                bannerHeight="100%"
                                imageSrc="https://imgs.search.brave.com/dIam8uZlUTYt9WqG5KNAG25OTsUhgXuBpfJAjwvPitg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zb3VuZC1zcGVh/a2VyLWRhcmstYmFj/a2dyb3VuZC13aXRo/LWNvcHktc3BhY2Ut/Y2xvc2UtdXAtYWNv/dXN0aWMtc3Vid29v/ZmVyXzc3MTkwLTEw/MTM2LmpwZz9zZW10/PWFpc19oeWJyaWQ"
                                imageAlt="Speakers"
                            />
                        </div>
                        <div className={styles.featuredCard}>
                            <Banner
                                title="Perfume"
                                subtitle="GUCCI INTENSE OUD EDP"
                                ctaText="Shop Now"
                                ctaLink="#"
                                bannerHeight="100%"
                                imageSrc={"../../../public/perfume.jpg"}
                                imageAlt="Perfume"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.services}>
                <div className={styles.servicesWrapper}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.serviceCard}>
                            <div className={styles.iconWrapper}>
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}