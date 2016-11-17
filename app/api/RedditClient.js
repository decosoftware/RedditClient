export default class RedditClient {
  constructor(token) {
    this.baseUrl = 'https://oauth.reddit.com/'
    this.defaultHeaders = {
        'Authorization': `bearer ${token}`,
    }
  }

  getPosts = (endpoint) => this.fetchWithHeaders(this.baseUrl + endpoint)
  getRandom = () => this.fetchWithHeaders(this.baseUrl + '/random')

  fetchWithHeaders = (url) => (
    fetch(url, {
      headers: this.defaultHeaders
    }).then((response) => response.json())
  )

}
