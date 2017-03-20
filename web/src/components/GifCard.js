import React from 'react'
import ReactSpinner from 'react-spinjs'

class GifCard extends React.Component {
  static propTypes = {
    isFavourite: React.PropTypes.bool,
    onFavouriteSelect: React.PropTypes.func,
    onFavouriteDeselect: React.PropTypes.func,
    gif: React.PropTypes.object,
    isAuthenticated: React.PropTypes.bool,
    onGifSelect: React.PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      favourited: this.props.isFavourite,
      imageStatus: 'loading'
    }
  }

  handleImageLoaded = () => {
    this.setState({ imageStatus: 'loaded' })
  }

  handleImageError = () => {
    this.setState({ imageStatus: 'failed to load' })
  }

  favouriteGif () {
    this.setState({ favourited: true })
    this.props.onFavouriteSelect(this.props.gif)
  }

  unfavouriteGif () {
    this.setState({ favourited: false })
    this.props.onFavouriteDeselect(this.props.gif)
  }

  renderFavouriteHeart = () => {
    if (!this.props.isAuthenticated) {
      return ''
    }

    if (this.state.favourited) {
      return <i className='favourite fa fa-heart' onClick={() => this.unfavouriteGif()} />
    }

    return <i className='favourite fa fa-heart-o' onClick={() => this.favouriteGif()} />
  }

  renderSpinner = () => {
    if (this.state.imageStatus === 'loading') {
      return (
        <ReactSpinner color='black' config={{ zIndex: 5 }} /> // should define configs somewhere else
      )
    }
  }

  render () {
    return (
      <div className='gif-card'>
        { this.renderFavouriteHeart() }
        { this.renderSpinner() }
        <img src={this.props.gif.images.downsized.url}
          onLoad={this.handleImageLoaded}
          onError={this.handleImageError}
          onClick={() => this.props.onGifSelect(this.props.gif)}
        />
        <div>
          hi
        </div>
      </div>
    )
  }
}

export default GifCard
