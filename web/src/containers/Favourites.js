import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import CinemaGifList from '../components/CinemaGifList'
import GifModal from '../components/GifModal'
import '../styles/app.css'

class Favourites extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    authenticated: React.PropTypes.bool,
    gifs: React.PropTypes.array,
    modalIsOpen: React.PropTypes.bool,
    selectedGif: React.PropTypes.object
  }

  componentWillMount () {
    this.props.actions.fetchFavouritedGifs()
  }

  render () {
    return (
      <div>
        <CinemaGifList gifs={this.props.gifs}
          onGifSelect={selectedGif => this.props.actions.openModal({ selectedGif })}
          onFavouriteSelect={selectedGif => this.props.actions.favouriteGif({ selectedGif })}
          onFavouriteDeselect={selectedGif => this.props.actions.unfavouriteGif({ selectedGif })}
          isAuthenticated={this.props.authenticated}
          isFavourite
        />
        <GifModal modalIsOpen={this.props.modalIsOpen}
          selectedGif={this.props.selectedGif}
          onRequestClose={() => this.props.actions.closeModal()}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifs.favourites,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)
