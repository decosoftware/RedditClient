import { setToken, getToken, clearToken, tokenHasExpired } from '../api/Storage'

const types = {
  AUTHENTICATION_PENDING: 'AUTHENTICATION_PENDING',
  AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
  AUTHENTICATION_FAILURE: 'AUTHENTICATION_FAILURE'
}

const authenticationSuccess = (token) => {
  setToken(token)
  return {type: types.AUTHENTICATION_SUCCESS, token: token}
}

/**
 * This works because of our redux-thunk middleware in ./store/configureStore
 *
 * ...action creators that return a function instead of an action.
 * The thunk can be used to delay the dispatch of an action,
 * or to dispatch only if a certain condition is met.
 * The inner function receives dispatch and getState as parameters.
 */
const startAuthentication = () => async (dispatch) => {
  // Try and retrieve token from Storage
  const tokenExpired = await tokenHasExpired()
  const token = await getToken()
  if (tokenExpired) {
    clearToken()
  }
  return (token && !tokenExpired) ? (
    // succesfully retrieved it
    dispatch(authenticationSuccess(token))
  ) : dispatch({
    // failed to retrieve it
    type: types.AUTHENTICATION_PENDING
  })
}

const authenticationFailure = (error) => {
  return {type: types.AUTHENTICATION_FAILURE, error: error}
}

export const actionCreators = {
  startAuthentication,
  authenticationSuccess,
  authenticationFailure,
}

const initialState = {
  isAuthenticating: false,
  token: null,
}

export const reducer = (state = initialState, action) => {
  const {type, payload} = action

  switch(type) {
    case types.AUTHENTICATION_PENDING: {
      return {
        isAuthenticating: true,
        token: null,
        error: null
      }
    }
    case types.AUTHENTICATION_SUCCESS: {
      return {
        isAuthenticating: false,
        token: action.token,
        error: null
      }
    }
    case types.AUTHENTICATION_FAILURE: {
      return {
        isAuthenticating: false,
        token: null,
        error: action.error
      }
    }
    default: {
      return state
    }
  }
}
