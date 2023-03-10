import {
  GET_USER_LOGIN,
  GET_USER_LOGIN_SUCCESS,
  GET_USER_LOGIN_FAILURE,
  GET_USER_BY_TOKEN,
  GET_USER_BY_TOKEN_SUCCESS,
  GET_USER_BY_TOKEN_FAILURE,
  USER_LOG_OUT,
} from './constant'

const INITIAL_STATE = {
  data: [],
  role: null,
  loading: true,
  isLoggedIn: false,
  idToken: null,
  error: null,
  errorToken: null,
  response: null,
}

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_LOGIN: {
      return {
        ...state,
        loading: true,
        error: null,
        response: null,
        isLoggedIn: false
      }
    }

    case GET_USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: action.payload.status === 200 ? true : false,
        role: action.payload?.data?.role,
        response: action.payload,
        idToken: localStorage.getItem('token') || '',
      }

    case GET_USER_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
      case GET_USER_BY_TOKEN: {
        return {
          ...state,
          loading: true,
          error: null,
          response: null,
          isLoggedIn: false
        }
      }
    case GET_USER_BY_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        role: action.payload.data.role,
        isLoggedIn: true,
        idToken: localStorage.getItem('token') || '',
      }

    case GET_USER_BY_TOKEN_FAILURE:
      return {
        ...state,
        errorToken: action.payload,
        loading: false,
        isLoggedIn: false,
      }

    case USER_LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        data: [],
        role: null,
      }
    }
    default:
      return state
  }
}

export default loginReducer
