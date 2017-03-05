import React from 'react'

// TODO: make them into cards, not just a gif
// TODO: loading when gif isn't fully rendered...

const GifCard = ({ gif, onGifSelect }) => {
  return (
    <div className='gif-card' onClick={() => onGifSelect(gif)}>
      <img src={gif.images.downsized.url} />
    </div>
  )
}
GifCard.propTypes = {
  gif: React.PropTypes.object,
  onGifSelect: React.PropTypes.func
}

export default GifCard
