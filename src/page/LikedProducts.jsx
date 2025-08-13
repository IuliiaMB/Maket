import { useDispatch, useSelector } from 'react-redux'
import '../components/styles/Sections.scss'
import ProductCard from '../components/products/ProductCard'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../store/features/productsSlice'
import Sceleton from '../components/sceleton/Sceleton'
import ProductsFilter from '../components/ProductsFilter/ProductsFilter'
import NavigationHistory from '../components/navigationHistory/NavigationHistory'

const LikedProducts = () => {
  const dispatch = useDispatch()
  const { likedProducts, products, loading } = useSelector(state => state.products)
  const [originDatas, setOriginDatas] = useState([])
  const [datas, setDatas] = useState([])

  useEffect(() => {
    const liked = products.filter(product =>
      likedProducts.includes(product.id)
    );
    setOriginDatas(liked);
    setDatas(liked);
}, [products, likedProducts]);

 
  // повторяю dispatch(fetchProducts(), чтобы после перезагрузки страницы продукты загружались с сервера и потом отображались на этой странице используя LocalStorage (там сохраняются индексы необходимых продуктов)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const history = [
    { text: "Main page", to: '/' },
    { text: "Liked products", to: '/' }
  ]


  return (
    <div className='container'>
      <div className='section'>
        <NavigationHistory histores={history} />
        <div className='section__title'>
          <h2>Liked products</h2>
        </div>
        <ProductsFilter products={originDatas} setProducts={setDatas} isDiscount={false} />
        <div className="section__list">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <Sceleton key={i} />)
          ) : (
            datas.length > 0 ? (
              datas.map(product => <ProductCard product={product} key={product.id} />)
            ) : (
              <p className='section__no-liked-products'>No liked products</p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default LikedProducts