import { combineReducers } from 'redux'

import * as userRedux from './userRedux'
import * as postsRedux from './postsRedux'

export const reducer = combineReducers({
  user: userRedux.reducer,
  posts: postsRedux.reducer
})

export const userActionCreators = userRedux.actionCreators
export const postsActionCreators = postsRedux.actionCreators
