import RedditClient from '../api/RedditClient'

const types = {
  FETCH_POSTS_PENDING: 'FETCH_POSTS_PENDING',
  FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE: 'FETCH_POSTS_FAILURE'
}

export const actionCreators = {
  fetchPosts: () => (dispatch, getState) =>  {
    dispatch({type: types.FETCH_POSTS_PENDING, timestamp: Date.now()})
    new RedditClient(getState().user.token).getPosts('hot')
      .then((result) => {
        if (result.error) {
          dispatch(actionCreators.fetchPostsFailure(
            `${result.error}: ${result.message}`
          ))
        } else {
          let items = result.data.children
          dispatch(actionCreators.fetchPostsSuccess(items))
        }
      })
      .catch((error) => {
        dispatch(actionCreators.fetchPostsFailure(error))
      })
  },
  fetchPostsSuccess: (items) => {
    return {type: types.FETCH_POSTS_SUCCESS, items: items}
  },
  fetchPostsFailure: (error) => {
    return {type: types.FETCH_POSTS_FAILURE, error: error}
  },
}

const initialState = {
  isFetching: false,
  token: null,
  timestamp: null,
  items: []
}

export const reducer = (state = initialState, action) => {
  const {type, payload} = action

  switch(type) {
    case types.FETCH_POSTS_PENDING: {
      return {
        ...state,
        isFetching: true,
        timestamp: action.timestamp,
        error: null
      }
    }
    case types.FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        items: action.items,
        error: null
      }
    }
    case types.FETCH_POSTS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        items: [],
        error: action.error
      }
    }
    default: {
      return state
    }
  }
}
