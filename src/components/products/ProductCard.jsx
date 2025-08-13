import './Products.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getLikedProducts } from '../../store/features/productsSlice';
import { addProductsToCart } from '../../store/features/cartSlice';
import { HiOutlineHeart, HiMiniHeart } from "react-icons/hi2";
import { Link } from 'react-router'
import { HiShoppingBag, HiOutlineShoppingBag } from "react-icons/hi";


const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { likedProducts } = useSelector(state => state.products)
  const cartItem = useSelector(state => state.cart.cart)
  const isLiked = likedProducts.includes(product.id)
  const isInCart = cartItem.find(item => item.id === product.id) !== undefined;

  // функция которая загружает понравившиеся продокуты из массива, если они там есть или удалет при поваторном нажатии сердечка
  const handleLikedProducts = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(getLikedProducts(product.id))
  }

  // функция добавления продукта в корзину
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addProductsToCart(product))
  }

  return (
    <div className="productCard">
      
      <div className="productCard__image">
        <Link to={`/product/${product.id}`}>
          <img
            src={`${import.meta.env.APP_API_URL}${product.image}`}
            alt={product.title}
            className="product-image"
          />
          {product.discont_price && (
            <div className='productCard__percentage'>
              -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
            </div>
          )}
        </Link>

        <div className='productCard__icons'>
          <div className='productCard__icons-item'>
            <span
              className={`productCard__icons-heart-fill ${isLiked ? 'liked' : ''}`}
              onClick={handleLikedProducts}>
              <HiMiniHeart />
            </span>
            <span className={`productCard__icons-heart-stroke ${isLiked ? 'hidden' : ''}`}>
              <HiOutlineHeart />
            </span>
          </div>

          <div className='productCard__icons-item'>
            <span
              className={`productCard__icons-hoppingBag-fill ${isInCart ? 'liked' : ''}`}
              onClick={handleAddToCart}>
              <HiShoppingBag />
            </span>
            <span className={`productCard__icons-hoppingBag-stroke ${isInCart ? 'hidden' : ''}`}>
              <HiOutlineShoppingBag />
            </span>
          </div>
        </div>
      </div>

      <div className='productCard__info'>
        <Link to={`/product/${product.id}`}>
          <div className="productCard__title">{product.title}</div>
          <div className='productCard__price'>
            <span className='productCard__price-norm'>${product.discont_price || product.price}</span>
            {product.discont_price && <span className='productCard__price-discount'> ${product.price}</span>}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard