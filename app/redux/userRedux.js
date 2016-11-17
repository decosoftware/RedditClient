import { setToken, getToken, clearToken, tokenHasExpired } from '../api/Storage'

/**
 * This works because of our redux-thunk middleware in ./store/configureStore
 *
 * ...action creators that return a function instead of an action.
 * The thunk can be used to delay the dispatch of an action,
 * or to dispatch only if a certain condition is met.
 * The inner function receives the functions dispatch and getState as parameters.
 */
const startAuthentication = () => async (dispatch, getState) => {
  // you'll want to use an async function for this call to eventually
  // be able to "await" the getToken call from AsyncStorage
}

export const actionCreators = {
  startAuthentication,
  // add the other action creators
}

const initialState = {
  //setup initialState
}

export const reducer = (state = initialState, action) => {
  const {type, payload} = action

  switch(type) {
    // update state here
    default: {
      return state
    }
  }
}
