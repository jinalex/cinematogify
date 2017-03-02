import React from 'react';
import GifModal from './GifModal';
import Search from './Search';
import CinemaGifList from './CinemaGifList';
import { StickyContainer, Sticky } from 'react-sticky';
import request from 'superagent';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      selectedGif: null,
      modalIsOpen: false,
    };
  }

  openModal(gif) {
    this.setState({
      modalIsOpen: true,
      selectedGif: gif,
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      selectedGif: null,
    });
  }

  handleTermChange = (term) => {
    // the public key is hardcoded, may want to change that
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

    request.get(url, (err, res) => {
      // this referring to App and not handleTermChange's state, acheived by using the fat-arrow
      this.setState({ gifs: res.body.data });
    });
  }

  render() {
    return (
      <StickyContainer>
        <Sticky>
          <h1>
            CINEMATOGRAGIFS
          </h1>
        </Sticky>
        <Search onTermChange={this.handleTermChange} />
        <CinemaGifList  gifs={this.state.gifs}
                        onGifSelect={selectedGif => this.openModal(selectedGif) }
        />
        <GifModal modalIsOpen={this.state.modalIsOpen}
                  selectedGif={this.state.selectedGif}
                  onRequestClose={ () => this.closeModal() }
        />
      </StickyContainer>
    );
  }
}
