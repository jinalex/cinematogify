import React from 'react';

class Search extends React.Component {
  onInputChange(term) {
    this.props.onTermChange(term);
  }

  render() {
    return (
      <div className="search">
        <input placeholder="Enter text to search for gifs!" onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }
}

Search.propTypes = {
  onTermChange: React.PropTypes.func,
};

export default Search;
