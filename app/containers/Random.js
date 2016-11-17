import React, { Component, PropTypes } from 'react'
import { View, Text, ListView, RefreshControl, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { postsActionCreators } from '../redux'

import Post from '../components/Post'
import Comment from '../components/Comment'

const mapStateToProps = (state) => ({
  // take the relevant state from redux and put it into props here
})

class Random extends Component {
  static propTypes = {
  }
  constructor(props) {
    super(props)
    //create your dataSource in state here
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount() {
    //fetch random posts here
  }

  componentWillReceiveProps(nextProps) {
    // If we are now logged in, check if we need dto fetch posts
    // update your dataSource if the props have changed
  }

  renderPostOfType = (post) => {
    return <View/>
  }


  renderPosts = (post) => {
    // ListView by default removes clipped subviews
    // but only for children who have an overflow: 'hidden'
    // on their style.
    // Very simple but makes a huge difference!
    return (
      <View style={{overflow: 'hidden'}}>
        {this.renderPostOfType(post)}
      </View>
    )
  }

  refreshPosts = () => {
    // make a new call to random and get some new posts!
  }

  /**
   * Using a ListView
   * https://facebook.github.io/react-native/docs/using-a-listview.html
   * ListView for perf
   * https://facebook.github.io/react-native/docs/performance.html#listview-initial-rendering-is-too-slow-or-scroll-performance-is-bad-for-large-lists
   */
  render() {
    return (
      <View>
        <ListView
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={true}
              onRefresh={this.refreshPosts}
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
  //implement the styles here
})

export default connect(mapStateToProps)(Random)
