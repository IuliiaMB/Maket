import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../store/features/categoriesSlice"
import { useEffect } from "react"
import Category from "../components/categories/Category"
import NavigationHistory from "../components/navigationHistory/NavigationHistory"
import '../components/styles/Sections.scss'
import Sceleton from "../components/sceleton/Sceleton"

const Categories = () => {

  const dispatch = useDispatch()
  const { categories, loading, error } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const history = [
    { text: "Main page", to: '/' },
    { text: "Categories", to: '/categories' }
  ]


  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <div className="section">
        <NavigationHistory histores={history} />
        <div className='section__title'>
          <h2>Categories</h2>
        </div>
        
        <div className="section__list-five">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
              <Sceleton key={i} />
            ))
            : categories && categories.map((category) => {
              return <Category category={category} key={category.id} />
            })
          }
        </div>

      </div>
    </div>
  )
}

export default Categories

