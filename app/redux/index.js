import { combineReducers } from 'redux'

import * as sampleRedux from './sampleRedux'
import * as userRedux from './userRedux'
import * as postsRedux from './postsRedux'

export const reducer = combineReducers({
  sample: sampleRedux.reducer,
  user: userRedux.reducer,
  posts: postsRedux.reducer
})

export const sampleActionCreators = sampleRedux.actionCreators
export const userActionCreators = userRedux.actionCreators
export const postsActionCreators = postsRedux.actionCreators
