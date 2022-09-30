import React from 'react'
import '../animasi.css';

function Animasi(){

    return(
      <div className='column is-12 '> <div class="card-loader is-loading">
      <div class="image"></div>
      <div class="content-loader">
        <h2></h2>
        <p></p>
      </div>
    </div> 
    </div> 
    )
}

export default Animasi;