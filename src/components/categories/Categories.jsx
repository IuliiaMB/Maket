import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../store/features/categoriesSlice'
import Category from './Category'
import '../styles/Sections.scss'
import { NavLink } from 'react-router'
import Sceleton from '../sceleton/Sceleton'

const Categories = () => {
  const dispatch = useDispatch()
  const { categories, loading, error } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // функция, которая выбирает 4 случайных категории
  const getRandomCategories = () => {
    return [...categories]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
  }
  const randomCategories = getRandomCategories()

  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='container'>
      <div className='section'>
        <div className='section__title'><h2>Categories</h2>
          <div className="section__linie-wrapper">
            <div className="section__linie"></div>
            <NavLink to="/categories">
              <div className="section__btn">All categories</div>
            </NavLink>
          </div>
        </div>

        <div className="section__list">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <Sceleton key={i} />
            ))
            : randomCategories && randomCategories.map((category) => {
              return <Category category={category} key={category.title} />
            })
          }
        </div>

        <div className="section__linie-wrapper-mob">
          <NavLink to="/categories">
            <div className="section__btn-mob">All categories</div>
          </NavLink>
        </div>
        
      </div>
    </div>
  )
}

export default Categories