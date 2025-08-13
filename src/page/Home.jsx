import Header from "../components/header/Header"
import Categories from '../components/categories/Categories'
import DiscountForm from '../components/discountForm/DiscountForm'
import Products from "../components/products/Products"

const Home = () => {
  return (
    <div>
      <Header />
      <Categories />
      <DiscountForm />
      <Products />
   </div>

  )
}

export default Home