import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../products/ProductCard'
import '../styles/Sections.scss'
import { fetchProducts } from '../../store/features/productsSlice'
import { NavLink } from 'react-router'
import Sceleton from '../sceleton/Sceleton'

const Products = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // функция, которая фильтрует все продукты, оставля только со скидками и вибирает из них 4 случайных
  const discountProducts = useMemo(() => {
    const discounted = products.filter(p => p.discont_price !== null)
    const shuffled = discounted.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 4)
  }, [products])

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='container'>
      <div className='section'>
        <div className='section__title'>
          <h2>Sale</h2>
          <div className='section__linie-wrapper'>
            <div className='section__linie'></div>
            <NavLink to="/sales"><div className='section__btn'>All sales</div></NavLink>
          </div>
        </div>

        <div className="section__list">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <Sceleton key={i} />
            ))
            : discountProducts && discountProducts.map((product) => {
              return <ProductCard product={product} key={product.id} />
            })
          }
        </div>

        <div className="section__linie-wrapper-mob">
          <NavLink to="/categories">
            <div className="section__btn-mob">All sales</div>
          </NavLink>
        </div>


      </div>
    </div>
  )
}

export default Products