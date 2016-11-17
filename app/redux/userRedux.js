const types = {
  AUTHENTICATION_PENDING: 'AUTHENTICATION_PENDING',
  AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
  AUTHENTICATION_FAILURE: 'AUTHENTICATION_FAILURE'
}

export const actionCreators = {
  startAuthentication: () => {
    return {type: types.AUTHENTICATION_PENDING}
  },
  authenticationSuccess: (token) => {
    return {type: types.AUTHENTICATION_SUCCESS, token: token}
  },
  authenticationFailure: (error) => {
    return {type: types.AUTHENTICATION_FAILURE, error: error}
  },
}

const initialState = {
  isAuthenticating: false,
  token: null
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
