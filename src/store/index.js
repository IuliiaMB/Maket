import { configureStore } from "@reduxjs/toolkit";
import discountReducer from './features/discountSlice'
import categoriesReducer from './features/categoriesSlice'
import productsReduser from './features/productsSlice'
import productsCategoryReducer from './features/productsCategorySlice'
import cartReducer from './features/cartSlice'

const loadFromLocalStorage = (key, value) => { // функция, которая проверяет LocalStorage
  try {
    const data = localStorage.getItem(key) //достает с LocalStorage ифнормацию
    return data ? JSON.parse(data) : value
  } catch (e) {
    console.error(`Failed to load ${key} from localStorage:`, e)
    return value
  }
}

const preloadedState = { // функция для начальной загрузки состояния и вставки его в массивы корзины и избранных товаров
  cart: { cart: loadFromLocalStorage('cart', []) },
  products: { 
    products: [],
    likedProducts: loadFromLocalStorage('likedProducts', []),
    loading: false,
    error: null
}
}

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        discount: discountReducer,
        products: productsReduser,
        productsCategory: productsCategoryReducer,
        cart: cartReducer
    },
    preloadedState
})

store.subscribe(() => { // subscribe - вызывается каждый раз, когда что-то изменяется в состоянии
    try {
        const state = store.getState() // получаем текущее состояние
        localStorage.setItem('cart', JSON.stringify(state.cart.cart)) // сохранение преобразованного массива в localStorage
        localStorage.setItem('likedProducts', JSON.stringify(state.products.likedProducts))
    } catch (error) {
        console.error('Error saving date to localStorage', error);
    }
})

export default store;