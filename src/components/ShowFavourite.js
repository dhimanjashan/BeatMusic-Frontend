import React from 'react'
import { useNavigate } from 'react-router-dom';

const ShowFavourite = () => {
    const navigate = useNavigate();
    const handleFavourite = () => {
        navigate("/favourite");
      };

  return (
    <>
    <div className="showContainer1">
        <div className='showContainer2'>
        <h1 className='showHeading'>🎶 Welcome to Your Music Space!</h1>
        <p className='showParagraph'>Enjoy creating your own playlist and dive into endless music.</p>
        <button className='showButton' onClick={handleFavourite}>🎧 Explore Favourites</button>
        </div>
    </div>

    </>
  )
}

export default ShowFavourite;

