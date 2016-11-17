import React, { Component, PropTypes } from 'react'
import { View, Text, ListView, RefreshControl, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { postsActionCreators } from '../redux'

import Post from '../components/Post'
import Comment from '../components/Comment'

const mapStateToProps = (state) => ({
  item: state.sample.sampleItem,
  token: state.user.token,
  posts: state.posts.subreddits.random,
  postsError: state.posts.error,
  postsTimestamp: state.posts.timestamp,
  isFetchingPosts: state.posts.isFetching
})

class Random extends Component {
  static propTypes = {
    item: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string

  }
  constructor(props) {
    super(props)
    const { posts } = this.props
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(posts),
    };
  }

  componentDidMount() {
    const { token, dispatch, subreddit } = this.props
    if (!token) {
      return Actions.login()
    }

    // refetch on mount — like a refresh
    dispatch(postsActionCreators.fetchPosts(subreddit))
  }

  componentWillReceiveProps(nextProps) {
    // If we are now logged in, check if we need dto fetch posts
    if (!this.props.token && nextProps.token) {
      this.fetchPostsIfNeeded(nextProps)
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        nextProps.posts
      )
    })
  }

  fetchPostsIfNeeded(nextProps) {
    const {
      token,
      isFetchingPosts,
      postsTimestamp,
      posts,
      dispatch,
      subreddit,
    } = nextProps || this.props

    if (!token || isFetchingPosts) {
      return
    }

    // If we haven't recorded a time when we tried retrieving posts, or if there
    // are no posts and we last tried more than one minute ago, let's fetch
    // some posts.
    if (!postsTimestamp || (posts.length === 0 && Date.now() - postsTimestamp > 60 * 1000)) {
      dispatch(postsActionCreators.fetchPosts(subreddit))
    }
  }
  
  renderPostOfType = (post) => {    
    switch (post.kind) {
      case "t1": {
        const { body, subreddit, author } = post.data
        return <Comment
                 key={post.data.id}
                 body={body}
                 subreddit={subreddit}
                 author={author} />
                 
      }
      case "t3": {
        const { title, subreddit, preview } = post.data
        return <Post
          key={post.data.id}
          title={title}
          subreddit={subreddit}
          preview={preview}
        />
      }     
    }
  }


  renderPosts = (post) => {
    // ListView by default removes clipped subviews
    // but only for children who have an overflow: 'hidden'
    // on their style.
    // Very simple but makes a huge difference!
    return (
      <View style={styles.listItem}>
        {this.renderPostOfType(post)}
      </View>
    )
  }


  fetchMorePosts = () => {

  }

  refreshPosts = () => {
    const { dispatch, subreddit } = this.props
    dispatch(postsActionCreators.fetchPosts(subreddit))
  }

  /**
   * Using a ListView
   * https://facebook.github.io/react-native/docs/using-a-listview.html
   * ListView for perf
   * https://facebook.github.io/react-native/docs/performance.html#listview-initial-rendering-is-too-slow-or-scroll-performance-is-bad-for-large-lists
   */
  render() {
    const { postsError, isFetchingPosts, postsTimestamp, posts } = this.props

    return (
      <View style={styles.container}>
        {
          postsError ?
          <View style={styles.error}>
            <Text>{postsError}</Text>
          </View> :
          null
        }
        <ListView
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={isFetchingPosts || !postsTimestamp}
              onRefresh={this.refreshPosts}
              onEndReached={this.fetchMorePosts}
              />
          }
          dataSource={this.state.dataSource}
          renderRow={this.renderPosts}
         />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  error: {
    flex: 1,
    backgroundColor: 'red',
    padding: 15
  },
  loading: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 15
  },
  listItem: {
    overflow: 'hidden',
  },
})

export default connect(mapStateToProps)(Random)
