/**
 * AsyncStorage is a simple, unencrypted, asynchronous,
 * persistent, key-value storage system that is global to the app.
 * It should be used instead of LocalStorage.
 * https://facebook.github.io/react-native/docs/asyncstorage.html
 */
import { AsyncStorage } from 'react-native'

/**
 * the format of these functions should be in the form of ...
 * export const functionName = () => async () => { ... }
 * 
 * ... you can then import them as import { storageFn } from './relative/path/to/Storage.js'
 */
