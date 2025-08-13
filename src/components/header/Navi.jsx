import './Navi.scss';
import logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Modal from '../modal_window/Modal';
import { addProductsToCart } from '../../store/features/cartSlice';
import { IoClose } from 'react-icons/io5';
import { AiOutlineMoon } from 'react-icons/ai';
import { PiSun } from 'react-icons/pi';
import { HiMiniHeart, HiOutlineHeart } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { NavLink } from 'react-router';
import { getLikedProducts } from '../../store/features/productsSlice';
import { useTheme } from '../../theme/ThemeContext';

const Navi = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { products, likedProducts } = useSelector(state => state.products)
    const { cart } = useSelector(state => state.cart)

    const [randomProduct, setRandomProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const isFavorite = randomProduct && likedProducts.includes(randomProduct.id);
    const handleFavoriteClick = () => {
        if (randomProduct) {
            dispatch(getLikedProducts(randomProduct.id));
        }
    };

    const cartItems = useSelector(state => state.cart.cart)
    const productInCart = randomProduct && cartItems.find((item) => item.id === randomProduct.id);
    const isInCart = !!productInCart;

    const { theme, toggleTheme } = useTheme();

    const toggleBurgerMenu = () => {
        setIsOpen(!isOpen); // при каждом клике будет записываться противоположное значение
    };

    useEffect(() => {
        const savedProduct = localStorage.getItem('dailyDiscountProduct');
        if (savedProduct) {
            const { product, timestamp } = JSON.parse(savedProduct);
            const now = new Date().getTime();

            // Если прошло больше 24 часов — очищаем localStorage
            if (now - timestamp >= 86400000) {
                localStorage.removeItem('dailyDiscountProduct');
            } else {
                // Если не прошло — устанавливаем сохранённый товар
                setRandomProduct(product);
            }
        }
    }, []);

    //открытие модалки с рандомным товаром
    const handleOpenModal = () => {
        if (products.length === 0) return;

        const savedProduct = localStorage.getItem('dailyDiscountProduct');
        const now = new Date().getTime();

        let productToShow;

        if (savedProduct) {
            const { product, timestamp } = JSON.parse(savedProduct);

            // Если не прошло больше 24 часов — используем сохранённый товар
            if (now - timestamp < 86400000) {
                productToShow = product;
            }
        }

        if (!productToShow) {
            // Если нет сохранённого товара или он устарел, выбираем новый
            const randomIndex = Math.floor(Math.random() * products.length);
            productToShow = products[randomIndex];

            localStorage.setItem('dailyDiscountProduct', JSON.stringify({
                product: productToShow,
                timestamp: now
            }));
        }

        setRandomProduct(productToShow);
        setIsModalOpen(true);
    };

    //добавление товара в корзину с 50% скидкой
    const handleAddToCart = () => {
        if (!randomProduct) return;

        const productWithDiscount = {
            ...randomProduct,
            discont_price: parseFloat((randomProduct.price * 0.5).toFixed(2))
        };

        dispatch(addProductsToCart(productWithDiscount));
        setIsModalOpen(false);
    };


    return (
        <>
            <div className="navi">
                <div className={`navi__container ${isOpen ? 'navi__container--open' : ''}`}>
                    {isOpen && <div className='navi-bg-black'></div>}
                    <div className="navi__left">
                        <img className="navi__container__logo" src={logo} alt="logo" />

                        <div className={'navi__container__mode ' + (theme === 'dark' ? 'dark' : 'light')} onClick={toggleTheme}>
                            <div className='navi__container__mode-boll'></div>
                            <PiSun className='navi__container__mode-sun' />
                            <AiOutlineMoon className='navi__container__mode-moon' />

                        </div>
                    </div>

                    <div className="navi__center">
                        <div className="navi__promo" onClick={handleOpenModal}>1 day discount!</div>
                        <nav className="navi__menu">
                            <ul className="navi__menu-list">
                                <li className="navi__menu-item">
                                    <NavLink to="/" >Main Page</NavLink>
                                </li>
                                <li className="navi__menu-item">
                                    <NavLink to="/categories" >Categories</NavLink>
                                </li>
                                <li className="navi__menu-item">
                                    <NavLink to="/products" >All products</NavLink>
                                </li>
                                <li className="navi__menu-item">
                                    <NavLink to="/sales" >All sales</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="navi__right">
                        <span className="navi__right-icon">
                            <NavLink to="/products/likedProducts">
                                <HiMiniHeart />
                            </NavLink>
                            <span className="navi__right-icon-count">{likedProducts.length}</span>
                        </span>

                        <span className="navi__right-icon">
                            <NavLink to="/cart" className="navi__icon-link">
                                <HiOutlineShoppingBag />
                            </NavLink>
                            <span className="navi__right-icon-count">{cart.length}</span>
                        </span>
                    </div>

                    <div className="navi__burger" onClick={toggleBurgerMenu}>
                        <div className="navi__burger-line"></div>
                        <div className="navi__burger-line"></div>
                        <div className="navi__burger-line"></div>
                        <div className="navi__burger-line"></div>
                    </div>

                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        {randomProduct && (
                            <div className="discount-modal">
                                <div className="discount-title-container">
                                    <h2 className="discount-title">50% discount on product of the day!</h2>
                                    <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                                        <IoClose />
                                    </button>
                                </div>


                                <div className='product-container'>
                                    <div className="product-image-container">
                                        <img
                                            src={`${import.meta.env.APP_API_URL}${randomProduct.image}`}
                                            alt={randomProduct.title}
                                            className="product-image"
                                        />
                                        <div className="discount-badge">-50%</div>
                                        <div className='product__icons'>
                                            <div className='product__icons-item'>
                                                <span
                                                    className={`product__icons-heart-fill ${isFavorite ? 'liked' : ''}`}
                                                    onClick={handleFavoriteClick}>
                                                    <HiMiniHeart />
                                                </span>
                                                <span className={`product__icons-heart-stroke ${isFavorite ? 'hidden' : ''}`}>
                                                    <HiOutlineHeart />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='product-divider' />
                                    <div className="product-info">
                                        <h3 className="product-name">{randomProduct.title}</h3>

                                        <div className="price-wrapper">
                                            <span className="current-price">
                                                ${(randomProduct.price * 0.5).toFixed(2)}
                                            </span>
                                            <span className="old-price">
                                                ${randomProduct.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="addToCart-container">
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={handleAddToCart}>
                                        {isInCart ? 'Added' : 'Add to cart'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
            <div className='navi-margin'></div>
        </>
    );
};

export default Navi;