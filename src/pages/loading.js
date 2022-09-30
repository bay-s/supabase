import React from 'react'
import check from '../check.png'

function Loading(props){

    return(

props.isUpload ? <div className='mx-auto loader-image'> <img src={check} alt="test" /></div>   :  <div className="loader-container my-auto">
<div class="loader mx-auto">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>
    )
}

export default Loading;