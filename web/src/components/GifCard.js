import React from 'react'

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

  handleImageLoaded () {
    this.setState({ imageStatus: 'loaded' })
  }

  handleImageError () {
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

  render () {
    return (
      <div className='gif-card'>
        { this.renderFavouriteHeart() }
        <img src={this.props.gif.images.downsized.url}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageError.bind(this)}
          onClick={() => this.props.onGifSelect(this.props.gif)}
        />
      </div>
    )
  }
}

export default GifCard
