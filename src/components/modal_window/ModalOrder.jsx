import './ModalOrder.scss'
import { AiOutlineClose } from "react-icons/ai";

const ModalOrder = ({close, isOpen}) => {
  if(isOpen === false) return null;
  return (
    <div className="modal-order">
      <div className="modal-order__content">
        <h1 className="modal-order__content__title">Congratulations! </h1>
        <p className="modal-order__content__text modal-order__content__text1">
          Your order has been successfully placed on the website.
        </p>
        <p className="modal-order__content__text">A manager will contact you shortly to confirm your order.</p>
        <button className="modal-order__content__button" onClick={close}>

          <AiOutlineClose className="modal-order__content__button-icone-close"/>

        </button>

      </div>

    </div>
  )
}

export default ModalOrder