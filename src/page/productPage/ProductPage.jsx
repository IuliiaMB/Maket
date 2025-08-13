import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NavigationHistory from "../../components/navigationHistory/NavigationHistory";
import "./ProductPage.scss";
import '../../components/styles/productCount.scss';
import { fetchCategories } from "../../store/features/categoriesSlice";
import { getLikedProducts } from "../../store/features/productsSlice";
import { HiMiniHeart, HiOutlineHeart } from "react-icons/hi2";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { incrementCart, decrementCart, addProductsToCart } from "../../store/features/cartSlice";

const ProductPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState(null);

  const { categories } = useSelector((state) => state.categories)
  const category = product && categories.find(cat => cat.id === product.categoryId);

  const cartItems = useSelector((state) => state.cart.cart);
  const productInCart = product && cartItems.find((item) => item.id === product.id);
  const isInCart = !!productInCart;
  const [quantity, setQuantity] = useState(1);


  const [isMore, setIsMore] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const { likedProducts } = useSelector((state) => state.products);
  const isLiked = product && likedProducts.includes(product.id);


  useEffect(() => {
    const found = products.find((p) => p.id === +id);
    if (found) setProduct(found);
  }, [products, id]);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (productInCart) {
      setQuantity(productInCart.count);
    }
  }, [productInCart]);

  if (!product) return <div>Loading...</div>;

  const percentage = product.discont_price
    ? Math.round(((product.price - product.discont_price) / product.price) * 100)
    : 0;

  const imageUrl = `${import.meta.env.APP_API_URL}${product.image}`;

  const history = [
    { text: "Main page", to: "/" },
    { text: "All products", to: "/products" },
    { text: category?.title || "Category", to: `/categoriesProduct/${product.categoryId}` },
    { text: product?.title || "Product details" },
  ];

  const getMoreText = (text, length) => {
    return text.slice(0, length);
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addProductsToCart({ ...product, count: quantity }));
    }
  };

  const handleLikedProducts = () => {
    dispatch(getLikedProducts(product.id))
  }

  const handleIncrement = () => {
    if (isInCart) {
      dispatch(incrementCart(product.id));
    } else {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (isInCart && quantity > 1) {
      dispatch(decrementCart(product.id));
    } else if (!isInCart && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="container productPageContainer">
      <div className="section">
        <NavigationHistory histores={history} />
      </div>
      <div className="product__title_mob">
        <h1 className="product__title ">{product.title}</h1>
        <div className="product__icons product__icons_mob">
          <div className="product__icons-item">
            <span className={`product__icons-heart-fill ${isLiked ? 'liked' : ''}`}
              onClick={handleLikedProducts}>
              <HiMiniHeart />
            </span>
            <span className={`product__icons-heart-stroke ${isLiked ? 'hidden' : ''}`}>
              <HiOutlineHeart />
            </span>
          </div>
        </div>

      </div>
      <div className="product__content">
        <div className="product__image-block">
          <div className="product__image">
            <img
              src={imageUrl}
              alt={product.title}
              onClick={() => setIsImageOpen(true)}
            />
          </div>
        </div>

        <div className="product__info">
          <div className="product__header">
            <h1 className="product__title product__title_comp">{product.title}</h1>
            <div className="product__icons product__icons_comp">
              <div className="product__icons-item">
                <span className={`product__icons-heart-fill ${isLiked ? 'liked' : ''}`}
                  onClick={handleLikedProducts}>
                  <HiMiniHeart />
                </span>
                <span className={`product__icons-heart-stroke ${isLiked ? 'hidden' : ''}`}>
                  <HiOutlineHeart />
                </span>
              </div>
            </div>
          </div>

          <div className="product__price">
            <span className="product__price-current">
              ${product.discont_price || product.price}
            </span>

            {product.discont_price && (
              <>
                <span className="product__price-old">${product.price}</span>
                <span className="product__discount">-{percentage}%</span>
              </>
            )}
          </div>

          <div className="product__controls">
            <div className="cart__info-count">
              <div className="cart__info-count-decrement" onClick={handleDecrement}>
                <AiOutlineMinus className="cart__info-count-icon-btn" />
              </div>
              <div className="cart__info-count-namber">{quantity}</div>
              <div className="cart__info-count-increment" onClick={handleIncrement}>
                <AiOutlinePlus className="cart__info-count-icon-btn" />
              </div>
            </div>
            <button className={`product__add-button ${isInCart ? 'addeded' : ''}`} onClick={handleAddToCart}>{isInCart ? 'Added' : 'Add to cart'}</button>
          </div>

          <div className={`product__description product__description__comp ${isMore ? "expanded" : ""}`}>
            <h3>Description</h3>
            <p>
              {isMore
                ? product.description
                : `${getMoreText(product.description, 200)}...`}
            </p>

            {product.description.length > 100 && (
              <button
                className="product__read-more"
                onClick={() => setIsMore(!isMore)}
              >
                {isMore ? "Hide description" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={`product__description product__description__mob ${isMore ? "expanded" : ""}`}>
        <h3>Description</h3>
        <p>
          {isMore
            ? product.description
            : `${getMoreText(product.description, 200)}...`}
        </p>

        {product.description.length > 100 && (
          <button
            className="product__read-more"
            onClick={() => setIsMore(!isMore)}
          >
            {isMore ? "Hide description" : "Read more"}
          </button>
        )}
      </div>

      {isImageOpen && (
        <div className="product__modal" onClick={() => setIsImageOpen(false)}>
          <img
            src={imageUrl}
            alt={product.title}
            className="product__modal-image"
          />
        </div>
      )}
    </div>
  );
};

export default ProductPage;