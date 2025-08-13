import { useDispatch, useSelector } from "react-redux";
import { decrementCart, incrementCart, removeCart, sendOrderRequest } from "../../store/features/cartSlice";
import "../../components/styles/Sections.scss";
import "./Cart.scss";
import { useEffect, useState } from "react";
import ModalOrder from "../../components/modal_window/ModalOrder";
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";

// Загружаем данные формы из localStorage
const savedForm = JSON.parse(localStorage.getItem("cart-form")) || {
  name: "",
  tel: "",
  email: "",
};

const Cart = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cart);

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: savedForm,
    mode: "onBlur", // Валидация при уходе с поля
  });

  // Сохраняем изменения формы в localStorage
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("cart-form", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    reset({
      name: "",
      tel: "",
      email: ""
    })

    dispatch(sendOrderRequest(data))

    // Если ошибок нет, открываем модалку
    setIsOpen(true);
  };

  // Функции для управления корзиной
  const handleIncrementCart = (id) => {
    dispatch(incrementCart(id));
  };

  const handleDecrementCart = (id) => {
    dispatch(decrementCart(id));
  };

  const handleRemoveCart = (id) => {
    dispatch(removeCart(id));
  };

  const total = cartItem.reduce((acc, item) => {
    const price = item.discont_price || item.price;
    return acc + price * item.count;
  }, 0);



  return (
    <div className="container cartContainer">
      <div className="section">
          <div className='titleBtn'>
            <h2>Shopping cart</h2>
            <div className='titleBtn__linie'>
                <div className='titleBtn__linie-el'></div>
            </div>
            <div className='titleBtn__btn'>

                <NavLink to={'/'}><div className='titleBtn__btn-elem' style={{ bottom : -24 }}>Back to the store</div></NavLink>
            </div>
        </div>

        <div className="cart">
          <div className="cart__items">
            {cartItem.length === 0 ? (
              <div className="cart__items__shopping">
                <p className="cart__items__shopping-text">Looks like you have no items in your basket currently.</p>
                <NavLink to="/products" ><button className="cart__items__shopping-btn">Continue Shopping</button></NavLink>
              </div>

            ) : (
              cartItem.map((item) => (
                <NavLink
                  to={`/product/${item.id}`}
                  className="cart__productCard"
                  key={item.id}
                >
                  <div className="cart__productCard" key={item.id}>
                    <div className="cart__image">
                      <img
                        src={`${import.meta.env.APP_API_URL}${item.image}`}
                        alt={item.title}
                      />
                    </div>
                    <div className="cart__info" onClick={(e) => e.preventDefault()}>
                      <div className="cart__info-title">
                        <NavLink to={`/product/${item.id}`} className="cart__info-title-link">{item.title}</NavLink>
                        <div
                          className="cart__info-btnClose"
                          onClick={(e) => {
                            e.preventDefault()
                            handleRemoveCart(item.id)}}
                        >
                          <AiOutlineClose />

                        </div>
                      </div>
                      <div className="cart__info-countPrice">
                        <div className="cart__info-count">
                          <div
                            className="cart__info-count-decrement"
                            onClick={(e) => {
                              e.preventDefault()
                              handleDecrementCart(item.id)}}
                          >
                            <AiOutlineMinus className="cart__info-count-icon-btn" />
                          </div>
                          <div className="cart__info-count-namber">
                            {item.count}
                          </div>
                          <div
                            className="cart__info-count-increment"
                            onClick={(e) => {
                              e.preventDefault()
                              handleIncrementCart(item.id)}}
                          >
                            <AiOutlinePlus className="cart__info-count-icon-btn" />
                          </div>
                        </div>

                        <div className="cart__info-price">
                          {item.discont_price !== null ? (
                            <>
                              <span className="cart__info-price-discont">
                                ${(item.discont_price * item.count).toFixed(2)}
                              </span>
                              <span className="cart__info-price-norm">
                                ${(item.price * item.count).toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="cart__info-price-discont">
                              ${(item.price * item.count).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))
            )}
          </div>

          {!!cartItem.length && <div className="cart__order">
            <div className="cart__order_details">
              <h2 className="cart__order_details-info">Order details</h2>
              <div className="cart__order_details-count">
                {cartItem.length} item{cartItem.length === 1 ? "" : "s"}
              </div>

              <div className="cart__order_details-price">
                <span className="cart__order_details-price-total">Total</span>
                <span className="cart__order_details-price-value">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <form
              className="cart__order-forma"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("name", {
                  required: "The field must not be empty",
                  minLength: {
                    value: 3,
                    message: "Minimum three characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum 50 characters",
                  },
                })}
                type="text"
                placeholder="Name"
                className={
                  "cart__order-forma-input " +
                  (errors.name ? "error" : "")
                }
              />
              {errors.name && <p>{errors.name.message}</p>}

              <input
                {...register("tel", {
                  required: "The field must not be empty",
                  pattern: {
                    value: /^\d+$/,
                    message: "Enter numbers only",
                  },
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Maximum 15 characters",
                  },
                })}
                type="tel"
                placeholder="Phone number"
                className={
                  "cart__order-forma-input " + (errors.tel ? "error" : "")
                }
              />
              {errors.tel && <p>{errors.tel.message}</p>}

              <input
                {...register("email", {
                  required: "The field must not be empty",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                placeholder="Email"
                className={
                  "cart__order-forma-input " +
                  (errors.email ? "error" : "")
                }
              />
              {errors.email && <p>{errors.email.message}</p>}

              <button
                disabled={!isValid}
                type="submit"
                className="cart__order-forma-button"
              >
                Order
              </button>
            </form>
          </div>}

        </div>
      </div>

      <ModalOrder isOpen={isOpen} close={() => setIsOpen(false)} /> 
        
    </div>
      // Передаём в модалку функцию close, которая при вызове установит isOpen = false
  );
};

export default Cart;