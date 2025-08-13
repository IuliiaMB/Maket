import './Header.scss'
import headerImage from '../../assets/header.jpg';
import { NavLink } from 'react-router';

const Header = () => {
  
  return (

      <div className='container'>
        <div className='header'>
          <div className='header__image'>
            <img src={headerImage} alt="" />
            <div className='header__overlay'></div>

            <div className='header__info'>
              <h1 className='header__info-title'>Amazing Discounts on Garden Products!</h1>
              <NavLink to="/cart" className="navi__icon-link"><button className='header__info-checkOut'>Check out</button></NavLink>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Header