export default class RedditClient {
  constructor(token) {
    this.baseUrl = 'https://oauth.reddit.com/'
    this.defaultHeaders = {
        'Authorization': `bearer ${token}`
    }
  }

  getPosts(endpoint) {
    const url = this.baseUrl + endpoint
    return fetch(url, {
      headers: this.defaultHeaders
    }).then((response) => response.json())
  }
}
