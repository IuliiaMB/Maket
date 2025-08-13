import cactus from '../../assets/cactus.png'
import { Link } from 'react-router'
import './NotFound.scss'

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__code">
        <img src={cactus} alt='' className="not-found__img"/></h1>
      <h2 className='not-found__title'>Page not found</h2>
      <p className='not-found__text'>We’re sorry, the page you requested could not be found.
        <br /> Please go back to the homepage.</p>
        <Link to="/" className="not-found__btn">Go Home</Link>
    </div>
  ) 
}

export default NotFound
