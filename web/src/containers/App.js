import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';  // imports all actions in action folder as a single thing

import SearchBar from '../components/Search';
import CinemaGifList from '../components/CinemaGifList';
import GifModal from '../components/GifModal';
import '../styles/app.css';
import { StickyContainer, Sticky } from 'react-sticky';

class App extends React.Component {
  static propTypes = {
    gifs: React.PropTypes.array,
    actions: React.PropTypes.object,
    modalIsOpen: React.PropTypes.bool,
    selectedGif: React.PropTypes.object,
  }
  render() {
    return (
      <StickyContainer>
        <Sticky>
          <h1>Cinematogify</h1>
        </Sticky>
        <div>
          <SearchBar onTermChange={this.props.actions.requestGifs} />
          <CinemaGifList gifs={ this.props.gifs } onGifSelect={ selectedGif => this.props.actions.openModal({ selectedGif }) } />
          <GifModal modalIsOpen={ this.props.modalIsOpen }
                    selectedGif={ this.props.selectedGif }
                    onRequestClose={ () => this.props.actions.closeModal() }
          />
        </div>
      </StickyContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    gifs: state.gifs.data,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
