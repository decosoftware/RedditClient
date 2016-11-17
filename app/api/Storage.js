/**
 * AsyncStorage is a simple, unencrypted, asynchronous,
 * persistent, key-value storage system that is global to the app.
 * It should be used instead of LocalStorage.
 * https://facebook.github.io/react-native/docs/asyncstorage.html
 */
import { AsyncStorage } from 'react-native'
const TOKEN_KEY = '@RedditClient:token'
const EXPIRE_KEY = '@RedditClient:expire'

export const clearToken = async () => {
  AsyncStorage.removeItem(EXPIRE_KEY)
  await AsyncStorage.removeItem(TOKEN_KEY)
}
export const setToken = async (token) => {
  AsyncStorage.setItem(EXPIRE_KEY, Date.now().toString())
  await AsyncStorage.setItem(TOKEN_KEY, token)  
}
export const getToken = async () => await AsyncStorage.getItem(TOKEN_KEY)
export const tokenHasExpired = async () => {
  const expiration = await AsyncStorage.getItem(EXPIRE_KEY)
  if (!expiration) return true
  const difference = Date.now() - Number(expiration) 
  return difference > 600000
}