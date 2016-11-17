import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Router, Scene, Modal, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'

import Login from './Login'
import Posts from './Posts'
import Random from './Random'

class TabIcon extends Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

class AppRouter extends Component {
  render() {
    let styles = StyleSheet.create({
      tabBar: {
        borderTopWidth: 0.5,
        borderColor: '#b7b7b7',
        backgroundColor: '#fff',
        opacity: 1
      }
    })

    return (
      <Router>
        <Scene key={'root'}>
          <Scene key={'tabs'} hideNavBar={true} tabs={true} tabBarStyle={styles.tabBar} direction={'vertical'}>
            <Scene
              key={'postsTab'}
              title={'Feed'}
              icon={TabIcon}
              style={{paddingTop: 64}}
            >
              <Scene
                key={'posts'}
                component={Posts}
                subreddit={'hot'}
                title={'Reddit Posts'}
                passProps={true}/>
            </Scene>
            <Scene
              key={'randomTab'}
              title={'Random'}
              icon={TabIcon}
              style={{paddingTop: 64}}
            >
              <Scene
                key={'random'}
                component={Random}
                title={'Reddit Random'}
                subreddit={'random'}
                passProps={true} />
            </Scene>
          </Scene>

          <Scene key={'login'} direction={'vertical'} title={'Login'} panHandlers={null}>
            <Scene key={'loginContent'} title={'Login'} component={Login} style={{paddingTop: 64}} panHandlers={null} />
          </Scene>
        </Scene>


      </Router>
    )
  }
}

export default connect()(AppRouter)
