import { NavLink } from 'react-router';
import './NavigationHistory.scss';


const NavigationHistory = ({histores}) => {
  return (
      <div className="navigationHistory">
        {histores.map((elem, i) => {
            if(i === histores.length - 1) {
              // последний элемент: текущая страница
            return <div key={i} className='navigationHistory__btn'><div key={i}
            className='navigationHistory__btn-notActive __active'>{elem.text}</div> </div>
            }
            // остальные элементы — ссылки
            return <div key={i} className='navigationHistory__btn'>
            <NavLink to={elem.to} ><div className='navigationHistory__btn-notActive'>{elem.text}</div></NavLink> 
            <div  className="navigationHistory__btn__linie"></div>
            </div>
        })}
        </div>
   
  )
}

export default NavigationHistory






