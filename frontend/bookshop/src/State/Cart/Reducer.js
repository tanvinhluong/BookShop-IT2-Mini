import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  CLEAR_CART_REQUEST,
  CLEAR_CART_FAILURE,
  CLEAR_CART_SUCCESS
} from './ActionType'

const initalState = {
  cart: null,
  loading: false,
  error: null,
  cartItems: [],
  totalItems: 0,
}

export const cartReducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true, error: null }

    case ADD_ITEM_TO_CART_SUCCESS:
      console.log('Cart Items before:', state.cartItems.length)
      console.log('New Items:', state.totalItems + 1)
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.cartItems],
        totalItems: state.totalItems + 1,
        loading: false,
      }

    case ADD_ITEM_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cart: action.payload,
        loading: false,
      }

    case GET_CART_FAILURE:
      return { ...state, error: action.payload, loading: false }

    case REMOVE_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
      return { ...state, loading: true, error: null }

    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        deleteCartItem: action.payload,
        totalItems: state.totalItems - 1,
        loading: false,
      }

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        updateCartItem: action.payload,
        totalItems: state.totalItems,
        loading: false,
      }

    case REMOVE_CART_ITEM_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case CLEAR_CART_REQUEST:
      return { ...state, loading: true, error: null }

    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        cartItems: [],
        totalItems: 0,
        cart: null,
        loading: false
      }

    case CLEAR_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}
