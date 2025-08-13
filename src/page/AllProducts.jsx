import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import '../components/styles/Sections.scss'
import { fetchProducts } from "../store/features/productsSlice";
import ProductCard from "../components/products/ProductCard";
import NavigationHistory from "../components/navigationHistory/NavigationHistory";
import ProductsFilter from "../components/ProductsFilter/ProductsFilter";
import Sceleton from "../components/sceleton/Sceleton";


const AllProducts = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    const [datas, setDatas] = useState(products)

    useEffect(() => {
        setDatas(products)
    }, [products]);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])


    const history = [
        { text: "Main page", to: '/' },
        { text: "All products", to: '/products' }
    ]


    return (
        <div className="container">
            <div className="section">
                <NavigationHistory histores={history} />
                <div className='section__title'>
                    <h2>All products</h2>
                </div>
                <ProductsFilter products={products} setProducts={setDatas} />
                <div className="section__list">
                    {loading
                        ? Array.from({ length: 12 }).map((_, i) => (
                            <Sceleton key={i} />
                        ))
                        : datas.map((elem) => {
                            return <ProductCard product={elem} key={elem.id} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AllProducts