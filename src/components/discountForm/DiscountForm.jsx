import { useForm } from 'react-hook-form';
import discountImage from '../../assets/discountImage.png'
import "./DiscountForm.scss"
import { useDispatch, useSelector } from 'react-redux';
import { sendDiscountRequest } from '../../store/features/discountSlice';
import { useEffect, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const savedForm = JSON.parse(localStorage.getItem("cart-form-discount")) || {
    name: "",
    phone: "",
    email: "",
};


const DiscountForm = () => {
    const dispatch = useDispatch();
    const [isDisabledSend, setIsDisabledSend] = useState(false) // временно отключает кнопку отправки после одного отправления.
    const { message, loading, success, error } = useSelector((state) => state.discount)

    const {
        register, // связывает инпуты с системой валидации
        formState: { errors },
        handleSubmit,
        watch, // отслеживает изменения полей формы.
        reset
    } = useForm({
        mode: "onBlur", // валидация срабатывает при потере фокуса.
        defaultValues: savedForm,
    });

    useEffect(() => {
        const subscription = watch((value) => {
            localStorage.setItem("cart-form-discount", JSON.stringify(value));
        });
        return () => subscription.unsubscribe(); // функция очистки
    }, [watch]); // следим за каждым изменением формы

    const onSubmit = (data) => { // вызывается при успешной валидации
        reset({
            name: "",
            phone: "",
            email: ""
        })
        setIsDisabledSend(true) // блокирует кнопку
        dispatch(sendDiscountRequest(data)); // oтправляет данные на сервер
    };


    const formValidationErrors = Object.values(errors).map(err => err.message);
    const hasFormValidationErrors = formValidationErrors.length > 0;
    // собираем массив сообщений об ошибках и определяем, есть ли вообще ошибки

    return (

        <div className='discount'>
            <div className='discount-banner'>

                <h2 className='discount-banner__title'>5% off on the first order</h2>

                <div className='discount-banner__content'>


                    <form className='discount-banner__form' onSubmit={handleSubmit(onSubmit)}>

                        <div className='discount-banner__inputs'>

                            <input type="text" name="name" placeholder='Name'
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Minimum two characters"
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Name is too long"
                                    },
                                    pattern: {
                                        value: /^[A-Za-zА-Яа-я\s'-]+$/,
                                        message: "Invalid name format"
                                    }
                                })}

                                className={errors.name ? 'input-error' : ''} />


                            <input type="tel" name='phone' placeholder='Phone number'
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^\+?(\d[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,15}$/,
                                        message: "Invalid phone number format"
                                    }
                                })}

                                className={errors.phone ? 'input-error' : ''}
                            />


                            <input type="email" name='email' placeholder='Email'
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email format"
                                    }
                                })}

                                className={errors.email ? 'input-error' : ''} />

                            <div className='error-content'>

                                {hasFormValidationErrors && !loading && !success && !error && (
                                    <p className="form-general-error-message error-box">
                                        {FaTimesCircle && <FaTimesCircle size={16} color="#dc3545" />}
                                        {formValidationErrors.join('. ')}
                                    </p>
                                )}


                                {success && message && <p className="success-message">{message}</p>}
                                {error && <p className="api-error-message">{error}</p>}
                            </div>
                        </div>

                        <div className={'discount-banner__button ' + (success ? 'success' : '')}>

                            <button type='submit' disabled={isDisabledSend}>{success ? 'Request Submitted' : 'Get a discount'}</button>

                        </div>
                        <img src={discountImage} className='discount-banner__form-img' alt="discountImage" />
                    </form>
                </div>
            </div>
        </div>

    )
}

export default DiscountForm

