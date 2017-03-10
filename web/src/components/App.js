import React from 'react'
import Header from '../containers/Header'
import { StickyContainer, Sticky } from 'react-sticky'

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object
  }
  render () {
    return (
      <StickyContainer>
        <Sticky>
          <Header className='sticky' />
        </Sticky>
        <div>
          {this.props.children}
        </div>
      </StickyContainer>
    )
  }
}
