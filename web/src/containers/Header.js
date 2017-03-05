import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Actions from '../actions'

class Header extends React.Component {
  static propTypes = {
    signOutUser: React.PropTypes.func,
    authenticated: React.PropTypes.bool
  }
  handleSignout () {
    this.props.signOutUser()
  }

  renderAuthLinks () {
    if (this.props.authenticated) {
      return [
        // instead of having to wrap each li, just return an array with each li having a key
        <li className='nav-item' key={1}>
          <Link className='nav-link' to='/favourites'>My Favourites</Link>
        </li>,
        <li className='nav-item' key={2}>
          <a className='nav-link' href='#' onClick={() => this.handleSignout()}>Sign Out</a>
        </li>
      ]
    }
    return [
      <li className='nav-item' key={1}>
        <Link className='nav-link' to='/login'>Login</Link>
      </li>,
      <li className='nav-item' key={2}>
        <Link className='nav-link' to='/signup'>Sign Up</Link>
      </li>
    ]
  }
  render () {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link className='navbar-brand' to='/'>Cinematogify</Link>
          </div>
          <ul className='nav navbar-nav navbar-right'>
            {this.renderAuthLinks()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, Actions)(Header)
