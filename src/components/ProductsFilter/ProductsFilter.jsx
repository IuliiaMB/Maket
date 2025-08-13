import { useEffect, useState } from 'react'
import './ProductsFilter.scss'
import CustomCheckbox from '../customCheckBox/customCheckbox'

const isNumber = (text) => {  // Проверяет может ли быть текст числом, если это читабельное число то return true
    return !Number.isNaN(+text)
}


const ProductsFilter = ({ isDiscount = true, products, setProducts }) => { 
    const [from, setFrom] = useState("") 
    const [to, setTo] = useState("")
    const [isDiscout, setIsDiscount] = useState(false) 
    const [typeProducts, setTypeProducts] = useState('')

    const getSortProducts = () => {
        if (typeProducts === '') return [...products] // Если тип сортировки не выбран, возвращаем копию оригинального массива

        return [...products].sort((a, b) => {
            const priceA = a.discont_price || a.price; // получаем фактическую цену для сравнения
            const priceB = b.discont_price || b.price;
            switch (typeProducts) {
                case 'low': return priceB - priceA;
                case 'hight': return priceA - priceB;
                case 'a-z': {
                    const aText = a.title.toLowerCase()
                    const bText = b.title.toLowerCase()
                    if (aText > bText) return 1; // b должно стоять перед a
                    if (aText < bText) return -1; // a должно стоять перед b
                    return 0
                }
            }
        })
    }

    useEffect(() => {
        const productsSorted = getSortProducts(); // получаем отсортированные продукты
        const fromS = +from;
        const toS = !+to ? Infinity : +to;
        // isDiscout = true (нажал ли клиент в это поле) | isDiscount = true - отвечает за визуализацию этого поля клиенту (будет ли видно вооще чекбокс клиенту)
        const newDatas = productsSorted.filter((elem) => { // применение логики фильтрации к уже отсортированному списку
            const price = elem.discont_price || elem.price; // определение фактической цуны

            const isPrice = fromS <= price && toS >= price;
            const isDiscountS = isDiscout && isDiscount ? elem.discont_price : true;
            return isPrice && isDiscountS;
        })

        setProducts(newDatas) 

    }, [from, to, isDiscout, typeProducts, products, isDiscount])



    const handleChangeFrom = (e) => { // вызов при написании чего то в инпут
        const text = e.target.value; // Получаем текст из input
        const is = isNumber(text) // Проверяем: число ли это?
        if (is) {
            setFrom(text);   // Обновляем локальное состояние  
        }
    }

    const handleChangeTo = (e) => {
        const text = e.target.value;
        const is = isNumber(text)
        if (is) {
            setTo(text);
        }
    }

    const handleChangeDiscount = (is) => { // изменения состаяния при клике
        setIsDiscount(is);
    }

    const handleTypeProducts = (e) => {
        setTypeProducts(e.target.value); // Обновляем локальное состояние выбранного типа сортировки
    }

    return (
        <div className='productsFilter'>

            <div className='productsFilter__priceRange'>
                <p className='productsFilter__title'>Price</p>
                <input onChange={handleChangeFrom} value={from} className='productsFilter__price' pattern='[1-9][0-9]*' type="text" inputMode='numeric' placeholder="from" />
                <input onChange={handleChangeTo} value={to} className='productsFilter__price' type="text" inputMode='numeric' placeholder="to" />
            </div>

            {isDiscount && <div className='productsFilter__discount'>
                <p className='productsFilter__label'>
                    Discounted items
                </p>
                <CustomCheckbox onChange={handleChangeDiscount} checked={isDiscout} />
            </div>}

            <div className='productsFilter__sort'>
                <p className='productsFilter__title'>Sorted</p>
                <select onChange={handleTypeProducts} value={typeProducts} className='productsFilter__select'>
                    <option value="">by default</option>
                    <option value="low">price: high-low</option>
                    <option value="hight">price: low-high</option>
                    <option value="a-z">alphabetical: A to Z</option>
                </select>
            </div>

        </div>
    )
}

export default ProductsFilter