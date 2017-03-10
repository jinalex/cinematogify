import React from 'react'
import GifCard from './GifCard'

// only needs to display data from props, no need to make it a class
const CinemaGifList = (props) => {
  // TODO: limit number of gifs shown
  const gifCards = props.gifs.map((image) => {
    return <GifCard
      key={image.id}
      gif={image}
      onGifSelect={props.onGifSelect}
      onFavouriteSelect={props.onFavouriteSelect}
      onFavouriteDeselect={props.onFavouriteDeselect}
      isAuthenticated={props.isAuthenticated}
      isFavourite={props.isFavourite}
    />
  })

  return (
    <div className='gif-list'>{gifCards}</div>
  )
}
CinemaGifList.propTypes = {
  gifs: React.PropTypes.array,
  onGifSelect: React.PropTypes.func,
  isFavourite: React.PropTypes.bool
}

export default CinemaGifList
