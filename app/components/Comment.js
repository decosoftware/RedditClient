import React, { Component, PropTypes } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'


export default class Post extends Component {
  static propTypes = {
    body: PropTypes.string,
    subreddit: PropTypes.string,
    author: PropTypes.string,
  }

  render() {
    const { body, subreddit, author } = this.props

    let styles = StyleSheet.create({
      container: {
        height: 100,
        padding: 15,
        flexDirection: 'row',
        marginLeft: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.3)',
      },
      thumbnailSection: {
        width: 80
      },
      textSection: {
        flex: 1
      },
      detailInfo: {
        flexDirection: 'column',
        flex: 1,
      },
      subreddit: {
        color: '#999',
        fontSize: 11,
      }
    })

    return (
      <View style={styles.container}>
        <View style={styles.textSection}>
          <Text style={styles.title} numberOfLines={2}>{body}</Text>
          <View style={styles.textSection}>
            <Text style={styles.subreddit}>r/{subreddit}</Text>
            <Text style={styles.subreddit}>r/{author}</Text>
          </View>
        </View>
      </View>
    )
  }
}
