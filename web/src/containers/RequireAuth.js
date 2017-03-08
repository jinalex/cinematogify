import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export default function (WrappedComponent) {
  class Auth extends React.Component {
    static propTypes = {
      authenticated: React.PropTypes.bool
    }
    componentWillMount () {
      if (!this.props.authenticated) {
        let hasLocalStorageUser = false

        for (const key in window.localStorage) { // huh?
          if (key.startsWith('firebase:authUser:')) {
            hasLocalStorageUser = true
          }
        }

        if (!hasLocalStorageUser) {
          browserHistory.push('/login')
        }
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  function mapStateToProps (state) {
    return { authenticated: state.auth.authenticated }
  }

  return connect(mapStateToProps)(Auth)
}
