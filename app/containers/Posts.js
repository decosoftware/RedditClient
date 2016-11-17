import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { postsActionCreators } from '../redux'

import Post from '../components/Post'

const mapStateToProps = (state) => ({
  //fetch relevent redux state and pass into props here
})



class Posts extends Component {
  static propTypes = {
  }

  componentDidMount() {
    //fetch the posts here
  }

  componentWillReceiveProps(nextProps) {
    // If we are now logged in, check if we need to fetch posts
  }

  renderPosts = () => {
    // can use this to render posts in the ScrollView
    return <View/>
  }

  /**
   * Using a ScrollView
   * https://facebook.github.io/react-native/docs/using-a-scrollview.html
   */
  render() {
    return (
      <View>
        <ScrollView>
          {this.renderPosts()}
        </ScrollView>
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
  }
})

export default connect(mapStateToProps)(Posts)
