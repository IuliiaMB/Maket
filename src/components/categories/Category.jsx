import { Link } from 'react-router'
import './Categories.scss'

const Category = ({ category }) => {
  return (
    <Link to={`/categoriesProduct/${category.id}`}>

      <div className="catedoryCard">
        <div className="catedoryCard__image">
          <img
            src={`${import.meta.env.APP_API_URL}${category.image}`}
            alt={category.title}
            className="category-image"
          />
        </div>
        <div className="catedoryCard__title">{category.title}</div>
      </div>

    </Link>
  )
}

export default Category