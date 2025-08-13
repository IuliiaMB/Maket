import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductCard from "../components/products/ProductCard";
import '../components/styles/Sections.scss'
import NavigationHistory from "../components/navigationHistory/NavigationHistory";
import ProductsFilter from "../components/ProductsFilter/ProductsFilter";
import { fetchProducts } from "../store/features/productsSlice";
import Sceleton from "../components/sceleton/Sceleton";


const AllSales = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);
    const [datas, setDatas] = useState(products)

    useEffect(() => {
        setDatas(products.filter((elem) => elem.discont_price))
    }, [products]);


    const history = [
        { text: "Main page", to: '/' },
        { text: "All sales", to: '/products' }
    ]

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <div className="container">
            <div className="section">
                <NavigationHistory histores={history} />
                <div className='section__title'>
                    <h2>Discounted items</h2>
                </div>
                <ProductsFilter isDiscount={false} products={products} setProducts={setDatas} />
                <div className="section__list">
                    {loading
                        ? Array.from({ length: 12 }).map((_, i) => (
                            <Sceleton key={i} />
                        ))
                        : datas && datas.map((product) => {
                            return <ProductCard product={product} key={product.id} />
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default AllSales