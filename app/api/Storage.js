/**
 * AsyncStorage is a simple, unencrypted, asynchronous,
 * persistent, key-value storage system that is global to the app.
 * It should be used instead of LocalStorage.
 * https://facebook.github.io/react-native/docs/asyncstorage.html
 */
import { AsyncStorage } from 'react-native'
const TOKEN_KEY = '@RedditClient:token'

export const clearToken = async () => await AsyncStorage.removeItem(TOKEN_KEY)
export const setToken = async (token) => await AsyncStorage.setItem(TOKEN_KEY, token)
export const getToken = async () => await AsyncStorage.getItem(TOKEN_KEY)
