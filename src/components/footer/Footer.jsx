import './Footer.scss'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import MapEmbed from './MapEmbed'

const Footer = () => {
  return (
    <div className='footer'>
      <h2>Contact</h2>
      <div className='footer-container'>
        <div className='footer__info'>
          <div className='footer__phone'>
            <p className='footer__phone-name'>Phone</p>
            <a href="tel:+499999999999" className='footer__phone-value'>+49 999 999 99 99</a>
          </div>
          <div className='footer__socials'>
            <p className='footer__socials-name'>socials</p>
            <p className='footer__socials-value'>
              <a href='https://instagram.com/arm_vlad_'><FaInstagram size={44} /></a>
              <a href='https://wa.me/'><FaWhatsapp size={44} /></a>
            </p>
          </div>
          <div className='footer__address'>
            <p className='footer__address-name'>Address</p>
            <p className='footer__address-value'>Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland</p>
          </div>
          <div className='footer__hours'>
            <p className='footer__hours-name'>Working Hours</p>
            <p className='footer__hours-value'>24 hours a day</p>
          </div>
        </div>
        <div className='footer__map'>
          <MapEmbed />
        </div>
      </div>
    </div>
  )
}

export default Footer