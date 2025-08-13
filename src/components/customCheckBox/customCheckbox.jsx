import './customCheckbox.scss'
import { FaCheck } from 'react-icons/fa6';

const CustomCheckbox = ({onChange, checked}) => {
    const handlerChecked = () => {
        onChange(!checked) // при клике меняем состояние (true -> false или наоборот)
    }
    return (
        <div className="customCheckbox" onClick={handlerChecked}>
            {checked && <div className='customCheckbox-checked'>
                <FaCheck /> </div>}
        </div>
    )
}  // когда пользовател кликает по чекбоксу, isDiscount меняеться

export default CustomCheckbox