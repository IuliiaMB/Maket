import { Route, Routes, useLocation } from 'react-router'
import './App.scss'
import Layout from './components/layout/Layout'
import Home from './page/Home'
import Categories from './page/Categories'
import AllProducts from './page/AllProducts'
import AllSales from './page/AllSales'
import NotFound from './page/NotFound/NotFound'
import CategoryProduct from './page/CategoryProduct'
import LikedProducts from './page/LikedProducts'
import Cart from './page/Cart/Cart'
import ProductPage from './page/productPage/ProductPage'
import './components/styles/productCount.scss'
import { useEffect } from 'react'

function App() {

    const location = useLocation();

  useEffect(() => {
   window.scrollTo(0, 0) // это функция которая при вызове поднимает страницу на скрол 0
  }, [location.pathname]); // Делаем юзефект который будет работать каждый раз когда меняется урл адрес на странице

  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='categories' element={<Categories />}/>
          <Route path='categoriesProduct/:categoryId' element={<CategoryProduct/>}/>
          <Route path='products' element={<AllProducts />}/>
          <Route path='products/likedProducts' element={<LikedProducts />}/>
          <Route path='sales' element={<AllSales />}/>
          <Route path='cart' element={<Cart />}/>
          <Route path='*' element={<NotFound />}/>
          <Route path="/product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
  )
}

export default App
